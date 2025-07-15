FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first
COPY . .
ARG VITE_API_BASE_URL
ARG VITE_S3_ACCESS_KEY
ARG VITE_S3_SECRET_KEY
ARG VITE_S3_REGION_NAME
ARG VITE_S3_BUCKET
ARG VITE_S3_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_S3_ACCESS_KEY=$VITE_S3_ACCESS_KEY
ENV VITE_S3_SECRET_KEY=$VITE_S3_SECRET_KEY
ENV VITE_S3_REGION_NAME=$VITE_S3_REGION_NAME
ENV VITE_S3_BUCKET=$VITE_S3_BUCKET
ENV VITE_S3_BASE_URL=$VITE_S3_BASE_URL

RUN npm install

# Build the React app (Vite reads VITE_ env vars at build time)
RUN npm run build

# Install static server
RUN npm install -g serve

# Serve the built app
CMD ["serve", "-s", "dist"]
