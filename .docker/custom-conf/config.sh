#!/bin/bash

# Débogage
echo "=== DEBUG INFO ==="
echo "PWD: $(pwd)"
echo "DOMAIN: $DOMAIN"
echo "EMAIL: $EMAIL"
echo "=== END DEBUG ==="

# Définir explicitement le domaine et l'email
DOMAIN=${DOMAIN:-hargile.eu}
EMAIL=${EMAIL:-gogolus2000@gmail.com}
echo "Using domain: $DOMAIN"
echo "Using email: $EMAIL"

# Installer acme.sh
curl https://get.acme.sh | sh

# Enregistrer le compte avec l'email
/root/.acme.sh/acme.sh --register-account -m "$EMAIL"

# Obtenir les certificats SSL
/root/.acme.sh/acme.sh --issue --domain "$DOMAIN" --domain "www.$DOMAIN" --webroot /usr/local/lsws/Example/html/ --force

# Sauvegarder la configuration existante
cp /usr/local/lsws/conf/httpd_config.conf /usr/local/lsws/conf/httpd_config.conf.bak

# Créer une nouvelle configuration complète
cat > /usr/local/lsws/conf/httpd_config.conf << HTTPD
# HTTP/HTTPS listeners
listener Default {
  address                 *:80
  secure                  0
}

listener SSL {
  address                 *:443
  secure                  1
  keyFile                 /root/.acme.sh/$DOMAIN/privkey.pem
  certFile                /root/.acme.sh/$DOMAIN/fullchain.pem
  sslProtocol             24
  enableECDHE             1
}

# Virtual Host Definition
virtualHost $DOMAIN {
  vhRoot                  /usr/local/lsws/Example/html/
  allowSymbolLink         1
  enableScript            1
  restrained              1
  
  # Domain Names
  domain                  $DOMAIN
  domain                  www.$DOMAIN
  
  # Configuration
  configFile              \$SERVER_ROOT/conf/vhosts/$DOMAIN/vhconf.conf
  
  # Mappings
  listener Default {
    map                 $DOMAIN $DOMAIN
    map                 www.$DOMAIN $DOMAIN
  }
  
  listener SSL {
    map                 $DOMAIN $DOMAIN
    map                 www.$DOMAIN $DOMAIN
  }
}

# Next.js Proxy Configuration
extprocessor nextjs {
  type                    proxy
  address                 nextjs:3000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}
HTTPD

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

# HTTP to HTTPS redirection
context / {
  type                    module
  location                HANDLER
  handler                 rewrite
  rewrite {
    enable                1
    rules                 <<<END_rules
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
    END_rules
  }
}

# Next.js Proxy
context / {
  type                    proxy
  handler                 nextjs
  addDefaultCharset       off
}
VHCONF

# Redémarrer OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart

echo "Configuration completed - site should be accessible at http://$DOMAIN and https://$DOMAIN"
