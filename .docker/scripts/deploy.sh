#!/bin/bash
set -e

# Récupérer l'ID de déploiement depuis les arguments
DEPLOY_ID=$1
[ -z "$DEPLOY_ID" ] && DEPLOY_ID=$(date +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD 2>/dev/null || echo "manual")

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments
CONFIG_DIR=$APP_DIR/.docker/config

echo "=== Déploiement $DEPLOY_ID ==="

# Créer les répertoires nécessaires
mkdir -p $DEPLOYMENTS_DIR/versions
mkdir -p $DEPLOYMENTS_DIR/backups
mkdir -p $CONFIG_DIR/ssl
mkdir -p $HOME/letsencrypt

# Sauvegarder la version actuelle comme version précédente
if [ -L $DEPLOYMENTS_DIR/current ]; then
  PREVIOUS_VERSION=$(readlink $DEPLOYMENTS_DIR/current | xargs basename)
  echo "$PREVIOUS_VERSION" > $DEPLOYMENTS_DIR/previous_version
  echo "Version précédente: $PREVIOUS_VERSION"

  # Créer une sauvegarde de sécurité avant le déploiement
  BACKUP_NAME="backup-$(date +%Y%m%d%H%M%S)"
  cp -r $(readlink -f $DEPLOYMENTS_DIR/current) $DEPLOYMENTS_DIR/backups/$BACKUP_NAME
  echo "Sauvegarde créée: $BACKUP_NAME"
fi

# Créer le répertoire pour la nouvelle version
mkdir -p $DEPLOYMENTS_DIR/versions/$DEPLOY_ID

# Extraire le package de déploiement
if [ -f "/tmp/deploy-package.tar.gz" ]; then
  echo "Extraction de l'archive GitHub..."

  # Extraction temporaire dans un répertoire pour obtenir le nom du dossier
  TEMP_DIR=$(mktemp -d)
  tar -xzf /tmp/deploy-package.tar.gz -C $TEMP_DIR

  # Trouver le nom du répertoire créé par l'archive GitHub (généralement repo-SHA)
  EXTRACTED_DIR=$(ls -1 $TEMP_DIR)

  # Déplacer le contenu vers le répertoire de déploiement
  cp -r $TEMP_DIR/$EXTRACTED_DIR/* $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/

  # Nettoyer
  rm -rf $TEMP_DIR
  rm /tmp/deploy-package.tar.gz

  echo "Package extrait dans $DEPLOYMENTS_DIR/versions/$DEPLOY_ID"
else
  echo "ERREUR: Package de déploiement non trouvé!"
  exit 1
fi

# S'assurer que le répertoire .docker existe
if [ ! -d "$DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker" ]; then
  echo "ERREUR: Structure de répertoire incorrecte dans le package!"
  exit 1
fi

# Mettre à jour le lien symbolique
rm -f $DEPLOYMENTS_DIR/current
ln -sf $DEPLOYMENTS_DIR/versions/$DEPLOY_ID $DEPLOYMENTS_DIR/current
echo "Lien symbolique mis à jour: current -> $DEPLOY_ID"

# Gérer les certificats Let's Encrypt
LETS_ENCRYPT_DIR="$HOME/letsencrypt/live/hargile.eu"
if [ -f "$LETS_ENCRYPT_DIR/privkey.pem" ] && [ -f "$LETS_ENCRYPT_DIR/fullchain.pem" ]; then
  echo "Certificats Let's Encrypt trouvés, utilisation des certificats existants..."
  mkdir -p $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl
  cp $LETS_ENCRYPT_DIR/privkey.pem $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl/
  cp $LETS_ENCRYPT_DIR/fullchain.pem $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl/
elif [ -f "$CONFIG_DIR/ssl/privkey.pem" ] && [ -f "$CONFIG_DIR/ssl/fullchain.pem" ]; then
  echo "Certificats précédents trouvés, utilisation de ces certificats..."
  mkdir -p $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl
  cp $CONFIG_DIR/ssl/privkey.pem $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl/
  cp $CONFIG_DIR/ssl/fullchain.pem $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl/
else
  echo "Aucun certificat trouvé, Let's Encrypt sera configuré après le déploiement..."
  mkdir -p $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl
  touch $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl/privkey.pem
  touch $DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker/config/ssl/fullchain.pem
fi

# Naviguer vers le répertoire de l'application
cd $DEPLOYMENTS_DIR/current

# Installation des dépendances et build de l'application
echo "Installation des dépendances Node.js..."
npm ci

echo "Construction de l'application Next.js..."
npm run build
echo "Build terminé avec succès!"

# Naviguer vers le répertoire .docker
cd $DEPLOYMENTS_DIR/current/.docker

# S'assurer que les scripts sont exécutables
find scripts -type f -name "*.sh" -exec chmod +x {} \;

# Arrêter les conteneurs existants
docker compose down || true
echo "Conteneurs arrêtés"

# Construire et démarrer les nouveaux conteneurs
DEPLOY_ID=$DEPLOY_ID docker compose up -d --build
echo "Conteneurs démarrés avec DEPLOY_ID=$DEPLOY_ID"

# Enregistrer le déploiement
echo $DEPLOY_ID > $DEPLOYMENTS_DIR/current_version
echo "$DEPLOY_ID deployed at $(date)" >> $DEPLOYMENTS_DIR/deploy_history
echo "Déploiement enregistré"

# Configurer Let's Encrypt si nécessaire
if [ ! -f "$LETS_ENCRYPT_DIR/privkey.pem" ] || [ ! -f "$LETS_ENCRYPT_DIR/fullchain.pem" ]; then
  echo "Configuration des certificats Let's Encrypt..."
  docker exec ols-server /usr/local/lsws/bin/lswsctrl restart
  sleep 5
  docker exec ols-server bash -c 'cd /usr/local/lsws/addon/letsencrypt && ./letsencrypt.sh' || true

  # Vérifier si les certificats ont été générés
  if [ -f "$LETS_ENCRYPT_DIR/privkey.pem" ] && [ -f "$LETS_ENCRYPT_DIR/fullchain.pem" ]; then
    echo "Certificats Let's Encrypt générés avec succès!"
    # Copier les certificats dans le répertoire de configuration
    cp $LETS_ENCRYPT_DIR/privkey.pem $CONFIG_DIR/ssl/
    cp $LETS_ENCRYPT_DIR/fullchain.pem $CONFIG_DIR/ssl/

    # Redémarrer OpenLiteSpeed pour appliquer les nouveaux certificats
    docker exec ols-server /usr/local/lsws/bin/lswsctrl restart
  else
    echo "ATTENTION: La génération des certificats Let's Encrypt a échoué."
    echo "Veuillez configurer Let's Encrypt manuellement après le déploiement:"
    echo "docker exec -it ols-server bash -c 'cd /usr/local/lsws/addon/letsencrypt && ./letsencrypt.sh'"
  fi
fi

# Nettoyer les anciens déploiements (garder les 5 plus récents)
cd $DEPLOYMENTS_DIR/versions
ls -t | tail -n +6 | xargs rm -rf 2>/dev/null || true
echo "Anciens déploiements nettoyés"

echo "=== Déploiement réussi: $DEPLOY_ID ==="
