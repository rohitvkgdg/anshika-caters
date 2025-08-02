# 🚀 Anshika Caters - Complete Deployment Guide

## Overview
This guide covers both manual and automated CI/CD deployment for your Anshika Caters website on a Hostinger VPS with Arch Linux.

---

## 📋 Prerequisites

- ✅ Hostinger VPS with Arch Linux
- ✅ Domain: acaterers.com (configured in DNS)
- ✅ SSH access as root
- ✅ SSL certificate (Certbot/Let's Encrypt)

---

## 🎯 Option 1: Automated CI/CD Deployment (Recommended)

### Step 1: Setup Your VPS (5 minutes)

SSH into your VPS and run:
```bash
curl -fsSL https://raw.githubusercontent.com/rohitvkgdg/anshika-caters/main/scripts/setup-arch-vps.sh | bash
```

This script will:
- Install Node.js, Bun, PM2, and Nginx
- Configure Nginx for acaterers.com with SSL
- Setup firewall and SSH keys
- Prepare directories with proper permissions

### Step 2: Configure GitHub Secrets

Go to: `https://github.com/rohitvkgdg/anshika-caters/settings/secrets/actions`

Add these secrets:
- **VPS_HOST**: `89.116.122.245`
- **VPS_USER**: `root`
- **VPS_SSH_KEY**: Copy the private key from the setup script output

### Step 3: Deploy

```bash
git add .
git commit -m "Setup CI/CD deployment"
git push origin main
```

GitHub Actions will automatically:
- Run tests and build the application
- Create backup of current deployment
- Deploy new version with zero downtime
- Run health checks
- Rollback automatically if deployment fails

### Monitoring Your Deployment

- **Health Check**: https://acaterers.com/api/health
- **GitHub Actions**: Repository → Actions tab
- **VPS Status**: `ssh root@89.116.122.245 "pm2 status"`

---

## 🛠️ Option 2: Manual Deployment

### Step 1: VPS Setup

```bash
# Update system
pacman -Syu --noconfirm

# Install required packages
pacman -S --noconfirm nodejs npm git curl nginx

# Install Bun
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

# Install PM2
npm install -g pm2

# Enable services
systemctl enable nginx
systemctl start nginx
```

### Step 2: Deploy Application

```bash
# Create application directory
mkdir -p /var/www/anshika-caters
cd /var/www

# Clone repository
git clone https://github.com/rohitvkgdg/anshika-caters.git anshika-caters
cd anshika-caters

# Install dependencies and build
bun install
bun run build

# Set permissions
chown -R http:http /var/www/anshika-caters
chmod -R 755 /var/www/anshika-caters

# Create production environment file
cp .env.production.example .env.production
# Edit .env.production with your specific values
```

### Step 3: Configure Nginx

```bash
# Create Nginx configuration
cat > /etc/nginx/sites-available/anshika-caters << 'EOF'
server {
    listen 80;
    server_name acaterers.com www.acaterers.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name acaterers.com www.acaterers.com;

    ssl_certificate /etc/letsencrypt/live/acaterers.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/acaterers.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

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

# Enable site
mkdir -p /etc/nginx/sites-enabled
ln -s /etc/nginx/sites-available/anshika-caters /etc/nginx/sites-enabled/

# Test and reload Nginx
nginx -t
systemctl reload nginx
```

### Step 4: Start Application

```bash
# Start with PM2
cd /var/www/anshika-caters
pm2 start ecosystem.config.json --env production

# Save PM2 configuration
pm2 save
pm2 startup systemd
```

---

## 🔍 Verification & Monitoring

### Health Checks
```bash
# Local health check
curl localhost:3000/api/health

# Public health check
curl https://acaterers.com/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-08-02T...",
  "uptime": 123.45,
  "environment": "production"
}
```

### Monitoring Commands
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs anshika-caters

# Monitor in real-time
pm2 monit

# Check Nginx status
systemctl status nginx

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🚨 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
lsof -ti:3000 | xargs kill -9
pm2 restart anshika-caters
```

**Nginx 502 Bad Gateway:**
```bash
# Check if app is running
pm2 status
# Check Nginx config
nginx -t
# Restart services
pm2 restart anshika-caters
systemctl reload nginx
```

**SSL Certificate Issues:**
```bash
# Renew certificate
certbot renew
systemctl reload nginx
```

**Permission Errors:**
```bash
# Fix ownership
chown -R http:http /var/www/anshika-caters
chmod -R 755 /var/www/anshika-caters
```

---

## 🔄 Updates & Maintenance

### Manual Updates
```bash
cd /var/www/anshika-caters
git pull origin main
bun install
bun run build
pm2 restart anshika-caters
```

### Automated Updates (CI/CD)
Simply push to the main branch - GitHub Actions handles everything automatically!

### Backup Strategy
- CI/CD automatically creates backups before each deployment
- Manual backup: `tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/anshika-caters`

---

## 🔒 Security Checklist

- ✅ SSL certificate installed and configured
- ✅ Firewall configured (SSH + HTTP/HTTPS only)
- ✅ SSH key authentication (for CI/CD)
- ✅ Regular system updates
- ✅ Nginx security headers configured
- ✅ Non-root application user (http)

---

## 📞 Emergency Commands

```bash
# Quick status check
ssh root@89.116.122.245 "pm2 status && curl -s localhost:3000/api/health"

# Restart everything
ssh root@89.116.122.245 "pm2 restart anshika-caters && systemctl reload nginx"

# Rollback to previous version (CI/CD)
ssh root@89.116.122.245 "cd /var/www && mv anshika-caters anshika-caters_broken && mv anshika-caters_backup_* anshika-caters && pm2 restart anshika-caters"

# View recent logs
ssh root@89.116.122.245 "pm2 logs anshika-caters --lines 50"
```

---

## 🎉 Success!

Your Anshika Caters website should now be live at:
- **Production**: https://acaterers.com
- **Health Check**: https://acaterers.com/api/health

Choose the CI/CD option for automated, zero-downtime deployments, or use manual deployment for full control.

### 4. Setup SSL Certificate
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5. Configure Firewall
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Useful Commands

### Application Management
```bash
# View application status
pm2 status

# View logs
pm2 logs anshika-caters

# Restart application
pm2 restart anshika-caters

# Monitor application
pm2 monit
```

### Updates and Maintenance
```bash
# Update application
cd /var/www/anshika-caters-web
git pull origin main
bun install
bun run build
pm2 restart anshika-caters
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# View Nginx logs
sudo tail -f /var/log/nginx/anshika-caters.access.log
sudo tail -f /var/log/nginx/anshika-caters.error.log
```

## Monitoring

### Health Check Endpoint
Your application includes a health check endpoint at `/api/health`

### Log Locations
- Application logs: `/var/www/anshika-caters-web/logs/`
- Nginx logs: `/var/log/nginx/anshika-caters.*`
- PM2 logs: `pm2 logs anshika-caters`

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   cd /var/www/anshika-caters-web
   bun run build
   pm2 restart anshika-caters
   pm2 logs anshika-caters
   ```

2. **502 Bad Gateway**
   - Check if application is running: `pm2 status`
   - Check application logs: `pm2 logs anshika-caters`
   - Restart application: `pm2 restart anshika-caters`

3. **SSL Certificate Issues**
   ```bash
   sudo certbot renew --dry-run
   sudo certbot certificates
   ```

4. **High Memory Usage**
   ```bash
   pm2 restart anshika-caters
   pm2 monit
   ```

## Performance Optimization

1. **Enable Cloudflare** (Optional)
   - Set up Cloudflare for your domain
   - Enable caching and minification
   - Use Cloudflare's CDN

2. **Database Setup** (Future)
   - Consider PostgreSQL or MySQL for dynamic content
   - Set up regular backups

3. **Monitoring Setup**
   - Consider PM2 Plus for advanced monitoring
   - Set up uptime monitoring (UptimeRobot, etc.)

## Security Best Practices

- [ ] Keep system updated: `sudo apt update && sudo apt upgrade`
- [ ] Use strong SSH keys
- [ ] Configure fail2ban: `sudo apt install fail2ban`
- [ ] Regular security audits: `bun audit` (or `npm audit`)
- [ ] Monitor logs regularly
- [ ] Keep SSL certificates updated

## Support

If you encounter issues:
1. Check the logs first
2. Verify all services are running
3. Test the health check endpoint: `curl https://yourdomain.com/api/health`
4. Check firewall settings: `sudo ufw status`

---

**🎉 Your Anshika Caters website should now be live!**

Access your website at: `https://yourdomain.com`
