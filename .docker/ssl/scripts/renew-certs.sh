#!/bin/bash

# Base directory path
BASE_DIR=$(dirname $(dirname $(dirname $(realpath "$0"))))
DOMAIN=$(grep DOMAIN "$BASE_DIR/.env" | cut -d= -f2)

# Certificate renewal
docker exec ols-server /root/.acme.sh/acme.sh --cron --home /root/.acme.sh

# Restart OpenLiteSpeed after renewal
docker exec ols-server su -c '/usr/local/lsws/bin/lswsctrl restart'

echo "[$(date)] Certificate for $DOMAIN verified/renewed" >> "$BASE_DIR/logs/ssl-renew.log"
