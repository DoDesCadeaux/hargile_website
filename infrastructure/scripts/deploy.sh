#!/bin/bash

# Variables
PROJECT_ROOT="/app/nextjs-app"
LOG_FILE="/app/logs/deployment.log"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
DOMAIN=${DOMAIN:-"hargile.eu"}
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

# Backup current build if it exists
if [ -d "$PROJECT_ROOT/.next" ]; then
  log "Backing up current build"
  if [ -d "$PROJECT_ROOT/.next-backup" ]; then
    rm -rf $PROJECT_ROOT/.next-backup
  fi
  cp -r $PROJECT_ROOT/.next $PROJECT_ROOT/.next-backup
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

# Restart Next.js container
log "Restarting Next.js container"
docker restart nextjs

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
  log "Restoring previous build"
  rm -rf $PROJECT_ROOT/.next
  cp -r $PROJECT_ROOT/.next-backup $PROJECT_ROOT/.next
  
  # Restart Next.js after rollback
  docker restart nextjs
  
  log "Rollback completed. Previous version restored."
else
  log "No backup found for rollback!"
fi

exit 1
