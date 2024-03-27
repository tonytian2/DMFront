# Use an official Node.js runtime as the base image
FROM node:21.7.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the container's port (change the port if necessary)
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["npm", "start"]