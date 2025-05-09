FROM node:22-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy remaining files
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
