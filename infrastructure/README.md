# NextJS Infrastructure with OpenLiteSpeed, Let's Encrypt, and CI/CD

This infrastructure setup provides a complete environment for deploying and maintaining a Next.js application using:

- **OpenLiteSpeed** as the web server
- **Let's Encrypt** for SSL certificates
- **Custom webhook** for CI/CD with automated rollback

## Prerequisites

- Docker and Docker Compose installed on your VPS
- Domain (hargile.eu) pointing to your VPS IP
- Ports 80 and 443 open on your firewall

## First-Time Setup and Deployment

### Step 1: Clone the repository

```bash
# Clone your repository
git clone [your-git-url] /path/to/your-project
cd /path/to/your-project
```

### Step 2: Set up permissions

```bash
# Make scripts executable
chmod +x infrastructure/scripts/init.sh
chmod +x infrastructure/scripts/deploy.sh
chmod +x infrastructure/scripts/rollback.sh
```

### Step 3: Initialize the structure

```bash
# Run the initialization script
cd infrastructure
./scripts/init.sh
```

This script creates all necessary directories and log files.

### Step 4: Verify environment variables

```bash
# Check environment variables
cat .env
```

Ensure the file contains:

```
DOMAIN=hargile.eu
EMAIL=info@hargile.com
WEBHOOK_SECRET=your_very_complex_secret_token
```

Replace `your_very_complex_secret_token` with a strong secret token if needed.

### Step 5: Start OpenLiteSpeed without SSL

First, start OpenLiteSpeed to allow Certbot to validate your domain:

```bash
# Start only the OpenLiteSpeed container
docker compose up -d openlitespeed

# Wait for the service to be ready
sleep 10
```

### Step 6: Obtain SSL certificate

```bash
# Run Certbot to get the certificate
docker compose up certbot

# Verify that certificates were obtained
docker logs certbot
```

### Step 7: Start all services

```bash
# Start all services
docker compose up -d

# Wait for containers to initialize
sleep 20

# Check status of all containers
docker compose ps
```

### Step 8: First deployment of the Next.js application

```bash
# Trigger a manual deployment
curl -X POST http://localhost:9000/deploy -d "token=your_very_complex_secret_token"

# Check deployment logs
docker exec webhook cat /app/logs/deployment.log
```

### Step 9: Verify deployment

Check that your application is working correctly:

1. Open your domain in a browser: https://hargile.eu
2. Verify that the SSL certificate is valid
3. Check the health endpoint: https://hargile.eu/api/health

### Step 10: Configure automatic certificate renewal

```bash
# Add a cron job to automatically renew certificates
(crontab -l 2>/dev/null; echo "0 3 * * * cd /path/to/your-project/infrastructure && docker compose up -d certbot") | crontab -
```

### Step 11: Configure webhook for continuous deployment

In your Git platform (GitHub, GitLab, etc.), set up a webhook:

- URL: `http://your-domain.com:9000/webhook`
- Header: `x-webhook-token: your_very_complex_secret_token`
- Events: Push to main/master branch

## Infrastructure Components

### Directory Structure

```
infrastructure/
├── docker compose.yml     # Main Docker Compose configuration
├── .env                   # Environment variables for Docker
│
├── ols/                   # OpenLiteSpeed configuration
│   ├── conf/              # Main configuration files
│   └── vhosts/            # Virtual hosts configuration
│       └── nextjs.conf
│
├── webhook/               # Webhook service for CI/CD
│   ├── Dockerfile
│   ├── webhook.js
│   └── package.json
│
├── scripts/               # Deployment and maintenance scripts
│   ├── deploy.sh          # Main deployment script
│   ├── rollback.sh        # Manual rollback script
│   └── init.sh            # Initialization script
│
├── logs/                  # All log files
│   ├── webhook/
│   ├── deploy/
│   └── ols/
│
└── volumes/               # Directory for Docker volumes
    ├── certbot/           # For Let's Encrypt certificates
    └── webroot/           # For Let's Encrypt validation
```

### Services

1. **OpenLiteSpeed**: High-performance web server hosting the Next.js application
2. **Certbot**: Service for obtaining and renewing Let's Encrypt SSL certificates
3. **Webhook**: Custom CI/CD service that handles deployments with automatic rollback

## Usage

### Manual Deployment

To manually trigger a deployment:

```bash
curl -X POST http://your-domain.com:9000/deploy -d "token=your_very_complex_secret_token"
```

### Manual Rollback

To manually trigger a rollback to the previous version:

```bash
curl -X POST http://your-domain.com:9000/rollback -d "token=your_very_complex_secret_token"
```

### View Logs

Access deployment logs:

```bash
docker exec webhook cat /app/logs/deployment.log
```

Access webhook logs:

```bash
docker exec webhook cat /app/logs/webhook.log
```

### Web Interface

The webhook provides a simple web interface at:

- `http://your-domain.com:9000/` - Dashboard
- `http://your-domain.com:9000/logs` - Recent logs

## Troubleshooting

### Common Issues

1. **SSL certificates not obtained**: Verify that your domain correctly points to your VPS IP and that ports 80/443 are
   open.

2. **Next.js application doesn't start**: Check deployment logs and ensure the application can be built.

3. **File access issues**: Ensure Docker volumes are correctly mounted.

4. **Webhook doesn't trigger deployment**: Check webhook logs and make sure the secret token is correct.

5. **Health check failing**: Verify that your Next.js application correctly implements the health endpoint.

### Health Endpoint

The deployment process checks for a health endpoint at `/api/health`. Make sure your Next.js application implements this
endpoint:

```javascript
// src/app/api/health/route.js
import {NextResponse} from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        version: process.env.NEXT_PUBLIC_DEPLOY_ID || "unknown"
    });
}
```
