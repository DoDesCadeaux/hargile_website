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

echo "[$(date)] Initial certificate for $DOMAIN obtained" >> "$BASE_DIR/logs/ssl-init.log"
