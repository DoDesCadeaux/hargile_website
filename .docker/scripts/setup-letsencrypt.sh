#!/bin/bash
set -e

# Initialize logging
LOG_FILE="/home/hargile.eu/deployments/letsencrypt.log"
echo "=== Configuration de Let's Encrypt $(date) ===" >> "$LOG_FILE"

# Configuration des chemins
APP_DIR=/home/hargile.eu
CONFIG_DIR=$APP_DIR/.docker/config
LETSENCRYPT_DIR="$HOME/letsencrypt/live/hargile.eu"

# Vérifier si les certificats existent
if [ -f "$LETSENCRYPT_DIR/privkey.pem" ] && [ -f "$LETSENCRYPT_DIR/fullchain.pem" ]; then
  echo "Certificats Let's Encrypt trouvés!" | tee -a "$LOG_FILE"
  echo "Date d'expiration du certificat:" | tee -a "$LOG_FILE"
  openssl x509 -in "$LETSENCRYPT_DIR/fullchain.pem" -noout -dates | tee -a "$LOG_FILE"
  exit 0
fi

# S'assurer que le conteneur OpenLiteSpeed est en cours d'exécution
if ! docker ps | grep -q ols-server; then
  echo "ERREUR: Le conteneur OpenLiteSpeed n'est pas en cours d'exécution!" | tee -a "$LOG_FILE"
  exit 1
fi

# Configurer Let's Encrypt
echo "Génération des certificats Let's Encrypt..." | tee -a "$LOG_FILE"
docker exec ols-server bash -c 'cd /usr/local/lsws/addon/letsencrypt && ./letsencrypt.sh' || {
  echo "ERREUR: Échec de la génération des certificats!" | tee -a "$LOG_FILE"
  echo "Vérifiez que le domaine pointe vers l'IP du serveur et que les ports 80/443 sont ouverts." | tee -a "$LOG_FILE"
  exit 1
}

# Vérifier les certificats
if [ -f "$LETSENCRYPT_DIR/privkey.pem" ] && [ -f "$LETSENCRYPT_DIR/fullchain.pem" ]; then
  echo "Certificats Let's Encrypt générés avec succès!" | tee -a "$LOG_FILE"
  mkdir -p "$CONFIG_DIR/ssl"
  cp "$LETSENCRYPT_DIR/privkey.pem" "$LETSENCRYPT_DIR/fullchain.pem" "$CONFIG_DIR/ssl/"

  # Redémarrer OpenLiteSpeed
  docker exec ols-server /usr/local/lsws/bin/lswsctrl restart
  echo "Certificats SSL installés et serveur redémarré!" | tee -a "$LOG_FILE"

  # Configurer le renouvellement automatique
  echo "Configuration du renouvellement automatique..." | tee -a "$LOG_FILE"
  CRON_JOB="0 0 * * * docker exec ols-server bash -c 'cd /usr/local/lsws/addon/letsencrypt && ./letsencrypt.sh' >> $LOG_FILE 2>&1"
  (crontab -l 2>/dev/null || true; echo "$CRON_JOB") | crontab -
  echo "Renouvellement automatique configuré!" | tee -a "$LOG_FILE"
else
  echo "ERREUR: Les certificats n'ont pas été générés!" | tee -a "$LOG_FILE"
  exit 1
fi
