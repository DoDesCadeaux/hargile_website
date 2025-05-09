#!/bin/bash

DOMAIN=${DOMAIN:-hargile.eu}
EMAIL=${EMAIL:-gogolus2000@gmail.com}
echo "Using domain: $DOMAIN"

# Installer acme.sh
curl https://get.acme.sh | sh

# Enregistrer le compte
/root/.acme.sh/acme.sh --register-account -m "$EMAIL"

# Installer les outils de diagnostic
apt-get update && apt-get install -y curl iputils-ping dnsutils net-tools

# Créer une structure de base pour le site
mkdir -p /usr/local/lsws/Example/html
echo "<h1>Test Page</h1><p>This is a test page at root to verify OpenLiteSpeed is working.</p>" > /usr/local/lsws/Example/html/index.html

# Créer une configuration simple pour OpenLiteSpeed
cat > /usr/local/lsws/conf/httpd_config.conf << HTTPD
serverName                $DOMAIN
user                      nobody
group                     nogroup
priority                  0
inMemBufSize              60M
swappingDir               /tmp/lshttpd/swap
autoFix503                1
gracefulRestartTimeout    300
mime                      conf/mime.properties
showVersionNumber         0
adminEmails               root@localhost

errorlog logs/error.log {
  useServer               1
  logLevel                DEBUG
  rollingSize             10M
}

accesslog logs/access.log {
  useServer               0
  rollingSize             10M
  keepDays                30
  compressArchive         0
}

indexFiles                index.html, index.php

expires  {
  enableExpires           1
  expiresByType           image/*=A604800,text/css=A604800,application/x-javascript=A604800,application/javascript=A604800,font/*=A604800,application/x-font-ttf=A604800
}

tuning  {
  maxConnections          10000
  maxSSLConnections       10000
  connTimeout             300
  maxKeepAliveReq         10000
  keepAliveTimeout        5
  sndBufSize              0
  rcvBufSize              0
  maxReqURLLen            32768
  maxReqHeaderSize        65536
  maxReqBodySize          2047M
  maxDynRespHeaderSize    32768
  maxDynRespSize          2047M
  maxCachedFileSize       4096
  totalInMemCacheSize     20M
  maxMMapFileSize         256K
  totalMMapCacheSize      40M
  useSendfile             1
  fileETag                28
  enableGzipCompress      1
  compressibleTypes       text/*, application/javascript, application/xml, application/json, application/x-javascript, application/x-httpd-php, image/svg+xml
  enableDynGzipCompress   1
  gzipCompressLevel       6
  gzipAutoUpdateStatic    1
  gzipStaticCompressLevel 6
  brStaticCompressLevel   6
  gzipMaxFileSize         10M
  gzipMinFileSize         300
}

accessControl  {
  allow                   ALL
}

# Configuration pour le proxy Next.js
extprocessor nextjs {
  type                    proxy
  address                 nextjs:3000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

virtualHost Example {
  vhRoot                  /usr/local/lsws/Example/
  configFile              conf/vhosts/Example/vhconf.conf
  allowSymbolLink         1
  enableScript            1
  restrained              0
}

listener Default {
  address                 *:80
  secure                  0
  map                     Example *
}

listener SSL {
  address                 *:443
  secure                  1
  keyFile                 /usr/local/lsws/conf/example.key
  certFile                /usr/local/lsws/conf/example.crt
  map                     Example *
}
HTTPD

# Créer un certificat auto-signé temporaire pour le SSL
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /usr/local/lsws/conf/example.key \
  -out /usr/local/lsws/conf/example.crt \
  -subj "/CN=$DOMAIN"

# Configuration du virtual host
cat > /usr/local/lsws/conf/vhosts/Example/vhconf.conf << VHCONF
docRoot                   \$VH_ROOT/html/
enableGzip                1

# Pour le proxy Next.js
context / {
  type                    proxy
  handler                 nextjs
  addDefaultCharset       off
}

# Pour les fichiers statiques
context /static/ {
  location                \$VH_ROOT/html/static/
  allowBrowse             1
  enableExpires           1
}

rewrite  {
  enable                  0
}
VHCONF

# Redémarrer OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart

# Test de la configuration
echo "==== TESTING LOCAL SERVER ===="
curl -v http://localhost/

# Ajouter un message de diagnostic
echo "==============================================="
echo "Configuration completed!"
echo "- HTTP should be working at http://$DOMAIN"
echo "- Admin interface at https://[server-ip]:7080"
echo "- Next.js content should be proxied from port 3000"
echo "==============================================="
