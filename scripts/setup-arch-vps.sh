#!/bin/bash

# Arch Linux VPS Setup Script for Anshika Caters CI/CD Pipeline
# Run this script on your Arch Linux VPS as root

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up Anshika Caters CI/CD Pipeline for Arch Linux${NC}\n"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

echo -e "${YELLOW}📦 Updating system and installing required packages...${NC}"

# Update system
pacman -Syu --noconfirm

# Install required packages
echo "Installing Node.js, npm, and other dependencies..."
pacman -S --noconfirm nodejs npm git curl tar gzip openssh

# Install Bun if not already installed
if ! command -v bun &> /dev/null; then
    echo "Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    # Add bun to PATH for current session
    export PATH="$HOME/.bun/bin:$PATH"
    # Add to shell profile
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
else
    echo "Bun already installed"
fi

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
else
    echo "PM2 already installed"
fi

# Ensure Nginx is installed and running
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    pacman -S --noconfirm nginx
fi

# Start and enable Nginx
systemctl enable nginx
systemctl start nginx

echo -e "${YELLOW}📁 Setting up directories...${NC}"

# Create application directory
mkdir -p /var/www/anshika-caters
mkdir -p /var/www/anshika-caters/logs

# Set proper ownership for Arch Linux (http user)
chown -R http:http /var/www/

echo -e "${YELLOW}⚙️ Configuring Nginx for acaterers.com...${NC}"

# Create Nginx site configuration for acaterers.com
cat > /etc/nginx/sites-available/anshika-caters << 'EOF'
server {
    listen 80;
    server_name acaterers.com www.acaterers.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name acaterers.com www.acaterers.com;

    # SSL configuration (assuming certbot is already set up)
    ssl_certificate /etc/letsencrypt/live/acaterers.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/acaterers.com/privkey.pem;
    
    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

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
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Handle static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://localhost:3000;
        access_log off;
    }
}
EOF

# Create sites-enabled directory if it doesn't exist (Arch Linux might not have it by default)
mkdir -p /etc/nginx/sites-enabled

# Enable the site
if [ ! -L /etc/nginx/sites-enabled/anshika-caters ]; then
    ln -s /etc/nginx/sites-available/anshika-caters /etc/nginx/sites-enabled/
fi

# Test Nginx configuration
nginx -t

# Reload Nginx if test passes
if [ $? -eq 0 ]; then
    systemctl reload nginx
    echo -e "${GREEN}✅ Nginx configuration updated successfully${NC}"
else
    echo -e "${RED}❌ Nginx configuration test failed${NC}"
    exit 1
fi

echo -e "${YELLOW}🔒 Setting up firewall...${NC}"

# Configure firewall using ufw (install if needed)
if ! command -v ufw &> /dev/null; then
    pacman -S --noconfirm ufw
fi

ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

echo -e "${YELLOW}🔑 Setting up SSH keys for GitHub Actions...${NC}"

# Generate SSH key pair for GitHub Actions
SSH_KEY_PATH="/root/.ssh/github_actions"
if [ ! -f "$SSH_KEY_PATH" ]; then
    ssh-keygen -t ed25519 -C "github-actions@acaterers.com" -f "$SSH_KEY_PATH" -N ""
    cat "$SSH_KEY_PATH.pub" >> /root/.ssh/authorized_keys
    chmod 600 /root/.ssh/authorized_keys
    chmod 700 /root/.ssh
    chmod 600 "$SSH_KEY_PATH"
    chmod 644 "$SSH_KEY_PATH.pub"
fi

echo -e "${YELLOW}🔄 Setting up PM2 startup script...${NC}"

# Setup PM2 to start on boot
pm2 startup systemd -u root --hp /root
systemctl enable pm2-root

echo -e "${GREEN}✅ Setup completed successfully!${NC}\n"

echo -e "${BLUE}📋 Configuration Summary:${NC}"
echo "• Domain: acaterers.com (with SSL)"
echo "• Node.js: $(node --version)"
echo "• Bun: $(bun --version)"
echo "• PM2: $(pm2 --version)"
echo "• Application Directory: /var/www/anshika-caters"
echo "• Web Server: Nginx with SSL"
echo "• Firewall: Enabled"
echo ""

echo -e "${BLUE}📋 Next steps for GitHub Actions:${NC}"
echo "1. Copy this private key to GitHub Secrets as VPS_SSH_KEY:"
echo -e "${YELLOW}----------------------------------------${NC}"
cat "$SSH_KEY_PATH"
echo -e "${YELLOW}----------------------------------------${NC}"
echo ""
echo "2. Add these GitHub Secrets:"
echo "   - VPS_HOST: 89.116.122.245"
echo "   - VPS_USER: root"
echo "   - VPS_SSH_KEY: (the private key shown above)"
echo ""
echo "3. Your VPS is ready for automated deployments!"
echo ""
echo -e "${GREEN}🎉 Push to main branch to trigger your first automated deployment!${NC}"
