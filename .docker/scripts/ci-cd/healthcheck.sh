#!/bin/bash

set -e

echo "=== Vérification de l'état du déploiement ==="

DOCKER_DIR=/home/hargile.eu/deployments/current/.docker
cd $DOCKER_DIR

echo "--- VÉRIFICATION DES CONTENEURS ---"
docker ps

echo "--- VÉRIFICATION DE LA CONFIGURATION ---"
docker exec ols-server ls -la /usr/local/lsws/conf/ 2>/dev/null ||
  echo "⚠️ Impossible d'accéder à /usr/local/lsws/conf/"
docker exec ols-server ls -la /ssl/ 2>/dev/null ||
  echo "⚠️ Impossible d'accéder à /ssl/"

echo "--- LOGS OPENLITESPEED ---"
docker logs ols-server --tail 25

echo "--- TEST DE COMMUNICATION INTERNE ---"
docker exec ols-server curl -s http://nextjs:3000/ 2>/dev/null ||
  echo "⚠️ Impossible de se connecter à Next.js"

echo "--- LOGS NEXT.JS ---"
docker logs nextjs-app --tail 25

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

if [ "$HTTP_STATUS" = "000" ] && [ "$HTTPS_STATUS" = "000" ]; then
  echo "❌ Le site n'est pas accessible"
  exit 1
else
  echo "✅ Vérification terminée - Le site est accessible"
  exit 0
fi
