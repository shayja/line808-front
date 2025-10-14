# Build stage
FROM node:24-alpine AS build

WORKDIR /app

# Copy package files, install dependencies
COPY package*.json ./
RUN npm install

# Copy all source
COPY . .

# Build the React / Vite app
RUN npm run build

# Production stage using nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
