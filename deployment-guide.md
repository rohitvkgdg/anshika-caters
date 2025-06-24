# VPS Deployment Guide for Anshika Caters Website

## Prerequisites
- Ubuntu/Debian VPS with root access
- Domain name pointing to your VPS IP
- SSL certificate (Let's Encrypt recommended)

## Step 1: Prepare Your VPS

### Update system packages
```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js (LTS version)
```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 2: Deploy Your Application

### Upload your code to VPS
```bash
# Option 1: Using Git (recommended)
cd /var/www
sudo git clone https://github.com/yourusername/anshika-caters-web.git
sudo chown -R $USER:$USER anshika-caters-web

# Option 2: Using SCP
# scp -r ./anshika-caters-web user@your-vps-ip:/var/www/
```

### Install dependencies and build
```bash
cd /var/www/anshika-caters-web
npm install
npm run build
```

### Start application with PM2
```bash
# Create PM2 ecosystem file
pm2 start npm --name "anshika-caters" -- run start:prod
pm2 save
pm2 startup
```

## Step 3: Configure Nginx

### Create Nginx site configuration
```bash
sudo nano /etc/nginx/sites-available/anshika-caters
```

### Test Nginx configuration
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: SSL Setup with Let's Encrypt

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Obtain SSL certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Step 5: Firewall Configuration

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Step 6: Monitoring and Maintenance

### View PM2 logs
```bash
pm2 logs anshika-caters
pm2 monit
```

### Restart application
```bash
pm2 restart anshika-caters
```

### Update application
```bash
cd /var/www/anshika-caters-web
git pull origin main
npm install
npm run build
pm2 restart anshika-caters
```

## Performance Optimization

### Enable Gzip compression in Nginx
Already included in the configuration below.

### Set up CDN (Optional)
Consider using Cloudflare for additional performance and security.

### Database backup (if applicable)
Set up regular backups if you add a database later.
