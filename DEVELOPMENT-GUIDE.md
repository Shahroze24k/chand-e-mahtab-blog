# Chand-e-Mahtab Blog - Development Guide

## 🚀 Quick Start for Development

### Option 1: One-Click Development Setup (Recommended)
```bash
# Windows PowerShell
npm run dev:start

# Or double-click
start-dev.ps1
```

### Option 2: Manual Setup
```bash
# 1. Setup development environment
npm run setup:dev

# 2. Start development server
npm run dev
```

## 📁 Project Structure

### Configuration Files
- `prisma/schema.prisma` - **Production-ready schema** (MySQL, committed to git)
- `prisma/schema.dev.prisma` - Development schema (SQLite, for local development)
- `prisma/schema.prod.backup` - Backup of production schema (auto-created, gitignored)
- `.env.local` - Your local environment variables
- `start-dev.ps1` - One-click development startup

### Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Database | SQLite (`prisma/dev.db`) | MySQL (Remote) |
| Schema | `schema.dev.prisma` → `schema.prisma` | `schema.prisma` (original) |
| Environment | `.env.local` + script variables | Server environment variables |
| AI Features | Enabled with Groq | Enabled with Groq |

## 🔧 Available Commands

### Development
```bash
npm run dev:start      # Complete development setup + start server
npm run setup:dev      # Configure for development (SQLite)
npm run dev            # Start development server (Turbopack)
npm run dev:clean      # Start development server (no Turbopack)
```

### Production Preparation
```bash
npm run setup:prod     # Configure for production (MySQL)
npm run build          # Build for production
npm run deploy         # Full production deployment
```

### Database Management
```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed database with sample data
npm run db:studio      # Open Prisma Studio
```

## 🌟 AI Features

All AI features are fully configured and ready to use:

### Available Features
- **Title Translation**: English ↔ Urdu
- **Summary Translation**: English ↔ Urdu  
- **Content Translation**: Full post translation
- **Auto-Generate Tags**: AI-powered tag suggestions
- **Content Suggestions**: AI writing assistance

### Testing AI Features
1. Start development server: `npm run dev:start`
2. Navigate to: http://localhost:3000/admin/login
3. Login with password: `admin123`
4. Go to: http://localhost:3000/admin/posts/new
5. Test each AI feature in the tabbed interface

## 🔐 Admin Access

- **URL**: http://localhost:3000/admin/login
- **Password**: `admin123`
- **Features**: Full AI-powered post management

## 🚨 Troubleshooting

### Environment Variable Issues
If you see "GROQ_API_KEY missing" or "DATABASE_URL missing":
```bash
# Use the one-click startup script
npm run dev:start
```

### Database Issues
```bash
# Reset development database
npm run setup:dev
```

### Build Issues
```bash
# Clear cache and restart
rm -rf .next
npm run dev:start
```

## 📦 Deployment to Production

### ⚠️ IMPORTANT: Production Safety
The `prisma/schema.prisma` file is **always production-ready** with MySQL configuration. 
- ✅ **Safe to deploy**: The schema in git is always MySQL-compatible
- ✅ **No conflicts**: Development changes don't affect production schema
- ✅ **Automatic backup**: Development setup creates backups before modifications

### Step 1: Prepare for Production (Optional)
```bash
npm run setup:prod  # Only needed if you've been developing locally
```

### Step 2: Set Production Environment Variables
Ensure your production server has:
- `DATABASE_URL` (MySQL connection string)
- `GROQ_API_KEY` (Your Groq API key)
- `ADMIN_PASSWORD` (Secure admin password)
- `NEXTAUTH_SECRET` (Secure random string)

### Step 3: Deploy
```bash
npm run deploy
```

### 🛡️ Production Deployment Safety
- The `schema.prisma` in git is **always MySQL-ready**
- Development modifications are **local-only** and **auto-backed up**
- No risk of deploying SQLite configuration to production

## 🔄 Switching Between Dev and Production

### To Development
```bash
npm run setup:dev
```

### To Production  
```bash
npm run setup:prod
```

The setup scripts automatically:
- Switch database schemas (SQLite ↔ MySQL)
- Configure Prisma client
- Handle database attributes (@db.Text for MySQL)

## 📝 Notes

- **Never commit** `.env.local` or development database files
- **Always run** `npm run setup:prod` before production deployment
- **Development files** are automatically ignored by git
- **AI features** work identically in both environments
