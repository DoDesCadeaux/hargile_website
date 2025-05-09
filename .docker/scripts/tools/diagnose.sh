#!/bin/bash

echo "=== Outil de diagnostic du serveur ==="

DOCKER_DIR=/home/hargile.eu/deployments/current/.docker
# shellcheck disable=SC2164
cd $DOCKER_DIR

echo "--- CONTENEURS DOCKER ---"
docker ps -a

echo "--- RÉSEAUX DOCKER ---"
docker network ls
docker network inspect app-network

echo "--- VOLUMES DOCKER ---"
docker volume ls

echo "--- CONFIGURATION OPENLITESPEED ---"
echo "Fichier httpd_config.conf:"
docker exec ols-server cat /usr/local/lsws/conf/httpd_config.conf 2>/dev/null ||
  echo "⚠️ Fichier introuvable"

echo "Configuration vhost:"
docker exec ols-server cat /usr/local/lsws/conf/vhosts/hargile.eu/vhconf.conf 2>/dev/null ||
  echo "⚠️ Fichier introuvable"

echo "--- PROCESSUS OPENLITESPEED ---"
docker exec ols-server ps aux | grep lsws

echo "--- CONNEXIONS RÉSEAU ---"
docker exec ols-server netstat -tulpn 2>/dev/null ||
  echo "⚠️ Commande netstat non disponible"

echo "--- TEST DE RÉSOLUTION DNS ---"
docker exec ols-server ping -c 2 nextjs 2>/dev/null ||
  echo "⚠️ Commande ping non disponible ou échec de résolution"

echo "--- LOGS OPENLITESPEED ---"
docker exec ols-server cat /usr/local/lsws/logs/error.log | tail -30 2>/dev/null ||
  echo "⚠️ Fichier de log introuvable"

echo "--- LOGS NEXT.JS ---"
docker logs nextjs-app --tail 30

echo "--- CERTIFICATS SSL ---"
docker exec ols-server ls -la /ssl/ 2>/dev/null ||
  echo "⚠️ Répertoire /ssl/ introuvable"

if [ -f "$DOCKER_DIR/ssl/fullchain.pem" ]; then
  echo "Informations sur le certificat SSL:"
  openssl x509 -in $DOCKER_DIR/ssl/fullchain.pem -text -noout | grep -E 'Subject:|Issuer:|Not Before:|Not After :'
fi

echo "--- TESTS DE CONNECTIVITÉ ---"
echo "Test HTTP (port 80):"
curl -v http://localhost:80/ 2>&1 | grep -E "HTTP|Location|Error"

echo "Test HTTPS (port 443):"
curl -k -v https://localhost:443/ 2>&1 | grep -E "HTTP|Location|Error"

echo "Test Next.js (port 3000):"
curl -v http://localhost:3000/ 2>&1 | grep -E "HTTP|Location|Error"

echo "=== Diagnostic terminé ==="
