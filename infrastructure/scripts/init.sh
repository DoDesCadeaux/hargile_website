#!/bin/bash

# Variables
DOMAIN=${1:-hargile.eu}
EMAIL=${2:-info@hargile.com}
WEBHOOK_SECRET=$(openssl rand -hex 32)  # Génère un token aléatoire

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour les logs
log_success() { echo -e "${GREEN}[✓] $1${NC}"; }
log_info() { echo -e "${YELLOW}[i] $1${NC}"; }
log_error() { echo -e "${RED}[✗] $1${NC}"; exit 1; }

# Vérification des prérequis
command -v docker >/dev/null 2>&1 || log_error "Docker n'est pas installé. Veuillez l'installer avant de continuer."
command -v docker compose >/dev/null 2>&1 || log_info "Docker Compose n'est pas détecté comme commande directe. Je vais utiliser 'docker-compose' si disponible."

# Utiliser la commande docker-compose appropriée
if command -v docker compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker compose"
else
  DOCKER_COMPOSE="docker-compose"
fi

log_info "Démarrage de l'initialisation de l'infrastructure pour $DOMAIN"

# 1. Créer la structure de répertoires
log_info "Création de la structure de répertoires..."
mkdir -p logs/{webhook,deploy,ols}
mkdir -p volumes/webroot/.well-known/acme-challenge
mkdir -p ols-config/{templates,vhosts/hargile}
mkdir -p certbot-etc
mkdir -p certbot-var

# 2. Créer le fichier .env
log_info "Création du fichier .env..."
cat > .env << EOL
DOMAIN=$DOMAIN
EMAIL=$EMAIL
WEBHOOK_SECRET=$WEBHOOK_SECRET
EOL
log_success "Fichier .env créé avec succès"

# 3. Créer les fichiers de configuration OpenLiteSpeed
log_info "Création des fichiers de configuration OpenLiteSpeed..."
cat > ols-config/templates/httpd_config.conf << 'EOL'
serverName                Hargile
user                      nobody
group                     nogroup
priority                  0
inMemBufSize              60M
swappingDir               /tmp/lshttpd/swap
autoFix503                1
gracefulRestartTimeout    300
mime                      conf/mime.properties
showVersionNumber         0
adminEmails               info@hargile.com

errorlog logs/error.log {
  useServer               1
  logLevel                DEBUG
  debugLevel              0
  rollingSize             10M
  enableStderrLog         1
}

accesslog logs/access.log {
  useServer               1
  rollingSize             10M
  keepDays                30
  compressArchive         0
}

indexFiles                index.html, index.php

