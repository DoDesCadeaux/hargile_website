#!/bin/bash
set -e

echo "=== Vérification de l'état du déploiement ==="

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments

# Vérifier si un déploiement actuel existe
if [ ! -L $DEPLOYMENTS_DIR/current ]; then
  echo "❌ Aucun déploiement actuel trouvé!"
  exit 1
fi

# Obtenir la version actuelle
CURRENT_VERSION=$(cat $DEPLOYMENTS_DIR/current_version 2>/dev/null || echo "unknown")
echo "Version déployée: $CURRENT_VERSION"

echo "--- VÉRIFICATION DES CONTENEURS ---"
docker ps

echo "--- VÉRIFICATION DE LA CONFIGURATION ---"
docker exec ols-server ls -la /usr/local/lsws/conf/ 2>/dev/null ||
  echo "⚠️ Impossible d'accéder à /usr/local/lsws/conf/"
docker exec ols-server ls -la /ssl/ 2>/dev/null ||
  echo "⚠️ Impossible d'accéder à /ssl/"

echo "--- LOGS OPENLITESPEED ---"
docker logs ols-server --tail 25

echo "--- VÉRIFICATION NODE.JS ---"
docker exec ols-server node --version
docker exec ols-server npm --version

echo "--- TEST HTTP ---"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80/ 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
  echo "✅ HTTP fonctionne (status: $HTTP_STATUS)"
else
  echo "❌ HTTP ne fonctionne pas (status: $HTTP_STATUS)"
fi

echo "--- TEST HTTPS ---"
HTTPS_STATUS=$(curl -k -s -o /dev/null -w "%{http_code}" https://localhost:443/ 2>/dev/null || echo "000")
if [ "$HTTPS_STATUS" = "200" ] || [ "$HTTPS_STATUS" = "301" ] || [ "$HTTPS_STATUS" = "302" ]; then
  echo "✅ HTTPS fonctionne (status: $HTTPS_STATUS)"
else
  echo "❌ HTTPS ne fonctionne pas (status: $HTTPS_STATUS)"
fi

# Vérification finale
if [ "$HTTP_STATUS" = "000" ] && [ "$HTTPS_STATUS" = "000" ]; then
  echo "❌ Le site n'est pas accessible"
  exit 1
else
  echo "✅ Vérification terminée - Le site est accessible"
  exit 0
fi
