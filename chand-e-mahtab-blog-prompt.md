# Build “Chand-e-Mahtab” Blog

You are an expert full-stack developer. Build a production-ready, mobile-first blog site called **“Chand-e-Mahtab”** for my father to easily add posts and photos. It must be simple to manage, fast, secure, and SEO-friendly. Deliver it in **small, verifiable steps**. After each step, show the updated file tree and how to run/test locally on Cursor.

---

## 01) Tech Choices

- **Framework:** Next.js (App Router) + TypeScript  
- **Styling:** Tailwind CSS  
- **Fonts:**  
  - English → a serif similar to *Ourova* (use **Playfair Display** or **Fraunces** as fallback)  
  - Urdu → **Noto Nastaliq Urdu** (RTL support)  
- **Database:** Prisma + SQLite (default), with optional Supabase Postgres for deployment  
- **Admin Auth:** Single password from ENV (very simple for an elderly user)  
- **Rich Text Editor:** TipTap or React-Quill with image upload  
- **Images/Storage:** Local for dev; abstract via `lib/storage.ts` so we can switch to Supabase later  
- **Comments:** Stored in DB; no login required; basic anti-spam  
- **Search:** MiniSearch index + server route to regenerate  
- **SEO:** next-seo, `sitemap.xml`, `robots.txt`, RSS feed, JSON-LD (Blog & BlogPosting)  
- **Accessibility:** WCAG AA—focus states, labels, ARIA where needed  
- **Testing:** Playwright smoke tests + ESLint/Prettier

**Color tokens (add as CSS variables via Tailwind config or globals):**
```css
:root {
  --brand-green: #0B5D1E;
  --brand-gold:  #F4C430;
  --ink:         #14221C;
  --bg:          #FAFBF8;
}
```

Logo placeholder path: `/public/logo.svg` (will replace later).

---

## 02) Project Setup

### Step A — Scaffold & Basics
- Scaffold Next.js + TypeScript + Tailwind.  
- Add `next-seo` and create `next-seo.config.ts`.  
- Add Google Fonts: **Playfair Display** (English), **Noto Nastaliq Urdu** (Urdu).  
- Implement global layout with font classes and color tokens.  
- Create pages/routes: **Home**, **Post (dynamic)**, **About**, **Admin (protected)**, **404**.

**Deliverables**
- `README.md` with run instructions.  
- `.env.example` with:
  - `ADMIN_PASSWORD`  
  - `SITE_URL`  
  - `SUPABASE_URL`  
  - `SUPABASE_ANON_KEY` (optional)  

### Step B — Database Schema
- Define Prisma schema with models `Post`, `Comment`, `SiteMeta`.  
- Seed script with 2 sample posts + empty socials.  
- Provide `npm run db:push` and `npm run seed`.

---

## 03) UI & Pages

### Step C — Home Page
- Hero with logo, site name, tagline (“Moonlight of knowledge and youth”).  
- List of latest posts (cover, title EN, Urdu subtitle, date, tags).  
- Search box (MiniSearch).  
- Footer: socials from `SiteMeta` + copyright.  

### Step D — Post Page
- Title EN, Urdu beneath (RTL).  
- Cover, date, reading time.  
- Content styled for Urdu + images + blockquotes.  
- SEO: JSON-LD `BlogPosting`.  
- Comments section:  
  - Name + Comment only  
  - Profanity filter, link limit, honeypot, time-to-submit, IP rate limit  
  - Auto-approve if clean  
  - Admin toggle  

### Step E — About Page
- Content pulled from `SiteMeta`.  
- Urdu support (RTL).  
- Social links shown.  

---

## 04) Admin (Simple for My Father)

### Step F — Dashboard
- `/admin/login` → one password from ENV.  
- `/admin` dashboard cards:  
  - New Post  
  - Posts  
  - Comments  
  - About & Socials  
  - Help  

### Step G — Posts
- Fields: title EN/Ur, summary EN/Ur, tags, published checkbox.  
- Rich text editor with image upload (`lib/storage.ts`).  
- Auto-slug from EN title (editable).  
- Save/Update with inline preview.  

### Step H — Comments Moderation
- Table with filters.  
- Approve / Delete actions.  
- Optional email notification stub.  

### Step I — About & Socials
- WYSIWYG for About EN/Ur.  
- Inputs for socials.  
- Save to `SiteMeta`.  

**Accessibility**  
- Large font toggle (localStorage).  
- High contrast toggle.  

---

## 05) Search & SEO

### Step J — Search
- MiniSearch index on published posts.  
- `/api/search-index.json` for client search.  

### Step K — SEO
- `next-seo` defaults (title templates, canonical).  
- `sitemap.xml`, `robots.txt`, `feed.xml`.  
- Open Graph images per post.  
- JSON-LD for site and posts.  
- Lighthouse ≥ 90 (Performance/SEO/Best-Practices).  

---

## 06) Comments Anti-Spam
- Use `bad-words` + Urdu/English slur list.  
- Reject if:  
  - Honeypot has value  
  - Submitted < 2s  
  - >1 URL  
  - Contains blocked words  
- Rate limit: 3 per hour by IP hash.  
- Store all attempts but only approved comments render.  

---

## 07) Navigation & Footer
- Header: Logo, Home, About, Search.  
- Sticky mobile nav.  
- Footer: socials + © year.  

---

## 08) Internationalization & Typography
- English headings: Playfair Display (or Fraunces).  
- Urdu: Noto Nastaliq Urdu with `dir="rtl"`.  
- Add `.rtl { direction: rtl; font-family: 'Noto Nastaliq Urdu'; }`.  

---

## 09) Security & Config
- No client-side secrets.  
- Admin routes protected by server middleware.  
- CSRF protection.  
- DOMPurify for content.  
- Upload limit 5MB; resize images to 1600px.  

---

## 10) Tests & DX
- Playwright tests:  
  - Home renders posts  
  - Search works  
  - Post renders + comment validates  
  - Admin login + create post  
- ESLint/Prettier setup.  

---

## 11) Deployment & Docs
- `DEPLOY.md` with:  
  - Cursor run instructions  
  - Optional Vercel deploy  
  - Env vars  
  - GoDaddy domain setup  
- `DAD-GUIDE.md` with screenshots:  
  - Login  
  - Create/Edit Post  
  - Upload pictures  
  - Approve comments  
  - Edit About/Socials  
- `/.well-known/security.txt`  

---

## 12) Handoff
Final deliverables:  
- Full source  
- `.env.example`  
- `README.md`, `DEPLOY.md`, `DAD-GUIDE.md`  
- Seeded DB + sample images  

**Summarize:**  
- All routes  
- All env vars  
- How to switch to Supabase  
- How to export/import posts JSON  
