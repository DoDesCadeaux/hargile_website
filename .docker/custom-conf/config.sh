#!/bin/bash

# Débogage
echo "=== DEBUG INFO ==="
echo "PWD: $(pwd)"
echo "DOMAIN: $DOMAIN"
echo "Environment variables:"
env
echo "=== END DEBUG ==="

# Définir explicitement le domaine
DOMAIN=${DOMAIN:-hargile.eu}
echo "Using domain: $DOMAIN"

# Installer acme.sh
curl https://get.acme.sh | sh

# Obtenir les certificats SSL
/root/.acme.sh/acme.sh --issue --domain "$DOMAIN" --domain "www.$DOMAIN" --webroot /usr/local/lsws/Example/html/ --force

# Créer la configuration du virtual host
mkdir -p /usr/local/lsws/conf/vhosts/"$DOMAIN"
cat > /usr/local/lsws/conf/vhosts/"$DOMAIN"/vhconf.conf << VHCONF
docRoot                   \$VH_ROOT/html
enableGzip                1
enableBr                  1

# SSL Configuration
keyFile                   /root/.acme.sh/$DOMAIN/privkey.pem
certFile                  /root/.acme.sh/$DOMAIN/fullchain.pem
sslProtocol               24
enableECDHE               1
VHCONF

# Ajouter la configuration du proxy dans la configuration principale
cat >> /usr/local/lsws/conf/httpd_config.conf << HTTPD

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

virtualhost $DOMAIN {
  vhRoot                  /usr/local/lsws/Example/html/
  configFile              \$SERVER_ROOT/conf/vhosts/$DOMAIN/vhconf.conf
  allowSymbolLink         1
  enableScript            1
  restrained              1
  setUIDMode              0
  vhAliases               www.$DOMAIN
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
  rules                   <<<END_rules
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://$DOMAIN/\$1 [R=301,L]
RewriteRule ^(.*)$ http://nextjs:3000/\$1 [P,L]
  END_rules
}
HTTPD

# Redémarrer OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart
