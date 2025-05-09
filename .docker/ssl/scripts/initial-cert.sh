#!/bin/bash

# Base directory path
# shellcheck disable=SC2046
BASE_DIR=$(dirname $(dirname $(dirname $(realpath "$0"))))
DOMAIN=$(grep DOMAIN "$BASE_DIR"/.env | cut -d= -f2)
# shellcheck disable=SC2086
EMAIL=$(grep EMAIL "$BASE_DIR"/.env | cut -d= -f2)

# Install acme.sh if not already installed
docker exec ols-server bash -c 'if [ ! -f "/root/.acme.sh/acme.sh" ]; then curl https://get.acme.sh | sh; fi'

# Wait for acme.sh to be available
sleep 5

# Obtain initial certificate
# shellcheck disable=SC2086
docker exec ols-server bash -c "/root/.acme.sh/acme.sh --issue --domain $DOMAIN --domain www.$DOMAIN --webroot /usr/local/lsws/Example/html/ --email $EMAIL --force"

# shellcheck disable=SC2086
echo "[$(date)] Initial certificate for $DOMAIN obtained" >> "$BASE_DIR"/logs/ssl-init.log
