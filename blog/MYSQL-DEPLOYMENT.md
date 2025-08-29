# 🚀 MySQL Production Deployment Guide

This guide helps you deploy your Chand-e-Mahtab blog to Hostinger with MySQL database.

## 📋 Prerequisites

1. **Hostinger Account** with database access
2. **MySQL Database** created in Hostinger cPanel
3. **Domain/Subdomain** configured

## 🗄️ Database Setup

### Step 1: Create MySQL Database in Hostinger

1. Log into your Hostinger account
2. Go to **cPanel** → **MySQL Databases**
3. Create a new database:
   - Database name: `your_username_blog` (or similar)
   - Username: Create a new database user
   - Password: Use a strong password
   - Grant all privileges to the user

### Step 2: Get Database Connection Details

From Hostinger cPanel, note down:
- **Hostname**: Usually `localhost` or `your-domain.com`
- **Database Name**: The database you created
- **Username**: The database user
- **Password**: The database password
- **Port**: Usually `3306`

## ⚙️ Environment Configuration

### Step 3: Update Environment Variables

Create a `.env.local` file (or update existing) with:

```env
# Production Database (MySQL)
DATABASE_URL="mysql://username:password@hostname:3306/database_name"

# Admin Configuration
ADMIN_PASSWORD=your_secure_admin_password

# AI Configuration (Optional - get free key from console.groq.com)
GROQ_API_KEY=your_groq_api_key_here

# Site Configuration
SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# JWT Secret (generate a random string)
NEXTAUTH_SECRET=your_secure_random_jwt_secret
NEXTAUTH_URL=https://your-domain.com
```

### Step 4: Replace Placeholders

Replace these values in your `DATABASE_URL`:
- `username`: Your MySQL database username
- `password`: Your MySQL database password  
- `hostname`: Your database hostname (usually `localhost`)
- `database_name`: Your MySQL database name

**Example:**
```env
DATABASE_URL="mysql://myuser:mypass123@localhost:3306/myuser_blog"
```

## 🚀 Deployment Steps

### Step 5: Install Dependencies

```bash
# In PowerShell, run separately:
cd blog
npm install
```

### Step 6: Generate Database Schema

```bash
# Generate Prisma client for MySQL
npm run db:generate

# Push schema to MySQL database
npm run db:push

# Seed with initial data
npm run seed
```

### Step 7: Build for Production

```bash
# Build the application
npm run build
```

### Step 8: Deploy to Hostinger

**Option A: Using Git (Recommended)**
1. Push your code to GitHub/GitLab
2. Use Hostinger's Git deployment feature
3. Set environment variables in Hostinger's control panel

**Option B: File Upload**
1. Upload the entire `blog` folder to your domain's public folder
2. Set up environment variables in `.env.local`

## 🔧 Database Management Commands

After deployment, you can manage your database:

```bash
# View database in browser (if deployed locally first)
npm run db:studio

# Reset database (⚠️ DANGER: Deletes all data)
npm run db:push -- --force-reset
npm run seed

# Create a backup
mysqldump -u username -p database_name > backup.sql
```

## 🔐 Security Checklist

- ✅ Use strong database passwords
- ✅ Change default admin password
- ✅ Generate secure JWT secret
- ✅ Use HTTPS for production
- ✅ Keep environment variables secure
- ✅ Regular database backups

## 🌐 Access Your Blog

After successful deployment:

1. **Frontend**: `https://your-domain.com`
2. **Admin Panel**: `https://your-domain.com/admin/login`
3. **Admin Password**: Use the one you set in `ADMIN_PASSWORD`

## 🆘 Troubleshooting

### Connection Issues
```bash
# Test database connection
npm run db:push
```

### Build Issues
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Issues
- Check DATABASE_URL format
- Verify database user permissions
- Ensure database exists
- Check firewall settings

## 📞 Support

If you encounter issues:
1. Check Hostinger's database connection details
2. Verify environment variables
3. Check server logs
4. Contact Hostinger support for database issues

---

## 🎉 Success!

Your bilingual blog should now be running on Hostinger with MySQL! 

Visit your admin panel to start creating content in English and Urdu.
