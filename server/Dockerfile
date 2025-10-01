FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and tsconfig.json first (Docker cache)
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY src ./src

# Expose port
EXPOSE 5000

# Command for dev mode
CMD ["npm", "run", "dev"]
