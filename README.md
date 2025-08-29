# Chand-e-Mahtab Blog

**"Moonlight of knowledge and youth"** - A production-ready, mobile-first bilingual blog supporting English and Urdu content.

## Features

- ✨ **Bilingual Support**: English and Urdu (RTL) with proper typography
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🔍 **Search**: MiniSearch-powered instant search
- 💬 **Comments**: Built-in comment system with anti-spam protection
- 🛡️ **Security**: Simple admin authentication, CSRF protection
- 🚀 **Performance**: Next.js App Router, optimized images
- 📈 **SEO**: Structured data, sitemaps, RSS feeds
- ♿ **Accessibility**: WCAG AA compliant

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Prisma + SQLite (dev) / PostgreSQL (production)
- **Fonts**: Playfair Display (English), Noto Nastaliq Urdu
- **SEO**: next-seo, structured data, sitemaps

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone and navigate to the project:
```bash
cd blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```
Edit `.env.local` with your configuration.

4. Initialize the database:
```bash
npm run db:push
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run seed` - Seed database with sample data

## Admin Access

Access the admin panel at `/admin/login` with the password set in your environment variables.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                # Utilities and configurations
└── types/              # TypeScript type definitions
```

## Environment Variables

See `env.example` for all required environment variables.

## License

Private project - All rights reserved.
