const http = require('http');
const {exec} = require('child_process');
const fs = require('fs');

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

    // Main webhook endpoint
    if (req.method === 'POST' && req.url === '/webhook') {
        const token = req.headers['x-webhook-token'];

        if (token !== config.secret) {
            res.writeHead(403, {'Content-Type': 'text/plain'});
            res.end('Invalid token');
            return;
        }

        log('📦 Webhook called');

        if (config.deploymentLock) {
            log('⚠️ Deployment already in progress. This one will be ignored.');
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Deployment already in progress');
            return;
        }

        config.deploymentLock = true;

        // Execute deployment script
        const deployProcess = exec(`bash ${config.deployScript}`, (error, stdout, stderr) => {
            config.deploymentLock = false;

            if (error) {
                log(`❌ Deployment failed: ${error.message}`);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Deployment failed');
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

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Deployment triggered');
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
