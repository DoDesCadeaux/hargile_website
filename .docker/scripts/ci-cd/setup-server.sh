#!/bin/bash
set -e

echo "=== Configuration du serveur ==="

# Utilisez un chemin absolu pour être sûr
APP_DIR=/home/hargile.eu
DOCKER_DIR=$APP_DIR/.docker
CONFIG_DIR="$DOCKER_DIR/config/ols"

cd $DOCKER_DIR

# Assurez-vous que les répertoires existent
mkdir -p $CONFIG_DIR
mkdir -p $DOCKER_DIR/ssl
mkdir -p $DOCKER_DIR/custom-conf/vhosts/hargile.eu

# Générez un certificat SSL si nécessaire
if [ ! -f "$DOCKER_DIR/ssl/privkey.pem" ]; then
  echo "Génération d'un certificat SSL auto-signé..."
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout $DOCKER_DIR/ssl/privkey.pem \
    -out $DOCKER_DIR/ssl/fullchain.pem \
    -subj '/CN=hargile.eu'
  echo "Certificat SSL auto-signé créé"
fi

# Utilisez les templates existants si disponibles
if [ -f "$CONFIG_DIR/httpd_config.conf.template" ]; then
  cp $CONFIG_DIR/httpd_config.conf.template $DOCKER_DIR/custom-conf/httpd_config.conf
  echo "Configuration principale créée à partir du template"
else
  # Sinon, créez la configuration principale
  cat > $DOCKER_DIR/custom-conf/httpd_config.conf << 'END'
serverName                hargile.eu
user                      nobody
group                     nogroup
priority                  0
inMemBufSize              60M
swappingDir               /tmp/lshttpd/swap
autoFix503                1
gracefulRestartTimeout    300
mime                      conf/mime.properties
showVersionNumber         0

extprocessor nextjs {
  type                    proxy
  address                 nextjs:3000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

virtualHost hargile.eu {
  vhRoot                  /var/www/html/
  configFile              conf/vhosts/hargile.eu/vhconf.conf
  allowSymbolLink         1
  enableScript            1
  restrained              0
}

listener HTTP {
  address                 *:80
  secure                  0
  map                     hargile.eu hargile.eu
}

listener HTTPS {
  address                 *:443
  secure                  1
  keyFile                 /ssl/privkey.pem
  certFile                /ssl/fullchain.pem
  map                     hargile.eu hargile.eu
}
END
  echo "Configuration principale créée"

  # Sauvegardez le template pour référence future
  cp $DOCKER_DIR/custom-conf/httpd_config.conf $CONFIG_DIR/httpd_config.conf.template
fi

# Utilisez le template vhost si disponible
if [ -f "$CONFIG_DIR/vhost.conf.template" ]; then
  cp $CONFIG_DIR/vhost.conf.template $DOCKER_DIR/custom-conf/vhosts/hargile.eu/vhconf.conf
  echo "Configuration vhost créée à partir du template"
else
  # Sinon, créez la configuration du vhost
  cat > $DOCKER_DIR/custom-conf/vhosts/hargile.eu/vhconf.conf << 'END'
docRoot                   $VH_ROOT
enableGzip                1

# Configuration de contexte pour toutes les requêtes
context / {
  type                    proxy
  handler                 nextjs
  addDefaultCharset       off
}

# Headers de sécurité
header {
  add    Strict-Transport-Security max-age=31536000; includeSubDomains; preload
  add    X-Frame-Options SAMEORIGIN
  add    X-Content-Type-Options nosniff
  add    X-XSS-Protection 1; mode=block
  add    Referrer-Policy strict-origin-when-cross-origin
}

# Cache optimization
expires {
  enableExpires           1
  expiresByType           image/*=A2592000, text/css=A2592000, application/javascript=A2592000, application/font-woff=A2592000
}
END
  echo "Configuration vhost créée"

  # Sauvegardez le template pour référence future
  cp $DOCKER_DIR/custom-conf/vhosts/hargile.eu/vhconf.conf $CONFIG_DIR/vhost.conf.template
fi

# Assurez-vous que le chemin de montage est correct dans docker-compose.yml
sed -i 's#- ./custom-conf:/usr/src/lsws-config#- ./custom-conf:/usr/local/lsws/conf#g' docker-compose.yml
echo "Chemin de montage des configurations vérifié"

# Assurez-vous que le montage SSL est présent
if ! grep -q './ssl:/ssl' docker-compose.yml; then
  VOLUMES_LINE=$(grep -n "volumes:" docker-compose.yml | grep -v nextjs | head -1 | cut -d: -f1)
  if [ -n "$VOLUMES_LINE" ]; then
    sed -i "${VOLUMES_LINE}a\\      - ./ssl:/ssl" docker-compose.yml
    echo "Montage SSL ajouté"
  fi
fi

# Redémarrez les conteneurs avec la nouvelle configuration
docker compose down
docker compose up -d

echo "=== Configuration du serveur terminée ==="
