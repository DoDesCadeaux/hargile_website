#!/bin/bash

# Base directory path
# shellcheck disable=SC2046
BASE_DIR=$(dirname $(dirname $(realpath "$0")))
# shellcheck disable=SC2164
# shellcheck disable=SC2086
cd $BASE_DIR

# Create necessary directories if they don't exist
mkdir -p ssl/acme openlitespeed/{conf,admin-conf,vhosts} logs

# Start containers
docker compose up -d

# Wait for containers to start
echo "Waiting for containers to start..."
sleep 10

# Obtain and configure SSL certificate
./ssl/scripts/initial-cert.sh
./ssl/scripts/configure-ssl.sh

# Restart OpenLiteSpeed to apply configurations
docker compose restart openlitespeed

echo "=====================================================
          Deployment complete!
=====================================================
Access your site at: https://$(grep DOMAIN .env | cut -d= -f2)
Access OpenLiteSpeed admin at: https://your-server-ip:7080"
