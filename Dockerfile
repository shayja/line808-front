# ========== 1) Build frontend ==========
FROM node:alpine AS web-build
WORKDIR /app

# Install dependencies
COPY front/package*.json ./
RUN npm install

# Copy source and build
COPY front/ .
RUN npm run build

# ========== 2) Build Go backend ==========
FROM golang:alpine AS go-build
WORKDIR /go/src/app

COPY backend/ ./
RUN go mod tidy
RUN go build -o /go/bin/mixes-api .

# ========== 3) Final image ==========
FROM nginx:alpine

# clean default nginx html
RUN rm -rf /usr/share/nginx/html/*

# copy frontend build
COPY --from=web-build /app/dist /usr/share/nginx/html

# copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# copy go binary
COPY --from=go-build /go/bin/mixes-api /usr/local/bin/mixes-api

EXPOSE 80

# run both nginx + go api
CMD ["/bin/sh", "-c", "/usr/local/bin/mixes-api & nginx -g 'daemon off;'"]
