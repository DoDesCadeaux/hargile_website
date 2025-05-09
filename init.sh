#!/bin/bash

# Create project directories
mkdir -p .docker/logs
mkdir -p .docker/openlitespeed/{conf,admin-conf,vhosts}
mkdir -p .docker/ssl/acme

# Set up environment
if [ ! -f .docker/.env ]; then
  read -p "Domain (e.g. example.com): " DOMAIN
  read -p "Email for SSL certificates: " EMAIL

  # Create .env file
  cat > .docker/.env << EOF
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
EOF
fi

# Make scripts executable
chmod +x .docker/ssl/scripts/*.sh

./.docker/ssl/scripts/setup-cron.sh

echo "Initialization complete! Run .docker/ssl/scripts/deploy.sh to deploy your application."
