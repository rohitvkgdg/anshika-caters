# 🚀 VPS Deployment Quick Start

## Prerequisites Checklist
- [ ] VPS with Ubuntu/Debian (2GB RAM minimum recommended)
- [ ] Domain name configured to point to your VPS IP
- [ ] SSH access to your VPS

## Quick Deployment Steps

### 1. Prepare Your VPS
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 and Nginx
sudo npm install -g pm2
sudo apt install nginx git -y
```

### 2. Deploy Your Application
```bash
# Clone your repository
cd /var/www
sudo git clone <your-repo-url> anshika-caters-web
sudo chown -R $USER:$USER anshika-caters-web
cd anshika-caters-web

# Run deployment script
./deploy.sh
```

### 3. Configure Domain
```bash
# Edit Nginx configuration
sudo nano /etc/nginx/sites-available/anshika-caters

# Replace 'yourdomain.com' with your actual domain name
# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

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
npm install
npm run build
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
   npm run build
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
- [ ] Regular security audits: `npm audit`
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
