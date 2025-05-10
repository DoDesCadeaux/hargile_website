#!/bin/bash

# Variables
PROJECT_ROOT="/app/nextjs-app"  # Path to your Next.js project
LOG_FILE="/app/logs/deployment.log"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
DOMAIN=${DOMAIN:-"yourdomain.com"}
HEALTH_CHECK_URL="https://${DOMAIN}/api/health"

# Logging function
log() {
  echo "[$(date)]: $1" | tee -a $LOG_FILE
}

log "Starting deployment $TIMESTAMP"

# Go to project directory
cd $PROJECT_ROOT

# Pull latest changes
log "Fetching latest changes"
git pull

if [ $? -ne 0 ]; then
  log "ERROR: Git pull failed. Deployment canceled."
  exit 1
fi

# Build Next.js application
log "Building Next.js application"
cd $PROJECT_ROOT
npm install
npm run build

if [ $? -ne 0 ]; then
  log "ERROR: Next.js build failed. Deployment canceled."
  exit 1
fi

# Backup current version if it exists
if [ -d "$PROJECT_ROOT/.next-backup" ]; then
  log "Removing old backup"
  rm -rf $PROJECT_ROOT/.next-backup
fi

if [ -d "$PROJECT_ROOT/.next" ]; then
  log "Backing up current version"
  cp -r $PROJECT_ROOT/.next $PROJECT_ROOT/.next-backup
fi

# Restart OpenLiteSpeed to apply changes
log "Restarting services"
docker restart openlitespeed

# Check application health
log "Checking application health"
sleep 10

for i in {1..5}; do
  if curl -sSf $HEALTH_CHECK_URL > /dev/null 2>&1; then
    log "✅ Application started successfully!"
    exit 0
  fi

  log "Attempt $i/5 failed, retrying in 5 seconds..."
  sleep 5
done

# If we get here, the application is not responding
log "❌ ERROR: Application not responding. Executing rollback..."

# Rollback
if [ -d "$PROJECT_ROOT/.next-backup" ]; then
  log "Restoring previous version"
  rm -rf $PROJECT_ROOT/.next
  cp -r $PROJECT_ROOT/.next-backup $PROJECT_ROOT/.next

  # Restart OpenLiteSpeed after rollback
  docker restart openlitespeed

  log "Rollback completed. Previous version restored."
else
  log "No backup found for rollback!"
fi

exit 1
