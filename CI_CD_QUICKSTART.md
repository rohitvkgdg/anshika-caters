# 🚀 CI/CD Pipeline - Quick Start

## What's Been Created

Your repository now has a complete CI/CD pipeline with:

### 📁 New Files:
- `.github/workflows/deploy.yml` - Main production deployment
- `.github/workflows/staging.yml` - Staging environment deployment
- `scripts/setup-vps.sh` - VPS setup automation script
- `DEPLOYMENT_GUIDE.md` - Comprehensive setup guide
- `.env.production.example` - Production environment template

### 🔧 Enhanced Files:
- `ecosystem.config.json` - Enhanced PM2 configuration
- `app/api/health/route.ts` - Improved health endpoint
- `.gitignore` - Added deployment-related exclusions

## 🎯 Quick Setup (5 Minutes)

### 1. Run VPS Setup Script
```bash
# On your Hostinger VPS (as root):
curl -fsSL https://raw.githubusercontent.com/rohitvkgdg/anshika-caters/main/scripts/setup-vps.sh | bash
```

### 2. Configure GitHub Secrets
Go to: `GitHub Repository → Settings → Secrets → Actions`

Add these 3 secrets:
- `VPS_HOST` = Your VPS IP address
- `VPS_USER` = `root`
- `VPS_SSH_KEY` = Private key from setup script

### 3. Test Deployment
```bash
# Push to main branch triggers automatic deployment
git add .
git commit -m "Setup CI/CD pipeline"
git push origin main
```

## ✅ Features

- **Zero Downtime Deployments** - Atomic swaps ensure no service interruption
- **Automatic Rollbacks** - Failed deployments automatically revert to previous version
- **Health Monitoring** - Built-in health checks ensure deployment success
- **Backup Creation** - Automatic backups before each deployment
- **Staging Environment** - Test changes in staging before production
- **Security First** - SSH key authentication and proper permissions
- **Performance Optimized** - Caching, compression, and monitoring

## 🔄 Workflow

1. **Push Code** → GitHub detects changes
2. **Run Tests** → Linting, type checking, building
3. **Create Backup** → Current version saved
4. **Deploy** → New version uploaded and started
5. **Health Check** → Verify deployment success
6. **Notify** → Success/failure notification

## 📊 Monitoring

- **Health Endpoint**: https://anshikacaters.com/api/health
- **PM2 Dashboard**: `pm2 monit` on VPS
- **Logs**: `pm2 logs anshika-caters`
- **GitHub Actions**: Repository Actions tab

## 🆘 Emergency Commands

```bash
# Rollback to previous version
ssh root@your-vps "cd /var/www && mv anshika-caters anshika-caters_broken && mv anshika-caters_backup_* anshika-caters && pm2 restart anshika-caters"

# Check deployment status
ssh root@your-vps "pm2 status && curl -s localhost:3000/api/health"

# View deployment logs
ssh root@your-vps "pm2 logs anshika-caters --lines 50"
```

## 🎉 You're Ready!

Your CI/CD pipeline is production-ready with enterprise-grade features:
- Automated testing and deployment
- Zero-downtime deployments
- Automatic rollbacks
- Health monitoring
- Backup management

Simply push to `main` branch and watch your website deploy automatically! 🚀
