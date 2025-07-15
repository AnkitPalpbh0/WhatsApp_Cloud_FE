FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first
COPY . .
RUN npm install

# Set VITE env variable for build-time
ENV VITE_API_BASE_URL=http://52.73.226.154:8080


# Build the React app (Vite reads VITE_ env vars at build time)
RUN npm run build

# Install static server
RUN npm install -g serve

# Serve the built app
CMD ["serve", "-s", "dist"]
