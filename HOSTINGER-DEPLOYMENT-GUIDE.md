# Hostinger Deployment Guide

## Prerequisites

Before deploying to Hostinger, ensure you have:

1. A Hostinger hosting account with Node.js support
2. A MySQL database created in your Hostinger control panel
3. Your GitHub repository properly configured
4. All required environment variables

## Step 1: Fix Git Repository URL

❌ **WRONG:** `https://github.com/Shahroze24k/chand-e-mahtab-blog#`

✅ **CORRECT:** `https://github.com/Shahroze24k/chand-e-mahtab-blog`

**Remove the `#` at the end of your repository URL in the Hostinger deployment form.**

## Step 2: Set Up MySQL Database

1. Log into your Hostinger control panel
2. Go to **Databases** → **MySQL Databases**
3. Create a new database or use an existing one
4. Note down these details:
   - Database name
   - Username
   - Password
   - Hostname (usually localhost or your domain)
   - Port (usually 3306)

## Step 3: Configure Environment Variables

Copy the contents of `env.production.example` and create a `.env` file on your server with these values:

```bash
# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password_here

# AI Configuration (Get your free API key from console.groq.com)
GROQ_API_KEY=your_groq_api_key_here

# Site Configuration
SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Database Configuration - MySQL (Hostinger)
DATABASE_URL="mysql://your_db_username:your_db_password@your_db_host:3306/your_db_name"

# For JWT/Session management
NEXTAUTH_SECRET=your_nextauth_secret_key_generate_a_long_random_string
NEXTAUTH_URL=https://yourdomain.com

# Production Node Environment
NODE_ENV=production
```

### Environment Variable Details:

- **ADMIN_PASSWORD**: Your admin login password (choose a strong password)
- **GROQ_API_KEY**: Get free API key from [console.groq.com](https://console.groq.com)
- **DATABASE_URL**: Replace with your actual MySQL credentials from Step 2
- **NEXTAUTH_SECRET**: Generate a random 32+ character string
- **SITE_URL & NEXT_PUBLIC_SITE_URL**: Your actual domain (e.g., https://chandemahtab.com)

## Step 4: Deploy from GitHub

### Important: Hostinger Node.js Setup

⚠️ **Make sure you're using Node.js hosting, not PHP hosting!**

1. In Hostinger control panel, go to **Website** → **Auto Deploy from Git**
2. **Make sure "Node.js" is selected as the application type**
3. Enter repository URL: `https://github.com/Shahroze24k/chand-e-mahtab-blog`
4. Branch: `master` (or `main` if that's your default branch)
5. Directory: `blog` (this is crucial - the Node.js app is in the blog folder)
6. Click **Create**

### If Hostinger Still Detects as PHP:

If Hostinger is still looking for composer.json/composer.lock files, it means it's treating this as a PHP project. You need to:

1. **Change hosting type**: Go to Hostinger control panel → Website settings → Change to "Node.js" hosting
2. **Or create a new Node.js application**: Instead of "Auto Deploy from Git", look for "Node.js App" option
3. **Ensure the directory is set to `blog`** where package.json is located

## Step 5: Post-Deployment Setup

After successful deployment, run these commands in your Hostinger terminal or through their control panel:

```bash
# Navigate to your project directory
cd /path/to/your/project

# Install dependencies (if not auto-installed)
npm install

# Generate Prisma client
npm run db:generate

# Push database schema and seed data
npm run db:deploy

# Build the application (if not auto-built)
npm run build
```

## Step 6: Verify Deployment

1. Visit your website URL
2. Test the homepage loads correctly
3. Go to `/admin/login` and test admin login
4. Create a test post to verify database connectivity
5. Test the search functionality

## Troubleshooting

### Common Issues:

1. **"Database connection failed"**
   - Verify your DATABASE_URL in the .env file
   - Check MySQL credentials in Hostinger control panel
   - Ensure the database exists

2. **"Build failed"**
   - Check Node.js version compatibility (16+ required)
   - Verify all dependencies are listed in package.json

3. **"Admin login not working"**
   - Check ADMIN_PASSWORD in .env file
   - Verify NEXTAUTH_SECRET is set

4. **"AI features not working"**
   - Verify GROQ_API_KEY is correctly set
   - Check API key is active at console.groq.com

### Support Commands:

```bash
# Check database connection
npm run db:studio

# View logs
npm run start

# Reset database (careful!)
npm run db:push --force-reset
npm run seed
```

## Directory Structure for Deployment

**IMPORTANT**: Your Node.js application files are in the `blog` folder, so you MUST set:
- **Directory**: `blog`

This tells Hostinger to look for `package.json` in the `blog` folder, not the repository root.

### Alternative Solution - Move Files to Root

If you continue having issues, you can move all files from the `blog` folder to your repository root:

```bash
# In your local repository
mv blog/* .
mv blog/.* . 2>/dev/null || true
rmdir blog
git add .
git commit -m "Move blog files to repository root for Hostinger deployment"
git push origin master
```

Then set Directory to empty/blank in Hostinger.

## Security Notes

- Never commit .env files to Git
- Use strong passwords for ADMIN_PASSWORD
- Keep your GROQ_API_KEY private
- Generate a unique NEXTAUTH_SECRET for each deployment

## Next Steps

After successful deployment:

1. Set up SSL certificate (usually auto-configured by Hostinger)
2. Configure domain DNS if using custom domain
3. Set up regular backups for your MySQL database
4. Monitor application logs for any issues
