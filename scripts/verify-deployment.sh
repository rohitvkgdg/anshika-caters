#!/bin/bash

# Quick deployment verification script
# Run this on your VPS to check if everything is working

echo "🔍 Checking Anshika Caters Deployment Status..."
echo "================================================"

# Check if application is running
echo "📦 PM2 Process Status:"
pm2 status anshika-caters || echo "❌ PM2 process not found"
echo ""

# Check if port 3000 is listening
echo "🔌 Port 3000 Status:"
if netstat -tlnp | grep :3000 > /dev/null; then
    echo "✅ Application listening on port 3000"
else
    echo "❌ Nothing listening on port 3000"
fi
echo ""

# Check Nginx status
echo "🌐 Nginx Status:"
systemctl is-active nginx && echo "✅ Nginx is running" || echo "❌ Nginx is not running"
echo ""

# Test local health endpoint
echo "🏥 Local Health Check:"
if curl -s localhost:3000/api/health > /dev/null; then
    echo "✅ Local health endpoint responding"
    curl -s localhost:3000/api/health | jq . 2>/dev/null || curl -s localhost:3000/api/health
else
    echo "❌ Local health endpoint not responding"
fi
echo ""

# Test public health endpoint
echo "🌍 Public Health Check:"
if curl -s https://acaterers.com/api/health > /dev/null; then
    echo "✅ Public health endpoint responding"
    curl -s https://acaterers.com/api/health | jq . 2>/dev/null || curl -s https://acaterers.com/api/health
else
    echo "❌ Public health endpoint not responding"
fi
echo ""

# Check SSL certificate
echo "🔒 SSL Certificate Status:"
if echo | openssl s_client -servername acaterers.com -connect acaterers.com:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null; then
    echo "✅ SSL certificate is valid"
else
    echo "❌ SSL certificate issue"
fi
echo ""

# Check logs for errors
echo "📝 Recent PM2 Logs:"
pm2 logs anshika-caters --lines 5 --nostream 2>/dev/null || echo "No PM2 logs available"
echo ""

echo "================================================"
echo "🎯 Verification complete!"

# Quick summary
if curl -s https://acaterers.com/api/health > /dev/null && systemctl is-active nginx > /dev/null; then
    echo "✅ Everything looks good! Your deployment is working."
else
    echo "❌ Some issues detected. Check the logs above."
fi
