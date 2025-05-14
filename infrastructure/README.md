# NextJS Infrastructure with OpenLiteSpeed, Let's Encrypt, and CI/CD

This infrastructure setup provides a complete environment for deploying and maintaining a Next.js application using:

- **OpenLiteSpeed** as the high-performance web server
- **Let's Encrypt** for SSL certificates
- **Custom webhook** for CI/CD with automated rollback
- **Containerized Next.js** application

## Prerequisites

- Docker and Docker Compose installed on your VPS
- Domain (hargile.com) pointing to your VPS IP
- Ports 80 and 443 open on your firewall

## Quick Start: One-Command Setup

Our enhanced initialization script handles everything automatically:

```bash
# Make the script executable
chmod +x infrastructure/scripts/init.sh

# Run the init script (with default domain and email)
cd infrastructure
./scripts/init.sh

# Or specify domain and email as arguments
./scripts/init.sh yourdomain.com your@email.com
```

This script will:

1. Create all necessary directories and configuration files
2. Generate a secure random webhook secret
3. Obtain SSL certificates from Let's Encrypt
4. Create proper OpenLiteSpeed configuration
5. Start all containers (OpenLiteSpeed, Next.js, Webhook)
6. Configure automatic certificate renewal
7. Display configuration information for GitHub webhook setup

## After Initialization: GitHub Webhook Setup

After running the initialization script, set up your GitHub webhook:

1. Go to your GitHub repository → Settings → Webhooks → Add webhook
2. Configure with:
    - **Payload URL**: `http://yourdomain.com:9000/webhook`
    - **Content type**: `application/json`
    - **Secret**: Use the webhook secret displayed at the end of the initialization script
    - **Events**: Select "Just the push event"

## Directory Structure

```
infrastructure/
├── docker-compose.yml       # Main Docker Compose configuration
├── .env                     # Environment variables for Docker
│
├── ols-config/              # OpenLiteSpeed configuration
│   ├── templates/           # Main configuration templates
│   │   └── httpd_config.conf
│   ├── vhosts/              # Virtual hosts configuration
│   │   └── hargile/
│   │       └── vhconf.conf
│   └── init.sh              # OpenLiteSpeed initialization script
│
├── webhook/                 # Webhook service for CI/CD
│   ├── Dockerfile
│   ├── webhook.js
│   └── package.json
│
├── scripts/                 # Deployment and maintenance scripts
│   ├── deploy.sh            # Main deployment script
│   ├── rollback.sh          # Manual rollback script
│   └── init.sh              # Infrastructure initialization script
│
├── logs/                    # All log files
│   ├── webhook/
│   ├── deploy/
│   └── ols/
│
└── certbot-etc/             # Let's Encrypt certificates
```

## Service Management

### Viewing Service Status

```bash
# Check status of all containers
docker compose ps
```

### Manual Deployment

To manually trigger a deployment:

```bash
curl -X POST http://yourdomain.com:9000/deploy -d "token=your_webhook_secret"
```

### Manual Rollback

To manually trigger a rollback to the previous version:

```bash
curl -X POST http://yourdomain.com:9000/rollback -d "token=your_webhook_secret"
```

### View Logs

```bash
# Deployment logs
docker exec webhook cat /app/logs/deployment.log

# Webhook logs
docker exec webhook cat /app/logs/webhook.log

# Next.js logs
docker logs nextjs

# OpenLiteSpeed logs
docker exec openlitespeed cat /usr/local/lsws/logs/error.log
```

### Web Interface

The webhook provides a simple web interface at:

- `http://yourdomain.com:9000/` - Dashboard
- `http://yourdomain.com:9000/logs` - Recent logs

## Certificate Renewal

Certificates will be automatically renewed by a cron job created during initialization. The renewal script:

1. Temporarily stops OpenLiteSpeed to free port 80
2. Renews the certificate using Certbot
3. Restarts OpenLiteSpeed
4. Logs the renewal attempt

Manual renewal:

```bash
./renew-cert.sh
```

## Performance Benefits of OpenLiteSpeed

OpenLiteSpeed offers significant performance advantages for Next.js applications:

1. **Higher throughput**: Handles up to 5x more concurrent connections than Nginx
2. **Lower latency**: Reduces response times by 15-30% for dynamic Next.js content
3. **Efficient resource usage**: Uses less memory for the same workload
4. **HTTP/3 support**: Native support for the latest HTTP protocol
5. **Advanced caching**: Better caching capabilities for isomorphic applications

## Troubleshooting

### Common Issues

1. **SSL certificates not obtained**: Verify that your domain correctly points to your VPS IP and that ports 80/443 are
   open.

2. **Next.js application doesn't start**: Check container logs with `docker logs nextjs` and ensure the application can
   be built.

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

## Resetting the Infrastructure

If you need to reset and reinitialize everything:

```bash
# Stop all containers
docker compose down

# Delete generated files and directories
rm -rf ols-config certbot-etc certbot-var logs volumes
rm -f .env docker-compose.yml renew-cert.sh

# Run initialization again
./scripts/init.sh yourdomain.com your@email.com
```
