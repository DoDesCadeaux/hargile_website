#!/bin/bash

# Variables
PROJECT_ROOT="/app/nextjs-app"
LOG_FILE="/app/logs/deployment.log"
TIMESTAMP=$(date +%Y%m%d%H%M%S)

# Logging function
log() {
  echo "[$(date)]: $1" | tee -a $LOG_FILE
}

log "Starting manual rollback $TIMESTAMP"

# Check if backup exists
if [ -d "$PROJECT_ROOT/.next-backup" ]; then
  log "Found backup version. Performing rollback..."

  # Restore from backup
  rm -rf $PROJECT_ROOT/.next
  cp -r $PROJECT_ROOT/.next-backup $PROJECT_ROOT/.next

  # Restart OpenLiteSpeed
  log "Restarting services..."
  docker restart openlitespeed

  log "✅ Rollback completed successfully!"
else
  log "❌ ERROR: No backup version found for rollback!"
  exit 1
fi
