#!/bin/bash

# Base directory path
BASE_DIR=$(dirname $(dirname $(realpath "$0")))
DOMAIN=$(grep DOMAIN "$BASE_DIR/.env" | cut -d= -f2)

# Virtual host configuration with SSL
mkdir -p $BASE_DIR/openlitespeed/vhosts/$DOMAIN
cat > "$BASE_DIR/openlitespeed/vhosts/$DOMAIN/vhconf.conf" << VHCONF
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
cat > "$BASE_DIR/openlitespeed/conf/httpd_config.conf" << HTTPD
# Next.js proxy configuration
extprocessor nextjs {
  type                    proxy
  address                 nextjs:3000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

# Rewrite rules
rewrite {
  enable                  1
  autoLoadHtaccess        1
  rules                   <<<END_rules
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ HTTPS://$DOMAIN/\$1 [R=301,L]
RewriteRule ^(.*)$ HTTP://nextjs/\$1 [P,L,E=PROXY-HOST:$DOMAIN]
  END_rules
}
HTTPD

echo "[$(date)] SSL configuration for $DOMAIN applied" >> "$BASE_DIR/logs/ssl-config.log"
