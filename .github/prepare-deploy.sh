#!/bin/bash
# Ce script est utilisé pour préparer le déploiement sur le serveur
# Il sera envoyé et exécuté sur le serveur avant le déploiement principal

set -e

DEPLOY_ID=$1
ARCHIVE_PATH=/tmp/deploy-package.zip

echo "=== Préparation du déploiement $DEPLOY_ID ==="

# Vérifier si l'archive existe
if [ ! -f "$ARCHIVE_PATH" ]; then
  echo "ERREUR: Archive $ARCHIVE_PATH introuvable!"
  ls -la /tmp/
  exit 1
fi

echo "Archive trouvée: $(ls -la $ARCHIVE_PATH)"

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments

# Créer les répertoires nécessaires
mkdir -p $DEPLOYMENTS_DIR/versions
mkdir -p $DEPLOYMENTS_DIR/backups
mkdir -p $APP_DIR/.docker/config/ssl
mkdir -p $HOME/letsencrypt

# Créer le répertoire pour la nouvelle version
mkdir -p $DEPLOYMENTS_DIR/versions/$DEPLOY_ID

# Sauvegarder la version actuelle comme version précédente
if [ -L $DEPLOYMENTS_DIR/current ]; then
  PREVIOUS_VERSION=$(readlink $DEPLOYMENTS_DIR/current | xargs basename)
  echo "$PREVIOUS_VERSION" > $DEPLOYMENTS_DIR/previous_version
  echo "Version précédente: $PREVIOUS_VERSION"

  # Créer une sauvegarde
  BACKUP_NAME="backup-$(date +%Y%m%d%H%M%S)"
  cp -r $(readlink -f $DEPLOYMENTS_DIR/current) $DEPLOYMENTS_DIR/backups/$BACKUP_NAME || true
  echo "Sauvegarde créée: $BACKUP_NAME"
fi

# Installer unzip si nécessaire
if ! command -v unzip &> /dev/null; then
  echo "Installation de unzip..."
  apt-get update && apt-get install -y unzip
fi

# Extraire l'archive
echo "Extraction de l'archive..."
unzip -q "$ARCHIVE_PATH" -d "$DEPLOYMENTS_DIR/versions/$DEPLOY_ID"
echo "Contenu du répertoire de déploiement:"
ls -la "$DEPLOYMENTS_DIR/versions/$DEPLOY_ID"

# Vérifier que les fichiers Docker sont présents
if [ ! -d "$DEPLOYMENTS_DIR/versions/$DEPLOY_ID/.docker" ]; then
  echo "ERREUR: Répertoire .docker manquant!"
  exit 1
fi

# Mettre à jour le lien symbolique
rm -f $DEPLOYMENTS_DIR/current
ln -sf $DEPLOYMENTS_DIR/versions/$DEPLOY_ID $DEPLOYMENTS_DIR/current
echo "Lien symbolique mis à jour: current -> $DEPLOY_ID"

# S'assurer que les scripts sont exécutables
find "$DEPLOYMENTS_DIR/current/.docker/scripts" -type f -name "*.sh" -exec chmod +x {} \;
echo "Scripts d'exécution autorisés"

# Nettoyer l'archive
rm -f "$ARCHIVE_PATH"
echo "Archive nettoyée"

echo "=== Préparation terminée avec succès ==="
