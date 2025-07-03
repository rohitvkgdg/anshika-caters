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
    
    # Ensure target directory exists and is clean
    mkdir -p "$TARGET_DIR"
    
    # Remove existing files except logs and node_modules to avoid conflicts
    log_info "Cleaning target directory (preserving logs and node_modules)..."
    find "$TARGET_DIR" -maxdepth 1 -not -name "logs" -not -name "node_modules" -not -name "." -not -name ".." -exec rm -rf {} + 2>/dev/null || true
    
    # Copy files excluding certain directories with verbose output
    log_info "Syncing files..."
    if rsync -av --exclude='node_modules/' --exclude='logs/' --exclude='.git/' --exclude='dist/' --exclude='.next/' --exclude='bun.lockb' --exclude='components/ui/calendar.tsx' "$SOURCE_DIR/" "$TARGET_DIR/"; then
        log_info "Files copied successfully to $TARGET_DIR"
    else
        log_error "Failed to copy files"
        exit 1
    fi
    
    # Verify critical files exist
    log_info "Verifying critical files..."
    for file in "package.json" "components/loading-context.tsx" "components/client-layout.tsx" "components/hero-section.tsx"; do
        if [ ! -f "$TARGET_DIR/$file" ]; then
            log_error "Critical file missing: $file"
            exit 1
        else
            log_info "✓ Found: $file"
        fi
    done
else
    log_info "Source and target directories are the same. Skipping file copy."
fi

# Create logs directory
mkdir -p $APP_DIR/logs

# Install/Update dependencies
log_info "Installing dependencies with Bun..."
cd $APP_DIR

# Verify we're in the right directory and files exist
if [ ! -f "package.json" ]; then
    log_error "package.json not found in $APP_DIR"
    exit 1
fi

# Clean install to avoid any cached dependency issues
if [ -d "node_modules" ]; then
    log_info "Removing existing node_modules for clean install..."
    rm -rf node_modules
fi

if [ -f "bun.lockb" ]; then
    log_info "Removing bun.lockb for fresh dependency resolution..."
    rm -f bun.lockb
fi

# Install dependencies - bun handles conflicts better than npm
log_info "Installing fresh dependencies..."
if ! bun install; then
    log_error "Failed to install dependencies"
    exit 1
fi

# Fix specific version conflicts that Bun doesn't handle well
log_info "Fixing Radix UI version conflicts..."
bun remove @radix-ui/react-popover @radix-ui/react-slot
bun add @radix-ui/react-popover@^1.1.2 @radix-ui/react-slot@^1.1.0

# Reinstall to ensure all peer dependencies are correct
log_info "Reinstalling dependencies to resolve conflicts..."
if ! bun install; then
    log_error "Failed to reinstall dependencies"
    exit 1
fi

# Verify critical dependencies are installed
log_info "Verifying dependencies..."
if [ ! -d "node_modules" ]; then
    log_error "node_modules directory not created"
    exit 1
fi

# Check for specific problematic packages and their versions
log_info "Checking critical packages..."
if [ ! -d "node_modules/react-day-picker" ]; then
    log_error "react-day-picker not found"
    exit 1
fi

if [ ! -d "node_modules/@radix-ui/react-slot" ]; then
    log_error "@radix-ui/react-slot not found"
    exit 1
fi

log_info "All dependencies verified successfully"

# Build the application
log_info "Building application with Bun..."

# Verify tsconfig.json exists
if [ ! -f "tsconfig.json" ]; then
    log_error "tsconfig.json not found"
    exit 1
fi

# Verify components directory exists
if [ ! -d "components" ]; then
    log_error "components directory not found"
    exit 1
fi

# List components for debugging
log_info "Available components:"
ls -la components/ | head -10

# Set NODE_ENV for production build
export NODE_ENV=production

# Build with detailed output
log_info "Starting build process..."
if ! bun run build; then
    log_error "Build failed"
    log_error "Checking for common issues..."
    
    # Check if @/ path resolution is working
    if [ ! -f "components/loading-context.tsx" ]; then
        log_error "components/loading-context.tsx is missing"
    fi
    
    if [ ! -f "components/client-layout.tsx" ]; then
        log_error "components/client-layout.tsx is missing"
    fi
    
    exit 1
fi

log_info "Build completed successfully"

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