expires  {
  enableExpires           1
  expiresByType           image/*=A604800,text/css=A604800,application/javascript=A604800,font/*=A604800
}

tuning  {
  maxConnections          10000
  maxSSLConnections       10000
  connTimeout             300
  maxKeepAliveReq         10000
  keepAliveTimeout        5
  maxReqURLLen            32768
  maxReqHeaderSize        65536
  maxReqBodySize          2047M
  maxDynRespHeaderSize    32768
  maxDynRespSize          2047M
  enableGzipCompress      1
  enableBr                1
  gzipCompressLevel       6
  gzipAutoUpdateStatic    1
}

accessControl  {
  allow                   ALL
}

extprocessor lsphp {
  type                    lsapi
  address                 uds://tmp/lshttpd/lsphp.sock
  maxConns                10
  env                     PHP_LSAPI_CHILDREN=10
  initTimeout             60
  retryTimeout            0
  persistConn             1
  respBuffer              0
  autoStart               1
  path                    lsphp
  backlog                 100
  instances               1
}

scripthandler  {
  add                     lsapi:lsphp php
}

virtualhost hargile {
  vhRoot                  /var/www/nextjs
  configFile              conf/vhosts/hargile/vhconf.conf
  allowSymbolLink         1
  enableScript            1
  restrained              0
  setUIDMode              0
}

listener Default {
  address                 *:80
  secure                  0
}

listener SSL {
  address                 *:443
  secure                  1
  keyFile                 /etc/letsencrypt/live/${DOMAIN}/privkey.pem
  certFile                /etc/letsencrypt/live/${DOMAIN}/fullchain.pem
  certChain               1
}
EOL

cat > ols-config/vhosts/hargile/vhconf.conf << EOL
docRoot                   \$VH_ROOT
vhDomain                  ${DOMAIN}
adminEmail                ${EMAIL}
enableGzip                1
enableBr                  1

vhssl {
  keyFile                 /etc/letsencrypt/live/${DOMAIN}/privkey.pem
  certFile                /etc/letsencrypt/live/${DOMAIN}/fullchain.pem
  certChain               1
}

# Route principale vers Next.js
context / {
  type                    proxy
  handler                 http://nextjs:3000
  addDefaultCharset       off
}

# Configuration pour le challenge ACME
context /.well-known/acme-challenge {
  location                \$DOC_ROOT/.well-known/acme-challenge
  allowBrowse             1
  priority                11
}
EOL

cat > ols-config/init.sh << 'EOL'
#!/bin/bash

# Create symbolic links to configuration files
ln -sf /etc/litespeed/templates/httpd_config.conf /usr/local/lsws/conf/httpd_config.conf
mkdir -p /usr/local/lsws/conf/vhosts/hargile
ln -sf /etc/litespeed/vhosts/hargile/vhconf.conf /usr/local/lsws/conf/vhosts/hargile/vhconf.conf

# Create docroot directories if they don't exist
mkdir -p /var/www/nextjs/.well-known/acme-challenge
chmod -R 755 /var/www/nextjs

# Start OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl start
tail -f /usr/local/lsws/logs/error.log
EOL
chmod +x ols-config/init.sh
log_success "Fichiers de configuration OpenLiteSpeed créés avec succès"

# 4. Créer le script de renouvellement de certificat
log_info "Création du script de renouvellement de certificat..."
cat > renew-cert.sh << 'EOL'
#!/bin/bash

# Arrêter OpenLiteSpeed pour libérer le port 80
docker compose stop openlitespeed || docker-compose stop openlitespeed

# Renouveler le certificat
docker run --rm -p 80:80 -p 443:443 \
  -v $PWD/certbot-etc:/etc/letsencrypt \
  -v $PWD/certbot-var:/var/lib/letsencrypt \
  certbot/certbot renew

# Redémarrer OpenLiteSpeed
docker compose start openlitespeed || docker-compose start openlitespeed

# Log du renouvellement
echo "Certificate renewal attempt at $(date)" >> ./logs/certbot.log
EOL
chmod +x renew-cert.sh
log_success "Script de renouvellement créé avec succès"

# 5. Création du docker-compose.yml
log_info "Création du fichier docker-compose.yml..."
cat > docker-compose.yml << 'EOL'
services:
  openlitespeed:
    image: litespeedtech/openlitespeed:latest
    container_name: openlitespeed
    volumes:
      - ./ols-config/templates:/etc/litespeed/templates
      - ./ols-config/vhosts:/etc/litespeed/vhosts
      - ./ols-config/init.sh:/usr/local/bin/init.sh
      - ./certbot-etc:/etc/letsencrypt:ro
      - ..:/var/www/nextjs
    ports:
      - "80:80"
      - "443:443"
    environment:
      - TZ=Europe/Paris
    command: /usr/local/bin/init.sh
    restart: always

  nextjs:
    image: node:18-alpine
    container_name: nextjs
    volumes:
      - ..:/app
    working_dir: /app
    command: sh -c "npm install && npm run build && npm start"
    environment:
      - NODE_ENV=production
      - PORT=3000
    expose:
      - 3000
    restart: always

  webhook:
    build:
      context: ./webhook
      dockerfile: Dockerfile
    container_name: webhook
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs/webhook:/app/logs
      - ./scripts:/app/scripts
      - ..:/app/nextjs-app
    ports:
      - "9000:9000"
    environment:
      - SECRET=${WEBHOOK_SECRET}
      - DEPLOY_SCRIPT=/app/scripts/deploy.sh
      - ROLLBACK_SCRIPT=/app/scripts/rollback.sh
      - LOG_FILE=/app/logs/webhook.log
      - DOMAIN=${DOMAIN}
    restart: always
EOL
log_success "Fichier docker-compose.yml créé avec succès"

# 6. Obtenir les certificats SSL
log_info "Obtention des certificats SSL..."
log_info "Arrêt des services en cours d'exécution..."
$DOCKER_COMPOSE down >/dev/null 2>&1

log_info "Lancement de Certbot pour obtenir les certificats SSL..."
docker run --rm -it -p 80:80 -p 443:443 \
  -v $PWD/certbot-etc:/etc/letsencrypt \
  -v $PWD/certbot-var:/var/lib/letsencrypt \
  certbot/certbot certonly --standalone \
  --email $EMAIL --agree-tos --no-eff-email \
  -d $DOMAIN

if [ $? -ne 0 ]; then
  log_error "Échec de l'obtention des certificats SSL. Veuillez vérifier votre connexion internet et les paramètres DNS."
fi
log_success "Certificats SSL obtenus avec succès"

# 7. Démarrer les services
log_info "Démarrage des services..."
$DOCKER_COMPOSE up -d
if [ $? -ne 0 ]; then
  log_error "Échec du démarrage des services. Veuillez vérifier les logs pour plus d'informations."
fi
log_success "Services démarrés avec succès"

# 8. Configuration du cron pour le renouvellement automatique
log_info "Configuration du renouvellement automatique des certificats..."
(crontab -l 2>/dev/null | grep -v "renew-cert.sh") | crontab -
(crontab -l 2>/dev/null; echo "0 3 * * 1 cd $(pwd) && ./renew-cert.sh >> ./logs/certbot.log 2>&1") | crontab -
log_success "Renouvellement automatique configuré avec succès"

# 9. Afficher les informations de configuration
log_info "===========================================================
Configuration terminée avec succès!

Votre infrastructure est maintenant opérationnelle:
- Domaine: $DOMAIN
- OpenLiteSpeed: http://$DOMAIN (redirection vers HTTPS)
- Site sécurisé: https://$DOMAIN
- Webhook: http://$DOMAIN:9000
- Secret webhook: $WEBHOOK_SECRET

Pour configurer GitHub webhook:
1. Allez dans votre dépôt GitHub -> Settings -> Webhooks
2. Ajoutez un nouveau webhook:
   - Payload URL: http://$DOMAIN:9000/webhook
   - Content type: application/json
   - Secret: $WEBHOOK_SECRET
   - Events: Just the push event

Les certificats seront renouvelés automatiquement.
==========================================================="

# Fin
exit 0
