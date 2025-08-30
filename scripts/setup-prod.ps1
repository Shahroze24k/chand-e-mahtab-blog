#!/usr/bin/env pwsh
# Production Setup Script
# Configures the project for production deployment with MySQL

Write-Host "🚀 Setting up production environment..." -ForegroundColor Cyan

# Restore production schema
Write-Host "📋 Configuring production database schema..." -ForegroundColor Yellow
if (Test-Path "prisma/schema.prod.backup") {
    Copy-Item "prisma/schema.prod.backup" "prisma/schema.prisma" -Force
    Write-Host "✅ Production schema restored from backup" -ForegroundColor Green
} else {
    Write-Host "⚠️  No backup found - schema.prisma should already be production-ready" -ForegroundColor Yellow
}

# Generate Prisma client
Write-Host "🔄 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

Write-Host "✅ Production environment configured!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Remember to:" -ForegroundColor Yellow
Write-Host "   1. Set production environment variables" -ForegroundColor Yellow
Write-Host "   2. Run database migrations: npx prisma db push" -ForegroundColor Yellow
Write-Host "   3. Deploy to your hosting platform" -ForegroundColor Yellow
