#!/bin/bash

# Base directory path
# shellcheck disable=SC2046
BASE_DIR=$(dirname $(dirname $(dirname $(realpath "$0"))))
# shellcheck disable=SC2086
DOMAIN=$(grep DOMAIN $BASE_DIR/.env | cut -d= -f2)

# Virtual host configuration with SSL
# shellcheck disable=SC2086
mkdir -p $BASE_DIR/openlitespeed/vhosts/$DOMAIN
cat > "$BASE_DIR"/openlitespeed/vhosts/"$DOMAIN"/vhconf.conf << VHCONF
docRoot                   \$VH_ROOT/html
enableGzip                1
enableBr                  1

# SSL Configuration
keyFile                   /root/.acme.sh/$DOMAIN/privkey.pem
certFile                  /root/.acme.sh/$DOMAIN/fullchain.pem
sslProtocol               24
enableECDHE               1
VHCONF

# Proxy configuration for Next.js
cat > "$BASE_DIR"/openlitespeed/conf/httpd_config.conf << HTTPD
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
useIpInProxyHeader        1
adminEmails               root@localhost

errorlog logs/error.log {
  logLevel                DEBUG
  debugLevel              0
  rollingSize             10M
  enableStderrLog         1
}

accesslog logs/access.log {
  rollingSize             10M
  keepDays                30
  compressArchive         0
}

indexFiles                index.html, index.php

expires {
  enableExpires           1
  expiresByType           image/*=A604800,text/css=A604800,application/x-javascript=A604800,application/javascript=A604800,font/*=A604800,application/x-font-ttf=A604800
}

tuning {
  maxConnections          10000
  maxSSLConnections       10000
  connTimeout             300
  maxKeepAliveReq         10000
  smartKeepAlive          0
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
  compressibleTypes       text/*, application/x-javascript, application/javascript, application/xml, application/json, application/x-yaml
  enableDynGzipCompress   1
  gzipAutoUpdateStatic    1
  gzipStaticCompressLevel 6
  gzipMaxFileSize         10M
  gzipMinFileSize         300
}

accessControl {
  allow                   ALL
}

extprocessor nextjs {
  type                    proxy
  address                 nextjs:3000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

scripthandler {
  add proxy:nextjs        *
}

virtualhost $DOMAIN {
  vhRoot                  /usr/local/lsws/Example/html/
  configFile              conf/vhosts/$DOMAIN/vhconf.conf
  allowSymbolLink         1
  enableScript            1
  restrained              1
  smartKeepAlive          1
  vhAliases               www.$DOMAIN
  setUIDMode              0
}

listener Default {
  address                 *:80
  secure                  0
  map                     $DOMAIN $DOMAIN
}

listener SSL {
  address                 *:443
  secure                  1
  keyFile                 /root/.acme.sh/$DOMAIN/privkey.pem
  certFile                /root/.acme.sh/$DOMAIN/fullchain.pem
  map                     $DOMAIN $DOMAIN
}

# Rewrite rules
rewrite {
  enable                  1
  autoLoadHtaccess        1
  rules                   <<<END_rules
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://$DOMAIN/$1 [R=301,L]
RewriteRule ^(.*)$ HTTP://nextjs/$1 [P,L,E=PROXY-HOST:$DOMAIN]
  END_rules
}
HTTPD

echo "[Fri May  9 10:04:31 AM CEST 2025] SSL configuration for $DOMAIN applied" >> "$BASE_DIR"/logs/ssl-config.log
