#!/bin/bash

# Base directory path
BASE_DIR=$(dirname $(dirname $(realpath "$0")))
SCRIPT_PATH="$BASE_DIR/ssl/scripts/renew-certs.sh"

# Make scripts executable
chmod +x "$BASE_DIR"/ssl/scripts/*.sh

# Add renewal script to crontab (runs daily at 2 AM)
(crontab -l 2>/dev/null | grep -v "$SCRIPT_PATH"; echo "0 2 * * * $SCRIPT_PATH") | crontab -

echo "Cron job for certificate renewal successfully configured!"
