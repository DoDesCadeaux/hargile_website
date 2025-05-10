const http = require('http');
const {exec} = require('child_process');
const fs = require('fs');
const crypto = require('crypto');

// Configuration
const config = {
    port: process.env.PORT || 9000,
    secret: process.env.SECRET || 'your_secret_token',
    deployScript: process.env.DEPLOY_SCRIPT || '/app/scripts/deploy.sh',
    rollbackScript: process.env.ROLLBACK_SCRIPT || '/app/scripts/rollback.sh',
    logFile: process.env.LOG_FILE || '/app/logs/webhook.log',
    allowedBranches: (process.env.ALLOWED_BRANCHES || 'main,master').split(','),
    deploymentLock: false
};

// Logging function
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(message);
    fs.appendFileSync(config.logFile, logMessage);
}

// Function to verify GitHub signature
function verifyGitHubSignature(payload, signature) {
    if (!signature) {
        return false;
    }

    const hmac = crypto.createHmac('sha256', config.secret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');

    // Constant time comparison to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

// Function to run deployment
function runDeployment(res) {
    if (config.deploymentLock) {
        log('⚠️ Deployment already in progress. This one will be ignored.');
        if (res) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Deployment already in progress');
        }
        return false;
    }

    config.deploymentLock = true;
    log('🚀 Starting deployment...');

    // Execute deployment script
    const deployProcess = exec(`bash ${config.deployScript}`, (error, stdout, stderr) => {
        config.deploymentLock = false;

        if (error) {
            log(`❌ Deployment failed: ${error.message}`);
            return;
        }

        log('✅ Deployment completed successfully');
    });

    // Real-time log capture
    deployProcess.stdout.on('data', (data) => {
        log(`📋 [OUTPUT]: ${data.trim()}`);
    });

    deployProcess.stderr.on('data', (data) => {
        log(`⚠️ [ERROR]: ${data.trim()}`);
    });

    if (res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Deployment triggered');
    }

    return true;
}

// Create server
const server = http.createServer((req, res) => {
    // Homepage
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
      <html>
        <head><title>CI/CD Webhook</title></head>
        <body>
          <h1>CI/CD Webhook Active</h1>
          <p>Deployment status: ${config.deploymentLock ? 'In progress' : 'Idle'}</p>
          <p><a href="/logs">View logs</a></p>
          <form method="POST" action="/deploy">
            <input type="hidden" name="token" value="${config.secret}">
            <button type="submit">Trigger manual deployment</button>
          </form>
          <form method="POST" action="/rollback">
            <input type="hidden" name="token" value="${config.secret}">
            <button type="submit">Trigger rollback</button>
          </form>
        </body>
      </html>
    `);
        return;
    }

    // Logs page
    if (req.method === 'GET' && req.url === '/logs') {
        let logs = 'No logs available';
        try {
            logs = fs.readFileSync(config.logFile, 'utf8').split('\n').slice(-50).join('\n');
        } catch (e) {
            logs = `Error reading logs: ${e.message}`;
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
      <html>
        <head><title>Webhook Logs</title></head>
        <body>
          <h1>Recent logs</h1>
          <pre>${logs}</pre>
          <a href="/">Back</a>
        </body>
      </html>
    `);
        return;
    }

    // Manual deployment endpoint
    if (req.method === 'POST' && req.url === '/deploy') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Parse form data
            const params = new URLSearchParams(body);
            if (params.get('token') === config.secret) {
                log('📦 Manual deployment triggered');
                runDeployment(res);
            } else {
                res.writeHead(403, {'Content-Type': 'text/plain'});
                res.end('Invalid token');
            }
        });
        return;
    }

    // Manual rollback endpoint
    if (req.method === 'POST' && req.url === '/rollback') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Parse form data
            const params = new URLSearchParams(body);
            if (params.get('token') === config.secret) {
                log('⏮️ Manual rollback triggered');
                // Execute rollback script
                exec(`bash ${config.rollbackScript}`, (error, stdout, stderr) => {
                    if (error) {
                        log(`❌ Rollback failed: ${error.message}`);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Rollback failed');
                        return;
                    }

                    log('✅ Rollback completed successfully');
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Rollback completed');
                });
            } else {
                res.writeHead(403, {'Content-Type': 'text/plain'});
                res.end('Invalid token');
            }
        });
        return;
    }

    // GitHub webhook endpoint
    if (req.method === 'POST' && req.url === '/webhook') {
        const githubSignature = req.headers['x-hub-signature-256'];
        const githubEvent = req.headers['x-github-event'];

        // Collect the request body
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            // Legacy token check
            const token = req.headers['x-webhook-token'];
            if (token === config.secret) {
                // Support for original webhook format
                log('📦 Webhook called with token');
                runDeployment(res);
                return;
            }

            // GitHub webhook handling
            if (githubEvent === 'push') {
                // Verify signature for GitHub webhooks
                if (!verifyGitHubSignature(body, githubSignature)) {
                    log('❌ Invalid GitHub signature');
                    res.writeHead(403, {'Content-Type': 'text/plain'});
                    res.end('Invalid signature');
                    return;
                }

                try {
                    // Parse GitHub payload
                    const payload = JSON.parse(body);

                    // Extract branch name from ref (format: refs/heads/branch-name)
                    if (payload.ref) {
                        const branch = payload.ref.replace('refs/heads/', '');

                        if (config.allowedBranches.includes(branch)) {
                            log(`📦 GitHub push detected on branch ${branch}`);
                            runDeployment(res);
                        } else {
                            log(`⚠️ Push to non-deployment branch: ${branch}`);
                            res.writeHead(200, {'Content-Type': 'text/plain'});
                            res.end(`Push to ${branch} ignored`);
                        }
                    } else {
                        log('⚠️ No branch information in GitHub payload');
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end('No branch information');
                    }
                } catch (error) {
                    log(`❌ Error processing GitHub webhook: ${error.message}`);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error processing webhook');
                }
            } else {
                // Non-push GitHub events
                log(`ℹ️ Ignoring GitHub event: ${githubEvent}`);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(`Event ${githubEvent} ignored`);
            }
        });
        return;
    }

    // 404 for any other route
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
});

// Start server
server.listen(config.port, () => {
    log(`🚀 Webhook server started on port ${config.port}`);
});

// Error handling
process.on('uncaughtException', (error) => {
    log(`❌ Unhandled error: ${error.message}`);
});
