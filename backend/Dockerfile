# Use Node.js alpine image for smaller size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using ci (faster, reproducible)
RUN npm ci

# Copy app source code
COPY . .

# Expose the development port
EXPOSE 3000

# Start app
CMD ["npm", "start"]