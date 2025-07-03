#!/bin/bash

# Deployment script for Anshika Caters Website (Using Bun)
# Usage: ./deploy.sh [production|staging]

set -e

# Configuration
APP_NAME="anshika-caters"
APP_DIR="/var/www/anshika-caters-web"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root and handle appropriately
if [[ $EUID -eq 0 ]]; then
   log_warn "Running as root user. This is acceptable for VPS deployment."
   log_warn "Make sure to secure your server properly after deployment."
   USER="root"
   GROUP="root"
else
   USER=$(whoami)
   GROUP=$(id -gn)
fi

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    log_error "Bun is not installed. Please install Bun first:"
    log_error "curl -fsSL https://bun.sh/install | bash"
    log_error "Then restart your terminal or run: source ~/.bashrc"
    exit 1
fi

# Environment setup
ENVIRONMENT=${1:-production}
log_info "Deploying to $ENVIRONMENT environment using Bun"

# Create app directory if it doesn't exist
log_info "Setting up application directory..."
mkdir -p $APP_DIR

# Copy application files to deployment directory
log_info "Copying application files..."
SOURCE_DIR="$PWD"
TARGET_DIR="$APP_DIR"

# Get absolute paths to ensure proper comparison
SOURCE_ABS=$(realpath "$SOURCE_DIR")
TARGET_ABS=$(realpath "$TARGET_DIR")

if [ "$SOURCE_ABS" != "$TARGET_ABS" ]; then
    log_info "Copying from $SOURCE_ABS to $TARGET_ABS"
    # Remove existing files except logs and node_modules to avoid conflicts
    find "$TARGET_DIR" -maxdepth 1 -not -name "logs" -not -name "node_modules" -not -name "." -not -name ".." -exec rm -rf {} + 2>/dev/null || true
    
    # Copy files excluding certain directories
    rsync -av --exclude='node_modules' --exclude='logs' --exclude='.git' --exclude='dist' --exclude='.next' "$SOURCE_DIR/" "$TARGET_DIR/"
    log_info "Files copied to $TARGET_DIR"
else
    log_info "Source and target directories are the same. Skipping file copy."
fi

# Create logs directory
mkdir -p $APP_DIR/logs

# Install/Update dependencies
log_info "Installing dependencies with Bun..."
cd $APP_DIR
bun install --production

# Build the application
log_info "Building application with Bun..."
bun run build

# Setup PM2 ecosystem
log_info "Setting up PM2..."
if pm2 show $APP_NAME > /dev/null 2>&1; then
    log_info "Restarting existing PM2 process..."
    pm2 restart $APP_NAME
else
    log_info "Starting new PM2 process..."
    pm2 start ecosystem.config.json
fi

# Save PM2 configuration
pm2 save

# Remove duplicate Nginx configurations to prevent conflicts
log_info "Cleaning up duplicate Nginx configurations..."
if [ -L "$NGINX_SITES_ENABLED/$APP_NAME" ]; then
    rm $NGINX_SITES_ENABLED/$APP_NAME
    log_info "Removed existing Nginx symlink"
fi

if [ -f "$NGINX_SITES_AVAILABLE/$APP_NAME" ]; then
    rm $NGINX_SITES_AVAILABLE/$APP_NAME
    log_info "Removed existing Nginx configuration"
fi

# Also check for any other conflicting configurations
find $NGINX_SITES_ENABLED -name "*anshika*" -type l -delete 2>/dev/null || true
find $NGINX_SITES_AVAILABLE -name "*anshika*" -type f -delete 2>/dev/null || true

# Setup Nginx configuration
log_info "Setting up Nginx configuration..."
# Create a simple, clean configuration without rate limiting zones
cat > $NGINX_SITES_AVAILABLE/$APP_NAME << 'EOF'
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name acaterers.com www.acaterers.com;
    
    # For Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    # Redirect all other HTTP requests to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name acaterers.com www.acaterers.com;

    # SSL Configuration (will be updated by certbot)
    ssl_certificate /etc/letsencrypt/live/acaterers.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/acaterers.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        image/svg+xml;

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ @nextjs;
    }

    # Main application
    location / {
        try_files $uri $uri/ @nextjs;
    }

    # Proxy to Next.js application
    location @nextjs {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:3000/api/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        access_log off;
    }
}
EOF

log_info "Nginx configuration created"
log_warn "Please update 'acaterers.com' with your actual domain in: $NGINX_SITES_AVAILABLE/$APP_NAME"

# Enable Nginx site
log_info "Enabling Nginx site..."
ln -s $NGINX_SITES_AVAILABLE/$APP_NAME $NGINX_SITES_ENABLED/$APP_NAME
log_info "Nginx site enabled"

# Test Nginx configuration
log_info "Testing Nginx configuration..."
nginx -t

# Reload Nginx
log_info "Reloading Nginx..."
systemctl reload nginx

# Setup log rotation
log_info "Setting up log rotation..."
tee /etc/logrotate.d/$APP_NAME > /dev/null <<EOF
$APP_DIR/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    notifempty
    create 0640 $USER $GROUP
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

log_info "Deployment completed successfully!"
log_info "Application status:"
pm2 show $APP_NAME

log_warn "Don't forget to:"
log_warn "1. Update domain name in Nginx configuration: nano $NGINX_SITES_AVAILABLE/$APP_NAME"
log_warn "2. Setup SSL certificate with: certbot --nginx -d yourdomain.com"
log_warn "3. Configure firewall: ufw allow 'Nginx Full'"
log_warn "4. Verify Bun version: bun --version"
log_warn "5. For security, consider creating a non-root user for future deployments"
