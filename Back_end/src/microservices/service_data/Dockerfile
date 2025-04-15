# Use Node.js official image (v14)
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY server.js .

# Expose port 3000
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]