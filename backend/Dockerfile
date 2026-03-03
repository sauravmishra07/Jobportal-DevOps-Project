# Use Node.js alpine image for smaller size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (cache them if package.json doesn't change)
COPY package*.json ./

# Install only production dependencies if needed, or all for dev
RUN npm ci

# Copy the rest of the source code
COPY . .

# Expose the development port
EXPOSE 3000

# Use a lightweight development server
CMD ["npm", "start"]