# How to Start the Chand-e-Mahtab Blog Server

## Quick Start Commands

1. **Open PowerShell/Terminal**

2. **Navigate to the blog directory:**
   ```powershell
   cd C:\Users\shahr\chandemahtab\blog
   ```

3. **Start the development server:**
   ```powershell
   $env:DATABASE_URL="file:./dev.db"; npx next dev
   ```

4. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

## Alternative Commands

If the above doesn't work, try:

```powershell
# Method 1: Using npm
$env:DATABASE_URL="file:./dev.db"; npm run dev

# Method 2: Without Turbopack (if there are issues)
$env:DATABASE_URL="file:./dev.db"; npx next dev

# Method 3: Set environment variable separately
$env:DATABASE_URL="file:./dev.db"
npx next dev
```

## Troubleshooting

- **Error: Cannot find package.json**: You're in the wrong directory. Make sure you're in `chandemahtab\blog`
- **Server hangs after "Ready"**: This is normal! The server is waiting for requests. Just open http://localhost:3000
- **TypeScript errors**: Run `npx tsc --noEmit` to check for compilation issues

## Project Structure

```
chandemahtab/
├── chand-e-mahtab-blog-prompt.md
└── blog/                    ← YOU NEED TO BE HERE!
    ├── package.json
    ├── src/
    ├── prisma/
    └── public/
```

## What You Should See

When successful, you'll see:
- ✓ Ready in ~2000ms
- Local: http://localhost:3000
- The beautiful bilingual blog homepage with Urdu and English content
