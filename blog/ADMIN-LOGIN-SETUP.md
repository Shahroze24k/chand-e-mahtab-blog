# 🔐 Admin Login Setup Guide

## 🚨 Current Login Issue

Your admin login isn't working because environment variables aren't properly configured.

## 🔑 Default Credentials

**If you haven't set up environment variables yet:**
- **URL**: `http://localhost:3000/admin/login`
- **Password**: `admin123`

## ⚙️ Proper Setup

### Step 1: Create Environment File
Create a file called `.env.local` in your `blog` folder:

```env
# Admin Configuration
ADMIN_PASSWORD=your_secure_password_here
NEXTAUTH_SECRET=your_random_jwt_secret_here

# Database Configuration (for production)
DATABASE_URL="mysql://u480111587_adminuser:YOUR_DB_PASSWORD@localhost:3306/u480111587_Main"

# AI Configuration (Optional)
GROQ_API_KEY=your_groq_api_key_here

# Site Configuration
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: Set Your Admin Password
Replace `your_secure_password_here` with a strong password of your choice.

### Step 3: Generate JWT Secret
Replace `your_random_jwt_secret_here` with a random string (like `abc123xyz789def456ghi`).

## 🛠️ Quick Test Steps

### Method 1: Try Default Password
1. Start your development server:
   ```powershell
   cd blog
   npm run dev
   ```
2. Go to: `http://localhost:3000/admin/login`
3. Enter password: `admin123`

### Method 2: Set Up Custom Password
1. Create `.env.local` file with your preferred password
2. Restart the server:
   ```powershell
   # Stop server with Ctrl+C, then restart
   npm run dev
   ```
3. Use your custom password

## 🔍 Troubleshooting

### If login still doesn't work:

1. **Check Browser Console**:
   - Press F12 → Console tab
   - Look for error messages

2. **Check Server Terminal**:
   - Look at the terminal where `npm run dev` is running
   - Check for error messages

3. **Clear Browser Data**:
   - Clear cookies and cache
   - Try in incognito/private window

4. **Verify Environment Variables**:
   ```javascript
   // In browser console, check if variables are loaded
   console.log('Environment check - this should show undefined for security');
   ```

## 🔐 Security Notes

- **Development**: Uses `admin123` as default
- **Production**: MUST set `ADMIN_PASSWORD` environment variable
- **JWT tokens** expire after 24 hours
- **Cookies** are HTTP-only for security

## ✅ Success Indicators

After successful login, you should:
1. See "Login successful" (briefly)
2. Be redirected to `/admin` dashboard
3. See admin navigation menu
4. Have access to create/edit posts

## 🆘 Still Having Issues?

Try this debug approach:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try logging in
4. Check the `/api/admin/login` request
5. Look at the response status and message
