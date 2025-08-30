#!/usr/bin/env pwsh
# Development Setup Script
# Configures the project for local development with SQLite

Write-Host "🔧 Setting up development environment..." -ForegroundColor Cyan

# Backup production schema and copy development schema
Write-Host "📋 Configuring development database schema..." -ForegroundColor Yellow
if (!(Test-Path "prisma/schema.prod.backup")) {
    Copy-Item "prisma/schema.prisma" "prisma/schema.prod.backup" -Force
}
Copy-Item "prisma/schema.dev.prisma" "prisma/schema.prisma" -Force

# Generate Prisma client
Write-Host "🔄 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Create/update database
Write-Host "🗄️ Setting up SQLite database..." -ForegroundColor Yellow
npx prisma db push

# Seed database if empty
Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
npx prisma db seed

Write-Host "✅ Development environment ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Ready! Run npm run dev:start to start the development server" -ForegroundColor Magenta
