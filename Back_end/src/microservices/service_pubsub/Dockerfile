# Use Node.js official image (v14)
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the pubsub service code
COPY pubsub.js .

# Expose port 4000 for the service
EXPOSE 4000

# Start the Pub-Sub service
CMD ["node", "pubsub.js"]
