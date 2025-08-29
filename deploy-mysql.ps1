# PowerShell deployment script for MySQL production
# Run this after setting up your MySQL database in Hostinger

Write-Host "🚀 Deploying Chand-e-Mahtab Blog to MySQL..." -ForegroundColor Green

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ .env.local file not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with your MySQL DATABASE_URL" -ForegroundColor Yellow
    Write-Host "Example: DATABASE_URL='mysql://user:pass@localhost:3306/dbname'" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "🗄️ Generating Prisma client..." -ForegroundColor Blue
npm run db:generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Pushing database schema..." -ForegroundColor Blue
npm run db:push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push database schema" -ForegroundColor Red
    Write-Host "Please check your DATABASE_URL in .env.local" -ForegroundColor Yellow
    exit 1
}

Write-Host "🌱 Seeding database with initial data..." -ForegroundColor Blue
npm run seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Database seeding failed, but continuing..." -ForegroundColor Yellow
}

Write-Host "🔨 Building for production..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Upload the built files to your Hostinger hosting" -ForegroundColor White
Write-Host "2. Set environment variables in Hostinger control panel" -ForegroundColor White
Write-Host "3. Access your blog at your domain" -ForegroundColor White
Write-Host "4. Login to admin at: your-domain.com/admin/login" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed instructions, see MYSQL-DEPLOYMENT.md" -ForegroundColor Yellow
