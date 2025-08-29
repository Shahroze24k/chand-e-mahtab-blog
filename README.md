# 🌙 Chand-e-Mahtab Blog

**"Moonlight of knowledge and youth"** - A production-ready bilingual blog platform supporting English and Urdu content with full RTL (Right-to-Left) support.

![Chand-e-Mahtab Logo](public/logo.svg)

## ✨ Features

### 🌐 **Bilingual Support**
- **English & Urdu** content with proper typography
- **RTL (Right-to-Left)** text support for Urdu
- **Cultural sensitivity** for Islamic content
- **Seamless language switching**

### 📱 **Modern Design**
- **Mobile-first** responsive design
- **Beautiful typography** (Playfair Display + Noto Nastaliq Urdu)
- **Brand colors**: Deep Green (#0B5D1E) & Golden Yellow (#F4C430)
- **12 themed banners** for blog posts
- **Accessibility compliant** (WCAG AA)

### 🛡️ **Admin Features**
- **Rich text editor** with TipTap
- **Document import** (Word/PDF support)
- **Image upload** and management
- **Banner selection** interface
- **Draft/publish** workflow
- **Comment moderation**

### 🔍 **Advanced Functionality**
- **Full-text search** in both languages
- **Social sharing** (Twitter, Facebook, WhatsApp, LinkedIn, Telegram)
- **Comment system** with anti-spam protection
- **SEO optimization** with structured data
- **RSS feeds** and sitemaps

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Prisma + SQLite (dev) / PostgreSQL (production)
- **Editor**: TipTap with document import
- **Authentication**: Simple admin auth with JWT
- **Fonts**: Playfair Display (English), Noto Nastaliq Urdu

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/YOUR-USERNAME/chand-e-mahtab-blog.git
cd chand-e-mahtab-blog
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp env.example .env.local
```
Edit `.env.local` with your configuration.

4. **Initialize the database**:
```bash
npm run db:push
npm run seed
```

5. **Start the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages & API routes
│   ├── admin/          # Admin panel pages
│   ├── api/            # API endpoints
│   ├── posts/          # Blog post pages
│   └── search/         # Search functionality
├── components/          # Reusable React components
│   ├── admin/          # Admin-specific components
│   └── ...             # General components
├── lib/                # Utilities and configurations
└── types/              # TypeScript type definitions

public/
├── banners/            # 12 themed banner designs
├── images/             # Blog images and media
└── logo.svg            # Brand logo

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Sample data
```

## 🎨 Banner Collection

12 beautiful themed banners for different types of content:

- 📚 **Knowledge & Learning** - Educational content
- 🌿 **Wisdom & Reflection** - Philosophical posts
- 🕌 **Culture & Tradition** - Cultural discussions
- ⚡ **Youth & Energy** - Motivational content
- 🏛️ **Heritage & History** - Historical topics
- 🔧 **Modern & Contemporary** - Tech and innovation
- 🌱 **Nature & Environment** - Environmental content
- 🗻 **Landscape & Scenery** - Travel and geography
- 📐 **Geometric & Patterns** - Design and mathematics
- ⭐ **Celestial & Stars** - Astronomy and spiritual
- 🎨 **Artistic & Creative** - Art and creativity
- ✨ **Minimal & Clean** - Simple and elegant

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed database with sample data
```

## 🌐 Admin Access

Access the admin panel at `/admin/login` with the password set in your environment variables.

**Admin Features**:
- Create/edit blog posts
- Manage comments and moderation
- Upload images and documents
- Configure site settings
- Select banners for posts

## 🔍 Search Functionality

- **Bilingual search** across English and Urdu content
- **Full-text search** in titles, content, summaries, and tags
- **Instant results** with beautiful UI
- **Category filtering** and suggestions

## 📱 Social Sharing

Built-in sharing for:
- **Twitter** - Tweet with title and link
- **Facebook** - Direct page sharing
- **WhatsApp** - Mobile-friendly messaging
- **LinkedIn** - Professional network sharing
- **Telegram** - Secure messaging
- **Copy Link** - Universal compatibility
- **Native Share** - Mobile device integration

## 🌙 Cultural Design

This blog is designed with cultural sensitivity for Islamic content:
- **Appropriate color palette** (green and gold)
- **RTL text support** for Arabic script
- **Cultural motifs** in banner designs
- **Respectful typography** choices

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Full-stack deployment support
- **Railway**: Database + app hosting
- **DigitalOcean**: VPS deployment

## 📄 License

Private project - All rights reserved.

---

## 🤝 Contributing

This is a personal blog platform, but suggestions and improvements are welcome through issues and pull requests.

## 📧 Contact

For questions about this blog platform, please open an issue or reach out through the contact form on the live site.

---

**Built with ❤️ for the bilingual community** 🌍