# 🚀 Hostinger Deployment Guide

## Prerequisites
- Hostinger hosting account with Node.js support
- Your blog repository on GitHub (private)
- SSH key access from Hostinger to GitHub

## 📋 Step-by-Step Deployment

### 1. **SSH Key Setup**
1. Copy SSH key from Hostinger Control Panel → Git Repository section
2. Add to GitHub: Settings → SSH and GPG keys → New SSH key
3. Paste key and save with title "Hostinger Deployment"

### 2. **Repository Configuration**
```bash
Repository URL: git@github.com:Shahroze24k/chand-e-mahtab-blog.git
Branch: master
Path: /blog (if deploying from subdirectory)
```

### 3. **Build Settings**
```bash
Build Command: cd blog && npm install && npm run build
Start Command: cd blog && npm start
Node Version: 18.x or higher
```

### 4. **Environment Variables**
Set these in Hostinger Control Panel:

```env
# Database
DATABASE_URL="file:./dev.db"

# Admin
ADMIN_PASSWORD="admin123"

# AI Configuration  
GROQ_API_KEY="your_groq_api_key_here"

# Site URLs (replace with your domain)
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
SITE_URL="https://yourdomain.com"

# Production Settings
NODE_ENV="production"
```

### 5. **Database Setup**
Since using SQLite, ensure the database file is writable:
```bash
chmod 664 prisma/dev.db
```

### 6. **File Permissions**
```bash
# Make uploads directory writable
chmod 755 public/uploads
```

## 🔧 Deployment Process

### Automatic Deployment
1. Push changes to your GitHub repository
2. Hostinger will automatically pull and build
3. Your site will be live at your domain

### Manual Deployment
If automatic doesn't work:
1. SSH into your Hostinger account
2. Navigate to your site directory
3. Run:
```bash
git pull origin master
npm install
npm run build
npm start
```

## 🌐 Domain Configuration

### Custom Domain
1. In Hostinger → Domains → Manage
2. Point domain to your hosting account
3. Update environment variables with your domain
4. Enable SSL certificate

### Subdomain
```bash
# If using subdomain like blog.yourdomain.com
NEXT_PUBLIC_SITE_URL="https://blog.yourdomain.com"
SITE_URL="https://blog.yourdomain.com"
```

## 🛠️ Troubleshooting

### Common Issues:

**Build Fails:**
- Check Node.js version (requires 18+)
- Verify all dependencies in package.json
- Check build logs for specific errors

**Database Errors:**
- Ensure SQLite file has write permissions
- Check DATABASE_URL environment variable
- Run `npx prisma generate` after deployment

**AI Features Not Working:**
- Verify GROQ_API_KEY is set correctly
- Check API endpoint responses in Network tab
- Ensure environment variables are loaded

**Images Not Loading:**
- Check file permissions on `public/` directory
- Verify image paths in database
- Ensure `unoptimized: true` in next.config.ts

### Debug Commands:
```bash
# Check environment variables
printenv | grep -E "(GROQ|SITE_URL|DATABASE)"

# Check Node.js version
node --version

# Check database connection
npx prisma db push

# Test build locally
npm run build && npm start
```

## 📊 Post-Deployment Checklist

- [ ] Site loads correctly at your domain
- [ ] Admin login works (`/admin/login`)
- [ ] Blog posts display properly
- [ ] Comments system functional
- [ ] Search feature working
- [ ] AI translation widget operational
- [ ] Admin AI assistant accessible
- [ ] Social sharing buttons work
- [ ] SSL certificate active
- [ ] Database writable
- [ ] Image uploads functional

## 🔄 Updates & Maintenance

### Updating Content:
1. Add posts via admin panel (`/admin/posts/new`)
2. Or update database and redeploy

### Code Updates:
1. Push changes to GitHub
2. Automatic deployment will trigger
3. Monitor deployment logs

### Database Backup:
```bash
# Backup SQLite database
cp prisma/dev.db backups/dev-$(date +%Y%m%d).db
```

## 🎉 Your Blog is Live!

Your Chand-e-Mahtab blog with AI features is now running on Hostinger! 

**Access URLs:**
- **Homepage**: https://yourdomain.com
- **Admin Panel**: https://yourdomain.com/admin
- **About Page**: https://yourdomain.com/about

**AI Features Active:**
- 🌐 Translation widget on all posts
- 🤖 AI content assistant in admin
- 🛡️ Smart comment moderation
- 📝 Auto-summarization tools

Happy blogging! 🚀
