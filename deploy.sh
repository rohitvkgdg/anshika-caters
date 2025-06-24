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

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   log_error "This script should not be run as root"
   exit 1
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
    sudo cp nginx.conf $NGINX_SITES_AVAILABLE/$APP_NAME
    log_warn "Please update the domain name in $NGINX_SITES_AVAILABLE/$APP_NAME"
fi

# Enable Nginx site
if [ ! -L "$NGINX_SITES_ENABLED/$APP_NAME" ]; then
    sudo ln -s $NGINX_SITES_AVAILABLE/$APP_NAME $NGINX_SITES_ENABLED/$APP_NAME
fi

# Test Nginx configuration
log_info "Testing Nginx configuration..."
sudo nginx -t

# Reload Nginx
log_info "Reloading Nginx..."
sudo systemctl reload nginx

# Setup log rotation
log_info "Setting up log rotation..."
sudo tee /etc/logrotate.d/$APP_NAME > /dev/null <<EOF
$APP_DIR/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    notifempty
    create 0640 $USER $USER
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

log_info "Deployment completed successfully!"
log_info "Application status:"
pm2 show $APP_NAME

log_warn "Don't forget to:"
log_warn "1. Update domain name in Nginx configuration"
log_warn "2. Setup SSL certificate with: sudo certbot --nginx -d yourdomain.com"
log_warn "3. Configure firewall: sudo ufw allow 'Nginx Full'"
log_warn "4. Verify Bun version: bun --version"
