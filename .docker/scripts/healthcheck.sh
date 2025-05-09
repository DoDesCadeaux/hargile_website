#!/bin/bash
set -e

# Initialize logging
LOG_FILE="/home/hargile.eu/deployments/healthcheck.log"
echo "=== Vérification de l'état $(date) ===" >> "$LOG_FILE"

echo "Vérification de l'état du déploiement" | tee -a "$LOG_FILE"

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments

# Vérifier si un déploiement actuel existe
if [ ! -L "$DEPLOYMENTS_DIR/current" ]; then
  echo "❌ Aucun déploiement actuel trouvé!" | tee -a "$LOG_FILE"
  exit 1
fi

CURRENT_VERSION=$(cat "$DEPLOYMENTS_DIR/current_version" 2>/dev/null || echo "unknown")
echo "Version déployée: $CURRENT_VERSION" | tee -a "$LOG_FILE"

echo "--- VÉRIFICATION DES CONTENEURS ---" | tee -a "$LOG_FILE"
docker ps | tee -a "$LOG_FILE"

echo "--- TEST HTTP ---" | tee -a "$LOG_FILE"
HTTP_STATUS=$(curl -s -m 5 -o /dev/null -w "%{http_code}" http://localhost:80/ 2>/dev/null || echo "000")
if [[ "$HTTP_STATUS" =~ ^(200|301|302)$ ]]; then
  echo "✅ HTTP fonctionne (status: $HTTP_STATUS)" | tee -a "$LOG_FILE"
else
  echo "❌ HTTP ne fonctionne pas (status: $HTTP_STATUS)" | tee -a "$LOG_FILE"
fi

echo "--- TEST HTTPS ---" | tee -a "$LOG_FILE"
HTTPS_STATUS=$(curl -k -s -m 5 -o /dev/null -w "%{http_code}" https://localhost:443/ 2>/dev/null || echo "000")
if [[ "$HTTPS_STATUS" =~ ^(200|301|302)$ ]]; then
  echo "✅ HTTPS fonctionne (status: $HTTPS_STATUS)" | tee -a "$LOG_FILE"
else
  echo "❌ HTTPS ne fonctionne pas (status: $HTTPS_STATUS)" | tee -a "$LOG_FILE"
fi

echo "--- TEST API NEXT.JS ---" | tee -a "$LOG_FILE"
API_STATUS=$(curl -s -m 5 -o /dev/null -w "%{http_code}" http://localhost:80/api/health 2>/dev/null || echo "000")
if [ "$API_STATUS" = "200" ]; then
  echo "✅ API Next.js fonctionne (status: $API_STATUS)" | tee -a "$LOG_FILE"
else
  echo "❌ API Next.js ne fonctionne pas (status: $API_STATUS)" | tee -a "$LOG_FILE"
fi

# Vérification finale
if [ "$HTTP_STATUS" = "000" ] && [ "$HTTPS_STATUS" = "000" ] && [ "$API_STATUS" = "000" ]; then
  echo "❌ Le site n'est pas accessible" | tee -a "$LOG_FILE"
  exit 1
else
  echo "✅ Vérification terminée - Le site est accessible" | tee -a "$LOG_FILE"
  exit 0
fi
