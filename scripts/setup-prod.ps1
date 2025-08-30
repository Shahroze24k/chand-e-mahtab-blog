#!/usr/bin/env pwsh
# Production Setup Script
# Configures the project for production deployment with MySQL

Write-Host "🚀 Setting up production environment..." -ForegroundColor Cyan

# Copy production schema
Write-Host "📋 Configuring production database schema..." -ForegroundColor Yellow
Copy-Item "prisma/schema.prod.prisma" "prisma/schema.prisma" -Force

# Generate Prisma client
Write-Host "🔄 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

Write-Host "✅ Production environment configured!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Remember to:" -ForegroundColor Yellow
Write-Host "   1. Set production environment variables" -ForegroundColor Yellow
Write-Host "   2. Run database migrations: npx prisma db push" -ForegroundColor Yellow
Write-Host "   3. Deploy to your hosting platform" -ForegroundColor Yellow
