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
log_error() { echo -e "${RED}[✗] $1${NC}"; }
log_warning() { echo -e "${RED}[!] $1${NC}"; }

# Vérification de Docker
command -v docker >/dev/null 2>&1 || { log_error "Docker n'est pas installé. Veuillez l'installer avant de continuer."; exit 1; }

# Détecter la commande docker-compose appropriée
if command -v docker compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker compose"
else
  DOCKER_COMPOSE="docker-compose"
fi

log_info "Démarrage de l'initialisation de l'infrastructure pour $DOMAIN"

# 1. Créer la structure de répertoires nécessaire
log_info "Création de la structure de répertoires..."
mkdir -p logs/{webhook,deploy}
mkdir -p volumes/webroot/.well-known/acme-challenge
mkdir -p nginx/conf.d
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

# 3. Créer la configuration Nginx temporaire (pour HTTP uniquement)
log_info "Création de la configuration Nginx temporaire (HTTP uniquement)..."
cat > nginx/conf.d/default.conf << EOL
server {
    listen 80;
    server_name ${DOMAIN};

    # Pour le renouvellement Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Proxy vers Next.js
    location / {
        proxy_pass http://nextjs:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Augmenter les timeouts
        proxy_connect_timeout 180s;
        proxy_send_timeout 180s;
        proxy_read_timeout 180s;
    }
}
EOL
log_success "Configuration Nginx temporaire créée avec succès"

# 4. Créer le fichier docker-compose.yml
log_info "Création du fichier docker-compose.yml..."
cat > docker-compose.yml << EOL
services:
  nginx:
    image: nginx:alpine
    container_name: nginx
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./certbot-etc:/etc/letsencrypt:ro
      - ./volumes/webroot:/var/www/html
    ports:
      - "80:80"
      - "443:443"
    environment:
      - TZ=Europe/Paris
    restart: always
    networks:
      - app-network

  nextjs:
    image: node:18-alpine
    container_name: nextjs
    volumes:
      - ..:/app
    working_dir: /app
    command: sh -c "npm install --include=dev && npm run build && npm start"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
    restart: always
    networks:
      - app-network

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
      - SECRET=\${WEBHOOK_SECRET}
      - DEPLOY_SCRIPT=/app/scripts/deploy.sh
      - ROLLBACK_SCRIPT=/app/scripts/rollback.sh
      - LOG_FILE=/app/logs/webhook.log
      - DOMAIN=\${DOMAIN}
    restart: always
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
EOL
log_success "Fichier docker-compose.yml créé avec succès"

# 5. Créer le script de renouvellement de certificat
log_info "Création du script de renouvellement de certificat..."
cat > renew-cert.sh << 'EOL'
#!/bin/bash

# Arrêter Nginx pour libérer le port 80
docker compose stop nginx || docker-compose stop nginx

# Renouveler le certificat
docker run --rm -p 80:80 -p 443:443 \
  -v $PWD/certbot-etc:/etc/letsencrypt \
  -v $PWD/certbot-var:/var/lib/letsencrypt \
  certbot/certbot renew

# Redémarrer Nginx
docker compose start nginx || docker-compose start nginx

# Log du renouvellement
echo "Certificate renewal attempt at $(date)" >> ./logs/certbot.log
EOL
chmod +x renew-cert.sh
log_success "Script de renouvellement créé avec succès"

# 6. Vérifier les certificats SSL existants
log_info "Recherche de certificats SSL existants..."

# Créer une variable pour indiquer si les certificats sont valides
CERTS_VALID=false

# Vérifier dans le répertoire certbot-etc
if [ -d "$PWD/certbot-etc/live/$DOMAIN" ] && [ -e "$PWD/certbot-etc/live/$DOMAIN/fullchain.pem" ]; then
  log_success "Certificats SSL trouvés dans certbot-etc. Utilisation des certificats existants."
  CERTS_VALID=true
