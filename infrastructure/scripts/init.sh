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

# Vérification de Docker
command -v docker >/dev/null 2>&1 || log_error "Docker n'est pas installé. Veuillez l'installer avant de continuer."

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

# 3. Créer la configuration Nginx
log_info "Création de la configuration Nginx..."
cat > nginx/conf.d/default.conf << EOL
server {
    listen 80;
    server_name hargile.eu;

    # Redirection vers HTTPS
    location / {
        return 301 https://$host$request_uri;
    }

    # Pour le renouvellement Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}

server {
    listen 443 ssl http2;
    server_name hargile.eu;

    ssl_certificate /etc/letsencrypt/live/hargile.eu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hargile.eu/privkey.pem;

    # Paramètres SSL optimisés
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Proxy vers Next.js avec délais d'attente augmentés
    location / {
        proxy_pass http://nextjs:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Augmenter les timeouts
        proxy_connect_timeout 180s;
        proxy_send_timeout 180s;
        proxy_read_timeout 180s;
    }

    # Proxy vers le webhook
    location /webhook/ {
        proxy_pass http://webhook:9000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOL
log_success "Configuration Nginx créée avec succès"

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

# 6. Obtenir les certificats SSL avec la méthode standalone
log_info "Obtention des certificats SSL en mode standalone..."
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
- Nginx: http://$DOMAIN (redirection vers HTTPS)
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

exit 0
