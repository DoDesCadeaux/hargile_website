#!/bin/bash
set -e

echo "=== Configuration de Let's Encrypt ==="

# Configuration des chemins
APP_DIR=/home/hargile.eu
CONFIG_DIR=$APP_DIR/.docker/config
LETSENCRYPT_DIR="$HOME/letsencrypt/live/hargile.eu"

# Vérifier si les certificats existent déjà
if [ -f "$LETSENCRYPT_DIR/privkey.pem" ] && [ -f "$LETSENCRYPT_DIR/fullchain.pem" ]; then
  echo "Certificats Let's Encrypt trouvés!"
  echo "Date d'expiration du certificat:"
  openssl x509 -in "$LETSENCRYPT_DIR/fullchain.pem" -noout -dates | grep notAfter
  exit 0
fi

echo "Génération des certificats Let's Encrypt..."

# S'assurer que le conteneur OpenLiteSpeed est en cours d'exécution
if ! docker ps | grep -q ols-server; then
  echo "ERREUR: Le conteneur OpenLiteSpeed n'est pas en cours d'exécution!"
  echo "Veuillez démarrer les conteneurs avant de configurer Let's Encrypt:"
  echo "  cd $APP_DIR/deployments/current/.docker"
  echo "  docker compose up -d"
  exit 1
fi

# Configurer Let's Encrypt avec OpenLiteSpeed
docker exec -it ols-server bash -c 'cd /usr/local/lsws/addon/letsencrypt && ./letsencrypt.sh'

# Vérifier si les certificats ont été générés
if [ -f "$LETSENCRYPT_DIR/privkey.pem" ] && [ -f "$LETSENCRYPT_DIR/fullchain.pem" ]; then
  echo "Certificats Let's Encrypt générés avec succès!"

  # Copier les certificats dans le répertoire de configuration
  mkdir -p $CONFIG_DIR/ssl
  cp $LETSENCRYPT_DIR/privkey.pem $CONFIG_DIR/ssl/
  cp $LETSENCRYPT_DIR/fullchain.pem $CONFIG_DIR/ssl/

  # Redémarrer OpenLiteSpeed pour appliquer les nouveaux certificats
  docker exec ols-server /usr/local/lsws/bin/lswsctrl restart

  echo "Certificats SSL installés et serveur redémarré!"
else
  echo "ERREUR: La génération des certificats Let's Encrypt a échoué."
  echo "Veuillez vérifier les points suivants:"
  echo "  1. Assurez-vous que votre domaine pointe vers l'adresse IP du serveur"
  echo "  2. Vérifiez que les ports 80 et 443 sont ouverts dans votre pare-feu"
  echo "  3. Vérifiez les logs d'OpenLiteSpeed pour plus d'informations"
  exit 1
fi

echo "=== Configuration de Let's Encrypt terminée ==="
echo ""
echo "Pour renouveler manuellement les certificats à l'avenir:"
echo "  docker exec -it ols-server bash -c 'cd /usr/local/lsws/addon/letsencrypt && ./letsencrypt.sh'"
