#!/bin/bash

# Create all necessary directories
mkdir -p logs/{webhook,deploy,ols}
mkdir -p volumes/{certbot,webroot}
mkdir -p ols/{conf,vhosts}

# Create log files
touch logs/webhook/webhook.log
touch logs/deploy/deployment.log

echo "Infrastructure structure created successfully!"
echo "To start your infrastructure, run:"
echo "cd infrastructure && docker-compose up -d"
