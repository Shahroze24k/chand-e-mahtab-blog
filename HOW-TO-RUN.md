# How to Run Chand-e-Mahtab Blog

## ⚡ Quick Start

Make sure you're in the **blog** directory before running commands:

```bash
# Navigate to the blog directory
cd blog

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

## 📁 Directory Structure

```
chandemahtab/
├── chand-e-mahtab-blog-prompt.md
└── blog/                    ← YOU MUST BE HERE
    ├── package.json        ← This file must exist
    ├── src/
    ├── public/
    └── ...
```

## 🚨 Common Issue

**Error**: `Could not read package.json: Error: ENOENT: no such file or directory`

**Solution**: You're in the wrong directory! Make sure you're in the `blog` folder:

```bash
# If you're in chandemahtab/ (root):
cd blog

# If you're in chandemahtab/blog/public/:
cd ..

# Then run:
npm run dev
```

## 🌐 Development Server

Once running successfully, you'll see:
- **Local**: http://localhost:3000
- **Ready in**: ~2-3 seconds

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run linting
npm run db:push      # Update database schema
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed database with sample data
```

## 🗄️ Database Commands

```bash
# Reset and seed database
npm run db:push
npm run seed
```

## 🎯 Access Points

- **Blog**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login
- **Search**: http://localhost:3000/search
- **About**: http://localhost:3000/about

## 🔧 Troubleshooting

1. **Wrong directory**: Always run commands from `/blog`
2. **Port conflict**: Kill process on port 3000 or use different port
3. **Database issues**: Run `npm run db:push` then `npm run seed`
4. **Module errors**: Delete `node_modules` and run `npm install`
