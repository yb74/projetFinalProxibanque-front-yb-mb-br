# Use an official Node.js runtime as the base image
FROM node:18.12.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app for production (you can change --prod to --dev if needed)
RUN npm run build --dev

# Expose the port on which the Angular app will run (adjust if needed)
EXPOSE 4200

# Start the Angular app when the container starts
CMD ["npm", "start"]