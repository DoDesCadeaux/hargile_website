#!/bin/bash

# Create project directories
mkdir -p logs
mkdir -p openlitespeed/{conf,admin-conf,vhosts}
mkdir -p ssl/acme
mkdir -p ssl/scripts

# Set up environment
if [ ! -f .env ]; then
  read -p "Domain (e.g. example.com): " DOMAIN
  read -p "Email for SSL certificates: " EMAIL

  # Create .env file
  cat > .env << ENVFILE
# Domain Configuration
DOMAIN=$DOMAIN
ADDITIONAL_DOMAINS=www.$DOMAIN

# Email for Let's Encrypt notifications
EMAIL=$EMAIL

# OpenLiteSpeed Configuration
OLS_VERSION=latest
OLS_ADMIN_USER=admin
OLS_ADMIN_PASS=

# SSL Configuration
SSL_FORCE_RENEWAL=0
SSL_CHALLENGE_TYPE=webroot
SSL_RENEWAL_DAYS=30

# Docker Configuration
CONTAINER_NAME_PREFIX=hargile
TZ=Europe/Brussels

# Performance Tuning
OLS_MAX_CONNECTIONS=10000
OLS_WORKER_PROCESSES=1

# Next.js Configuration
NODE_ENV=production
NEXTJS_PORT=3000
NEXT_DEBUG=false
ENVFILE
fi

# Créer les scripts SSL
cat > ssl/scripts/initial-cert.sh << 'SCRIPT'
#!/bin/bash

# Base directory path
BASE_DIR=$(dirname $(dirname $(realpath "$0")))
DOMAIN=$(grep DOMAIN "$BASE_DIR/.env" | cut -d= -f2)
EMAIL=$(grep EMAIL "$BASE_DIR/.env" | cut -d= -f2)

# Install acme.sh if not already installed
docker exec ols-server bash -c 'if [ ! -f "/root/.acme.sh/acme.sh" ]; then curl https://get.acme.sh | sh; fi'

# Wait for acme.sh to be available
sleep 5

# Obtain initial certificate
docker exec ols-server bash -c "/root/.acme.sh/acme.sh --issue --domain $DOMAIN --domain www.$DOMAIN --webroot /usr/local/lsws/Example/html/ --email $EMAIL --force"

mkdir -p "$BASE_DIR/logs"
echo "[$(date)] Initial certificate for $DOMAIN obtained" >> "$BASE_DIR/logs/ssl-init.log"
SCRIPT

cat > ssl/scripts/configure-ssl.sh << 'SCRIPT'
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

mkdir -p "$BASE_DIR/logs"
echo "[$(date)] SSL configuration for $DOMAIN applied" >> "$BASE_DIR/logs/ssl-config.log"
SCRIPT

cat > ssl/scripts/renew-certs.sh << 'SCRIPT'
#!/bin/bash

# Base directory path
BASE_DIR=$(dirname $(dirname $(realpath "$0")))
DOMAIN=$(grep DOMAIN "$BASE_DIR/.env" | cut -d= -f2)

# Certificate renewal
docker exec ols-server /root/.acme.sh/acme.sh --cron --home /root/.acme.sh

# Restart OpenLiteSpeed after renewal
docker exec ols-server su -c '/usr/local/lsws/bin/lswsctrl restart'

mkdir -p "$BASE_DIR/logs"
echo "[$(date)] Certificate for $DOMAIN verified/renewed" >> "$BASE_DIR/logs/ssl-renew.log"
SCRIPT

cat > ssl/scripts/setup-cron.sh << 'SCRIPT'
#!/bin/bash

# Base directory path
BASE_DIR=$(dirname $(dirname $(realpath "$0")))
SCRIPT_PATH="$BASE_DIR/ssl/scripts/renew-certs.sh"

# Add renewal script to crontab (runs daily at 2 AM)
(crontab -l 2>/dev/null | grep -v "$SCRIPT_PATH"; echo "0 2 * * * $SCRIPT_PATH") | crontab -

echo "Cron job for certificate renewal successfully configured!"
SCRIPT

cat > ssl/scripts/deploy.sh << 'SCRIPT'
#!/bin/bash

# Base directory path
BASE_DIR=$(dirname $(dirname $(realpath "$0")))
cd $BASE_DIR

# Create necessary directories if they don't exist
mkdir -p ssl/acme openlitespeed/{conf,admin-conf,vhosts} logs

# Start containers
docker compose up -d

# Wait for containers to start
echo "Waiting for containers to start..."
sleep 10

# Obtain and configure SSL certificate
$BASE_DIR/ssl/scripts/initial-cert.sh
$BASE_DIR/ssl/scripts/configure-ssl.sh

# Restart OpenLiteSpeed to apply configurations
docker compose restart openlitespeed

echo "=====================================================
          Deployment complete!
=====================================================
Access your site at: https://$(grep DOMAIN $BASE_DIR/.env | cut -d= -f2)
Access OpenLiteSpeed admin at: https://your-server-ip:7080"
SCRIPT

# Make scripts executable
chmod +x init.sh
chmod +x ssl/scripts/*.sh

# Configure cron for certificate renewal
./ssl/scripts/setup-cron.sh

echo "Initialization complete! Run ./ssl/scripts/deploy.sh to deploy your application."
