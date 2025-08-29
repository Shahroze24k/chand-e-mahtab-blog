# CRITICAL: Hostinger Deployment Instructions

## The Issue
Hostinger is looking for `composer.json` (PHP) instead of detecting this as a Node.js project.

## SOLUTION: Manual Hostinger Configuration

### Step 1: Choose the RIGHT Hosting Type
- **DO NOT use "Auto Deploy from Git"** - it's detecting as PHP
- **USE "Node.js App" instead**

### Step 2: Manual Setup in Hostinger
1. Go to Hostinger Control Panel
2. Look for **"Node.js App"** or **"Create Node.js Application"**
3. **NOT** "Auto Deploy from Git"

### Step 3: Application Settings
- **Application URL**: Your domain
- **Application Root**: Leave blank (files are now in repository root)
- **Application Startup File**: `app.js`
- **Node.js Version**: 18 or higher

### Step 4: Deploy Code Manually
After creating the Node.js app:
1. Use Hostinger File Manager or FTP
2. Upload all files from repository to your application directory
3. Or use Git clone directly in Hostinger terminal:
   ```bash
   git clone https://github.com/Shahroze24k/chand-e-mahtab-blog.git .
   ```

### Step 5: Environment Setup
1. Create `.env` file with production settings (copy from `env.production.example`)
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run db:generate`
4. Set up database: `npm run db:deploy`
5. Build application: `npm run build`
6. Start application: `npm start`

## Why Auto Deploy Fails
- Hostinger's auto-deploy scans for project type
- It finds no `composer.json` so assumes it's not a valid project
- Even with `package.json` present, it doesn't recognize Node.js properly

## Alternative: Use Different Directory Setting
If you want to try Auto Deploy again:
1. Repository: `https://github.com/Shahroze24k/chand-e-mahtab-blog`
2. **Directory: LEAVE COMPLETELY BLANK** (since files are now in root)
3. Make sure to select "Node.js" application type if available

The files are now in the repository root, so Hostinger should be able to detect `package.json` at the top level.
