Write-Host "Starting Chand-e-Mahtab Blog Server..." -ForegroundColor Green
Write-Host ""

# Set environment variable
$env:DATABASE_URL = "file:./dev.db"
Write-Host "DATABASE_URL set to: $env:DATABASE_URL" -ForegroundColor Yellow
Write-Host ""

# Install dependencies if needed
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install
Write-Host ""

# Start development server
Write-Host "Starting development server..." -ForegroundColor Cyan
npm run dev

# Keep window open
Read-Host "Press Enter to exit"
