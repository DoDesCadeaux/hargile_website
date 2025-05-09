#!/bin/bash

# Base directory path
# shellcheck disable=SC2046
BASE_DIR=$(dirname $(dirname $(dirname $(realpath "$0"))))
DOMAIN=$(grep DOMAIN "$BASE_DIR"/.env | cut -d= -f2)
# shellcheck disable=SC2086
EMAIL=$(grep EMAIL $BASE_DIR/.env | cut -d= -f2)

# Obtain initial certificate
# shellcheck disable=SC2086
docker exec ols-server /root/.acme.sh/acme.sh --issue --domain "$DOMAIN" --domain www.$DOMAIN --webroot /usr/local/lsws/Example/html/ --email $EMAIL --force

# shellcheck disable=SC2086
echo "[$(date)] Initial certificate for $DOMAIN obtained" >> $BASE_DIR/logs/ssl-init.log
