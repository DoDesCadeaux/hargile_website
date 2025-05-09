#!/bin/bash

set -e

echo "=== Configuration du serveur ==="

APP_DIR=/home/hargile.eu
DOCKER_DIR=$APP_DIR/deployments/current/.docker
# shellcheck disable=SC2034
SCRIPTS_DIR=$(dirname "$(readlink -f "$0")")
CONFIG_DIR="$DOCKER_DIR/config/ols"

cd $DOCKER_DIR

mkdir -p $CONFIG_DIR
mkdir -p $DOCKER_DIR/ssl
mkdir -p $DOCKER_DIR/custom-conf/vhosts/hargile.eu

if [ ! -f "$DOCKER_DIR/ssl/privkey.pem" ]; then
  echo "Génération d'un certificat SSL auto-signé..."
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout $DOCKER_DIR/ssl/privkey.pem \
    -out $DOCKER_DIR/ssl/fullchain.pem \
    -subj '/CN=hargile.eu'
  echo "Certificat SSL auto-signé créé"
fi

cat > $DOCKER_DIR/custom-conf/httpd_config.conf << 'EOF'
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
EOF
echo "Configuration principale créée: httpd_config.conf"

cat > $DOCKER_DIR/custom-conf/vhosts/hargile.eu/vhconf.conf << 'EOF'
docRoot                   $VH_ROOT
enableGzip                1

context / {
  type                    proxy
  handler                 nextjs
  addDefaultCharset       off
}

rewrite {
  enable                  0
}
EOF
echo "Configuration vhost créée: vhconf.conf"

cp $DOCKER_DIR/custom-conf/httpd_config.conf $CONFIG_DIR/httpd_config.conf.template
cp $DOCKER_DIR/custom-conf/vhosts/hargile.eu/vhconf.conf $CONFIG_DIR/vhost.conf.template
echo "Templates de configuration sauvegardés"

sed -i 's#- ./custom-conf:/usr/src/lsws-config#- ./custom-conf:/usr/local/lsws/conf#g' docker-compose.yml
echo "Chemin de montage des configurations modifié"

if ! grep -q './ssl:/ssl' docker-compose.yml; then
  VOLUMES_LINE=$(grep -n "volumes:" docker-compose.yml | grep -v nextjs | head -1 | cut -d: -f1)
  sed -i "${VOLUMES_LINE}a\\      - ./ssl:/ssl" docker-compose.yml
  echo "Montage SSL ajouté"
fi

docker compose up -d --build
echo "Conteneurs redémarrés avec la nouvelle configuration"

echo "=== Configuration du serveur terminée ==="