else
  # Chercher les certificats dans d'autres emplacements possibles
  log_info "Recherche de certificats SSL dans /etc/letsencrypt..."

  if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    log_info "Certificats trouvés dans /etc/letsencrypt. Copie en cours..."
    mkdir -p $PWD/certbot-etc/live/$DOMAIN
    cp -r /etc/letsencrypt/live/$DOMAIN/* $PWD/certbot-etc/live/$DOMAIN/

    if [ $? -eq 0 ]; then
      log_success "Certificats copiés avec succès."
      CERTS_VALID=true
    else
      log_warning "Échec de la copie des certificats."
    fi
  else
    log_info "Aucun certificat trouvé dans /etc/letsencrypt."
  fi
fi

# Si aucun certificat valide n'a été trouvé, essayer d'en obtenir de nouveaux
if [ "$CERTS_VALID" = false ]; then
  log_info "Tentative d'obtention de nouveaux certificats SSL..."
  log_info "Arrêt des services en cours d'exécution..."
  $DOCKER_COMPOSE down >/dev/null 2>&1

  log_info "Lancement de Certbot pour obtenir les certificats SSL..."
  docker run --rm -it -p 80:80 -p 443:443 \
    -v $PWD/certbot-etc:/etc/letsencrypt \
    -v $PWD/certbot-var:/var/lib/letsencrypt \
    certbot/certbot certonly --standalone \
    --email $EMAIL --agree-tos --no-eff-email \
    -d $DOMAIN

  if [ $? -eq 0 ]; then
    log_success "Certificats SSL obtenus avec succès."
    CERTS_VALID=true
  else
    log_warning "Échec de l'obtention des certificats SSL. Configuration en mode HTTP uniquement."
    # Nous continuons avec la configuration HTTP uniquement
  fi
fi

# 7. Si les certificats sont valides, mettre à jour la configuration Nginx pour HTTPS
if [ "$CERTS_VALID" = true ]; then
  log_info "Mise à jour de la configuration Nginx pour HTTPS..."
  cat > nginx/conf.d/default.conf << EOL
server {
    listen 80;
    server_name ${DOMAIN};

    # Redirection vers HTTPS
    location / {
        return 301 https://\$host\$request_uri;
    }

    # Pour le renouvellement Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    # Paramètres SSL optimisés
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Proxy vers Next.js
    location / {
        proxy_pass http://nextjs:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Augmenter les timeouts
        proxy_connect_timeout 180s;
        proxy_send_timeout 180s;
        proxy_read_timeout 180s;
    }
}
EOL
  log_success "Configuration Nginx mise à jour pour HTTPS."
else
  log_warning "Fonctionnement en mode HTTP uniquement. HTTPS sera disponible lors du prochain renouvellement de certificat."
fi

# 8. Démarrer les services
log_info "Démarrage des services..."
$DOCKER_COMPOSE up -d
if [ $? -ne 0 ]; then
  log_error "Échec du démarrage des services. Veuillez vérifier les logs pour plus d'informations."
  exit 1
fi
log_success "Services démarrés avec succès"

# 9. Configuration du cron pour le renouvellement automatique
log_info "Configuration du renouvellement automatique des certificats..."
(crontab -l 2>/dev/null | grep -v "renew-cert.sh") | crontab -
(crontab -l 2>/dev/null; echo "0 3 * * 1 cd $(pwd) && ./renew-cert.sh >> ./logs/certbot.log 2>&1") | crontab -
log_success "Renouvellement automatique configuré avec succès"

# 10. Afficher les informations de configuration
if [ "$CERTS_VALID" = true ]; then
  SITE_URL="https://$DOMAIN"
else
  SITE_URL="http://$DOMAIN"
fi

log_info "===========================================================
Configuration terminée avec succès!

Votre infrastructure est maintenant opérationnelle:
- Domaine: $DOMAIN
- Site: $SITE_URL
- Webhook: http://$DOMAIN:9000
- Secret webhook: $WEBHOOK_SECRET

Pour configurer GitHub webhook:
1. Allez dans votre dépôt GitHub -> Settings -> Webhooks
2. Ajoutez un nouveau webhook:
   - Payload URL: http://$DOMAIN:9000/webhook
   - Content type: application/json
   - Secret: $WEBHOOK_SECRET
   - Events: Just the push event
"

if [ "$CERTS_VALID" = false ]; then
  log_warning "
IMPORTANT: Votre site fonctionne actuellement en HTTP uniquement.
Les certificats SSL n'ont pas pu être obtenus en raison des limites de taux de Let's Encrypt.
Réessayez après le $(date -d "2025-05-11 20:43:46 UTC" +"%d/%m/%Y %H:%M UTC") en exécutant:
  ./renew-cert.sh
"
else
  echo "Les certificats seront renouvelés automatiquement."
fi

echo "==========================================================="

exit 0
