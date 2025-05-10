# infrastructure/webhook/Dockerfile
FROM node:22-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache bash curl docker-cli

# Copy webhook files
COPY webhook.js .
COPY package.json .

# Install Node.js dependencies
RUN npm install

# Create necessary directories
RUN mkdir -p /app/logs

# Expose webhook port
EXPOSE 9000

# Start the webhook server
CMD ["node", "webhook.js"]
