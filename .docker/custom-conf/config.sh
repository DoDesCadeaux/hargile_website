#!/bin/bash

DOMAIN=${DOMAIN:-hargile.eu}
EMAIL=${EMAIL:-gogolus2000@gmail.com}
echo "Using domain: $DOMAIN"

# Installer des outils de diagnostic
apt-get update && apt-get install -y curl iputils-ping dnsutils net-tools

# Créer un fichier HTML de test
mkdir -p /usr/local/lsws/Example/html/test
echo "<h1>Test Page</h1><p>This is a test page to verify OpenLiteSpeed is working.</p>" > /usr/local/lsws/Example/html/test/index.html

# Créer une configuration simple
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

extprocessor lsphp {
  type                    lsapi
  address                 uds://tmp/lshttpd/lsphp.sock
  maxConns                10
  env                     PHP_LSAPI_CHILDREN=10
  env                     LSAPI_AVOID_FORK=200M
  initTimeout             60
  retryTimeout            0
  persistConn             1
  respBuffer              0
  autoStart               1
  path                    fcgi-bin/lsphp5
  backlog                 100
  instances               1
  priority                0
  memSoftLimit            2047M
  memHardLimit            2047M
  procSoftLimit           400
  procHardLimit           500
}

virtualHost Example {
  vhRoot                  /usr/local/lsws/Example/
  configFile              conf/vhosts/Example/vhconf.conf
  allowSymbolLink         1
  enableScript            1
  restrained              1
  setUIDMode              0
}

listener Default {
  address                 *:80
  secure                  0
  map                     Example *
}
HTTPD

# Configuration du virtual host
cat > /usr/local/lsws/conf/vhosts/Example/vhconf.conf << VHCONF
docRoot                   \$VH_ROOT/html/
enableGzip                1

scripthandler  {
  add                     lsapi:lsphp php
}

extprocessor lsphp {
  type                    lsapi
  address                 uds://tmp/lshttpd/lsphp.sock
  maxConns                35
  env                     LSAPI_CHILDREN=35
  initTimeout             600
  retryTimeout            0
  persistConn             1
  respBuffer              0
}

context /test {
  location                \$VH_ROOT/html/test/
  allowBrowse             1
  enableExpires           1
}

rewrite  {
  enable                  1
  autoLoadHtaccess        1
}
VHCONF

# Redémarrer OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart

# Attendre le démarrage du serveur
sleep 5

# Exécuter le diagnostic
chmod +x /usr/src/lsws-config/diagnose.sh
/usr/src/lsws-config/diagnose.sh > /tmp/diagnosis.log 2>&1

echo "==== BASIC TEST ===="
echo "Testing basic HTTP functionality..."
curl -v http://localhost/test/
echo "Diagnosis completed - check logs for details"
