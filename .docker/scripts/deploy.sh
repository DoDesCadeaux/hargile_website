#!/bin/bash
set -e
set -x  # Enable debug output

# Initialize logging
LOG_FILE="/home/hargile.eu/deployments/deploy.log"
echo "=== Déploiement $(date) ===" >> "$LOG_FILE"

# Récupérer l'ID de déploiement depuis les arguments
DEPLOY_ID=${1:-$(date +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD 2>/dev/null || echo "manual")}
ARCHIVE_PATH=$2

echo "Déploiement $DEPLOY_ID" | tee -a "$LOG_FILE"
echo "Archive source: $ARCHIVE_PATH" | tee -a "$LOG_FILE"

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments
CONFIG_DIR=$APP_DIR/.docker/config

# Créer les répertoires nécessaires
mkdir -p "$DEPLOYMENTS_DIR/versions" "$DEPLOYMENTS_DIR/backups" "$CONFIG_DIR/ssl" "$HOME/letsencrypt"

# Vérifier l'archive
if [ -z "$ARCHIVE_PATH" ] || [ ! -f "$ARCHIVE_PATH" ]; then
  echo "ERREUR: Archive non spécifiée ou introuvable!" | tee -a "$LOG_FILE"
  exit 1
fi

# Sauvegarder la version actuelle
if [ -L "$DEPLOYMENTS_DIR/current" ]; then
  PREVIOUS_VERSION=$(readlink "$DEPLOYMENTS_DIR/current" | xargs basename)
  echo "$PREVIOUS_VERSION" > "$DEPLOYMENTS_DIR/previous_version"
  echo "Version précédente: $PREVIOUS_VERSION" | tee -a "$LOG_FILE"

  BACKUP_NAME="backup-$(date +%Y%m%d%H%M%S)"
  cp -r "$(readlink -f "$DEPLOYMENTS_DIR/current")" "$DEPLOYMENTS_DIR/backups/$BACKUP_NAME"
  echo "Sauvegarde créée: $BACKUP_NAME" | tee -a "$LOG_FILE"
fi

# Créer le répertoire pour la nouvelle version
DEPLOY_DIR="$DEPLOYMENTS_DIR/versions/$DEPLOY_ID"
mkdir -p "$DEPLOY_DIR"

# Installer unzip si nécessaire
command -v unzip &>/dev/null || {
  echo "Installation de unzip..." | tee -a "$LOG_FILE"
  apt-get update && apt-get install -y unzip
}

# Extraire l'archive
echo "Extraction de l'archive..." | tee -a "$LOG_FILE"
unzip -q "$ARCHIVE_PATH" -d "$DEPLOY_DIR" || {
  echo "ERREUR: Échec de l'extraction de l'archive!" | tee -a "$LOG_FILE"
  exit 1
}

# Vérifier la structure du répertoire
if [ ! -d "$DEPLOY_DIR/.docker" ]; then
  echo "ERREUR: Répertoire .docker non trouvé dans le déploiement!" | tee -a "$LOG_FILE"
  exit 1
}

# Mettre à jour le lien symbolique
rm -f "$DEPLOYMENTS_DIR/current"
ln -sf "$DEPLOY_DIR" "$DEPLOYMENTS_DIR/current"
echo "Lien symbolique mis à jour: current -> $DEPLOY_ID" | tee -a "$LOG_FILE"

# Gérer les certificats SSL
LETS_ENCRYPT_DIR="$HOME/letsencrypt/live/hargile.eu"
mkdir -p "$DEPLOY_DIR/.docker/config/ssl"

if [ -f "$LETS_ENCRYPT_DIR/privkey.pem" ] && [ -f "$LETS_ENCRYPT_DIR/fullchain.pem" ]; then
  echo "Certificats Let's Encrypt trouvés, utilisation des certificats existants..." | tee -a "$LOG_FILE"
  cp "$LETS_ENCRYPT_DIR/privkey.pem" "$LETS_ENCRYPT_DIR/fullchain.pem" "$DEPLOY_DIR/.docker/config/ssl/"
else
  echo "Aucun certificat trouvé, Let's Encrypt sera configuré après le déploiement..." | tee -a "$LOG_FILE"
  touch "$DEPLOY_DIR/.docker/config/ssl/privkey.pem" "$DEPLOY_DIR/.docker/config/ssl/fullchain.pem"
fi

# Naviguer vers le répertoire de l'application
cd "$DEPLOYMENTS_DIR/current"

# Vérifier Node.js et npm
command -v node &>/dev/null || {
  echo "ERREUR: Node.js n'est pas installé!" | tee -a "$LOG_FILE"
  exit 1
}
command -v npm &>/dev/null || {
  echo "ERREUR: npm n'est pas installé!" | tee -a "$LOG_FILE"
  exit 1
}

# Installation des dépendances et build
echo "Installation des dépendances Node.js..." | tee -a "$LOG_FILE"
npm ci || {
  echo "ERREUR: Échec de l'installation des dépendances!" | tee -a "$LOG_FILE"
  exit 1
}

echo "Construction de l'application Next.js..." | tee -a "$LOG_FILE"
npm run build || {
  echo "ERREUR: Échec du build Next.js!" | tee -a "$LOG_FILE"
  exit 1
}

# Naviguer vers le répertoire .docker
cd "$DEPLOYMENTS_DIR/current/.docker"

# Construire et démarrer les conteneurs
echo "Démarrage des conteneurs..." | tee -a "$LOG_FILE"
DEPLOY_ID=$DEPLOY_ID docker compose up -d --build || {
  echo "ERREUR: Échec du démarrage des conteneurs!" | tee -a "$LOG_FILE"
  exit 1
}

# Vérifier la santé du déploiement
echo "Vérification de la santé..." | tee -a "$LOG_FILE"
bash ./scripts/healthcheck.sh || {
  echo "ERREUR: Échec de la vérification de santé, lancement du rollback..." | tee -a "$LOG_FILE"
  bash ./scripts/rollback.sh auto "Échec de la vérification de santé"
  exit 1
}

# Configurer Let's Encrypt si nécessaire
if [ ! -f "$LETS_ENCRYPT_DIR/privkey.pem" ] || [ ! -f "$LETS_ENCRYPT_DIR/fullchain.pem" ]; then
  echo "Configuration des certificats Let's Encrypt..." | tee -a "$LOG_FILE"
  docker exec ols-server bash -c 'cd /usr/local/lsws/addon/letsencrypt && ./letsencrypt.sh' || {
    echo "ATTENTION: La génération des certificats Let's Encrypt a échoué." | tee -a "$LOG_FILE"
  }
fi

# Nettoyer les anciens déploiements (garder les 5 plus récents)
ls -t "$DEPLOYMENTS_DIR/versions" | tail -n +6 | xargs -I {} rm -rf "$DEPLOYMENTS_DIR/versions/{}" 2>/dev/null
echo "Anciens déploiements nettoyés" | tee -a "$LOG_FILE"

echo "=== Déploiement réussi: $DEPLOY_ID ===" | tee -a "$LOG_FILE"
