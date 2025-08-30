# 🔧 Development vs Production Configuration

This document explains the differences between development and production configurations for the Chand-e-Mahtab blog.

## 📁 File Structure

### Development-Only Files (Excluded from Git)
These files are kept locally for development convenience but excluded from commits:

- `start-dev.bat` - Windows batch script to start dev server with SQLite
- `start-dev.ps1` - PowerShell script to start dev server with SQLite  
- `public/test-ai-features.html` - Test page for AI API endpoints
- `TROUBLESHOOTING-AI-FEATURES.md` - Development troubleshooting guide
- `prisma/dev.db` - SQLite development database

### Production Files
These files are committed and used for production deployment:

- `env.production.example` - Production environment template
- `MYSQL-DEPLOYMENT.md` - MySQL production deployment guide
- `HOSTINGER-DEPLOYMENT-GUIDE.md` - Hostinger-specific deployment guide

## 🗄️ Database Configuration

### Development (SQLite)
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL") // "file:./prisma/dev.db"
}

model Post {
  content String  // No @db.Text needed for SQLite
}
```

### Production (MySQL)
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL") // MySQL connection string
}

model Post {
  content String @db.Text  // Required for MySQL TEXT columns
}
```

## 🔑 Environment Variables

### Development (.env.local - not committed)
```env
DATABASE_URL="file:./prisma/dev.db"
GROQ_API_KEY="your_dev_key_here"
ADMIN_PASSWORD="admin123"
NEXTAUTH_SECRET="development_secret_key"
```

### Production (.env - on server only)
```env
DATABASE_URL="mysql://user:pass@host:3306/db"
GROQ_API_KEY="your_production_key"
ADMIN_PASSWORD="secure_production_password"
NEXTAUTH_SECRET="long_random_production_secret"
SITE_URL="https://yourdomain.com"
NODE_ENV="production"
```

## 🚀 Deployment Process

### For Production Deployment:

1. **Update Database Schema:**
   ```prisma
   datasource db {
     provider = "mysql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   
   model Post {
     content String @db.Text  // Add @db.Text for large text fields
   }
   ```

2. **Set Production Environment Variables** on your server

3. **Run Database Migration:**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Build and Deploy:**
   ```bash
   npm run build
   npm start
   ```

## 🛠️ Development Workflow

### Starting Development Server:
- **Windows:** Double-click `start-dev.bat`
- **PowerShell/Linux:** Run `./start-dev.ps1`
- **Manual:** Set environment variables and run `npm run dev`

### Testing AI Features:
- Visit `http://localhost:3000/test-ai-features.html`
- Test translation, tag generation, and AI suggestions

### Database Management:
- **View data:** `npx prisma studio`
- **Reset database:** `npx prisma migrate reset`
- **Seed data:** `npm run seed`

## ⚠️ Important Notes

1. **Never commit development files** - They're excluded in `.gitignore`
2. **Always test locally** before deploying to production
3. **Use different API keys** for development and production
4. **Database schema changes** require updating both SQLite and MySQL versions
5. **Environment variables** must be set correctly for each environment

## 🔄 Schema Migration Workflow

When making database schema changes:

1. **Update schema** in `prisma/schema.prisma`
2. **Test locally** with SQLite
3. **For production:** Change provider to "mysql" and add @db.Text attributes
4. **Deploy** with proper MySQL configuration

This approach allows seamless local development while maintaining production compatibility.
