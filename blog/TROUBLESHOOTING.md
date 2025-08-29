# Troubleshooting Chand-e-Mahtab Blog

## 🚨 Common Issues & Solutions

### Issue 1: Posts Return 404 Error

**Symptoms**: Individual post pages show 404 error

**Solutions**:

1. **Check if server is running:**
   ```powershell
   netstat -an | findstr ":3000"
   ```

2. **Verify database has posts:**
   - Visit: http://localhost:3000/api/debug/posts
   - Should show JSON with posts

3. **Re-seed database:**
   ```powershell
   cd C:\Users\shahr\chandemahtab\blog
   $env:DATABASE_URL="file:./dev.db"; npm run seed
   ```

4. **Restart server:**
   ```powershell
   # Kill all Node processes
   Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
   
   # Start fresh
   $env:DATABASE_URL="file:./dev.db"; npx next dev
   ```

### Issue 2: Internal Server Error

**Solutions**:

1. **Check TypeScript errors:**
   ```powershell
   npx tsc --noEmit
   ```

2. **Check database connection:**
   ```powershell
   $env:DATABASE_URL="file:./dev.db"; npx prisma db push
   ```

3. **Clear Next.js cache:**
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

### Issue 3: Directory Problems

**Problem**: Running commands from wrong directory

**Solution**: Always run from blog directory:
```powershell
cd C:\Users\shahr\chandemahtab\blog
# Then run your commands
```

### Issue 4: Port Conflicts

**Solution**: Use different port:
```powershell
$env:DATABASE_URL="file:./dev.db"; npx next dev -p 3001
```

## 🔍 Quick Checks

### 1. Verify Posts Exist:
Visit: http://localhost:3000/api/debug/posts

### 2. Test Homepage:
Visit: http://localhost:3000 (should show posts)

### 3. Check Admin:
Visit: http://localhost:3000/admin/login

### 4. Database Studio:
```powershell
$env:DATABASE_URL="file:./dev.db"; npx prisma studio
```
Visit: http://localhost:5555

## 📱 Correct URLs

- Homepage: http://localhost:3000
- Post 1: http://localhost:3000/posts/welcome-to-chand-e-mahtab
- Post 2: http://localhost:3000/posts/wisdom-of-rumi
- Post 3: http://localhost:3000/posts/first-custom-post
- About: http://localhost:3000/about
- Admin: http://localhost:3000/admin/login

## 🆘 Emergency Reset

If everything breaks:

```powershell
# 1. Kill all processes
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# 2. Navigate to correct directory
cd C:\Users\shahr\chandemahtab\blog

# 3. Reset database
Remove-Item dev.db -ErrorAction SilentlyContinue
$env:DATABASE_URL="file:./dev.db"; npx prisma db push
$env:DATABASE_URL="file:./dev.db"; npm run seed

# 4. Clear cache and restart
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
$env:DATABASE_URL="file:./dev.db"; npx next dev
```
