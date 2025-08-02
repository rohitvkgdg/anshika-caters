# 🚀 Anshika Caters CI/CD Setup - READY TO DEPLOY!

## Your Custom Configuration ✅

- **Domain**: acaterers.com (SSL enabled)
- **VPS**: 89.116.122.245 (Arch Linux)
- **User**: root
- **Runtime**: Bun + Node.js 22.17.1
- **Process Manager**: PM2
- **Web Server**: Nginx
- **Port**: 3000

## 🎯 3-Step Setup (5 minutes)

### Step 1: Setup Your VPS
```bash
# On your Arch Linux VPS (as root):
curl -fsSL https://raw.githubusercontent.com/rohitvkgdg/anshika-caters/main/scripts/setup-arch-vps.sh | bash
```

### Step 2: Configure GitHub Secrets
Go to: `https://github.com/rohitvkgdg/anshika-caters/settings/secrets/actions`

Add these 3 secrets:
- **VPS_HOST**: `89.116.122.245`
- **VPS_USER**: `root`
- **VPS_SSH_KEY**: (Private key from setup script output)

### Step 3: Deploy!
```bash
# Push to trigger deployment:
git add .
git commit -m "Setup CI/CD pipeline"
git push origin main
```

## 🔍 Verification

After deployment, run on your VPS:
```bash
./scripts/verify-deployment.sh
```

Or check manually:
- **Health Check**: https://acaterers.com/api/health
- **Main Site**: https://acaterers.com
- **PM2 Status**: `pm2 status`
- **Logs**: `pm2 logs anshika-caters`

## 🔄 Your Deployment Workflow

1. **Push to main** → Triggers GitHub Actions
2. **Tests & Build** → Runs linting, type checking, builds with Bun
3. **Deploy** → Uploads to VPS, installs with Bun, atomic swap
4. **Health Check** → Verifies https://acaterers.com/api/health
5. **Success** → Your site is live!

## 🚨 Emergency Commands

```bash
# Check status
ssh root@89.116.122.245 "pm2 status && curl -s localhost:3000/api/health"

# Restart application
ssh root@89.116.122.245 "pm2 restart anshika-caters"

# View logs
ssh root@89.116.122.245 "pm2 logs anshika-caters --lines 50"

# Manual rollback (if needed)
ssh root@89.116.122.245 "cd /var/www && mv anshika-caters anshika-caters_broken && mv anshika-caters_backup_* anshika-caters && pm2 restart anshika-caters"
```

## 🎉 What You Get

- ✅ **Zero Downtime Deployments** - Atomic swaps
- ✅ **Automatic Rollbacks** - Failed deployments revert automatically  
- ✅ **Health Monitoring** - Checks endpoint after each deploy
- ✅ **Backup System** - Keeps last 3 deployments for easy rollback
- ✅ **Arch Linux Optimized** - Uses proper users and package management
- ✅ **SSL Enabled** - All traffic secured with HTTPS
- ✅ **Performance Optimized** - Bun for speed, PM2 for reliability

## 📊 Monitoring URLs

- **Production**: https://acaterers.com
- **Health Check**: https://acaterers.com/api/health
- **GitHub Actions**: https://github.com/rohitvkgdg/anshika-caters/actions

---

**Ready to go live?** Run the setup script and push to main! 🚀
