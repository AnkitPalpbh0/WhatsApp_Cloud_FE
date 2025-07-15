FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first
COPY . .
RUN npm install

# Set VITE env variable for build-time
ENV VITE_API_BASE_URL=http://52.73.226.154:8080
ENV VITE_S3_ACCESS_KEY=AKIAYFOSJCSCMGBPC4HQ
ENV VITE_S3_SECRET_KEY=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
ENV VITE_S3_REGION_NAME=us-east-1
ENV VITE_S3_BUCKET=whatsapp-app-test
ENV VITE_S3_BASE_URL="https://whatsapp-app-test.s3.us-east-1.amazonaws.com"


# Build the React app (Vite reads VITE_ env vars at build time)
RUN npm run build

# Install static server
RUN npm install -g serve

# Serve the built app
CMD ["serve", "-s", "dist"]
