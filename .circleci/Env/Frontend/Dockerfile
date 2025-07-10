FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Install the 'serve' static file server
RUN npm install -g serve

# Expose default port (optional, can be overridden when running)
EXPOSE 5173

# Start serving the build folder
CMD ["serve", "-s", "build"]