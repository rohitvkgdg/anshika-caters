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
if [ "$PWD" != "$APP_DIR" ]; then
    cp -r . $APP_DIR/
    log_info "Files copied to $APP_DIR"
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

# Setup Nginx configuration
log_info "Setting up Nginx configuration..."
if [ ! -f "$NGINX_SITES_AVAILABLE/$APP_NAME" ]; then
    if [ -f "nginx.conf" ]; then
        cp nginx.conf $NGINX_SITES_AVAILABLE/$APP_NAME
        log_info "Nginx configuration copied"
    else
        log_warn "nginx.conf not found. Creating basic configuration..."
        cat > $NGINX_SITES_AVAILABLE/$APP_NAME << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
    fi
    log_warn "Please update the domain name in $NGINX_SITES_AVAILABLE/$APP_NAME"
fi

# Enable Nginx site
if [ ! -L "$NGINX_SITES_ENABLED/$APP_NAME" ]; then
    ln -s $NGINX_SITES_AVAILABLE/$APP_NAME $NGINX_SITES_ENABLED/$APP_NAME
    log_info "Nginx site enabled"
fi

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
