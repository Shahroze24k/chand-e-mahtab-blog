# How to Add Content to Chand-e-Mahtab Blog

## 🔐 Admin Login

1. **Go to Admin Panel**: http://localhost:3001/admin/login
2. **Password**: `admin123`
3. **Access Dashboard**: http://localhost:3001/admin

## 📝 Adding New Posts (Via Database)

Currently, posts are added via the database. Here's how to add a new post:

### Edit the Seed File

Open `prisma/seed.ts` and add new posts like this:

```typescript
const post3 = await prisma.post.create({
  data: {
    slug: 'your-post-slug',
    titleEn: 'Your English Title',
    titleUr: 'آپ کا اردو عنوان',
    summaryEn: 'English summary of your post...',
    summaryUr: 'آپ کی پوسٹ کا اردو خلاصہ...',
    content: `# Your Post Content

Write your bilingual content here using Markdown.

## English Section
Your English content...

## اردو سیکشن
آپ کا اردو مواد...`,
    tags: 'tag1,tag2,tag3',
    published: true,
    publishedAt: new Date(),
    coverImage: '/images/your-cover.svg', // Optional
  },
});
```

### Re-seed the Database

```powershell
# Navigate to blog directory
cd C:\Users\shahr\chandemahtab\blog

# Run the seed script
$env:DATABASE_URL="file:./dev.db"; npm run seed
```

## ⚙️ Managing Site Settings

1. **Go to**: http://localhost:3001/admin/settings
2. **Edit**:
   - About content (English & Urdu)
   - Social media links
   - Contact information

## 🖼️ Adding Images

1. **Place images in**: `public/images/`
2. **Reference in posts**: `/images/your-image.jpg`
3. **For covers**: Update `coverImage` field in posts

## 💬 Managing Comments

1. **View Comments**: http://localhost:3001/admin/comments (when implemented)
2. **Comments are auto-approved** if they pass spam filters
3. **Manual moderation** available in admin panel

## 📊 Current Available URLs

### Public Pages:
- **Homepage**: http://localhost:3001
- **About**: http://localhost:3001/about
- **Sample Posts**:
  - http://localhost:3001/posts/welcome-to-chand-e-mahtab
  - http://localhost:3001/posts/wisdom-of-rumi

### Admin Pages:
- **Login**: http://localhost:3001/admin/login
- **Dashboard**: http://localhost:3001/admin
- **Settings**: http://localhost:3001/admin/settings

## 🔄 Development Workflow

1. **Start Server**:
   ```powershell
   cd C:\Users\shahr\chandemahtab\blog
   $env:DATABASE_URL="file:./dev.db"; npx next dev
   ```

2. **Add Content** via admin panel or seed script
3. **View Changes** at http://localhost:3001

## 📝 Content Guidelines

### For Bilingual Posts:
- **English Title**: Clear and descriptive
- **Urdu Title**: Use proper RTL text
- **Content**: Mix of English and Urdu sections
- **Tags**: Comma-separated, relevant keywords
- **Images**: Place in `/public/images/` folder

### Markdown Support:
- Headers: `# ## ###`
- Bold: `**text**`
- Italic: `*text*`
- Links: `[text](url)`
- Images: `![alt](url)`
- Blockquotes: `> text`

## 🎨 Adding New Images

Create SVG placeholders like the existing ones:

```svg
<svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#0B5D1E"/>
  <circle cx="400" cy="150" r="60" fill="#F4C430"/>
  <text x="400" y="280" text-anchor="middle" fill="#F4C430" font-family="serif" font-size="28">Your Title</text>
  <text x="400" y="320" text-anchor="middle" fill="#FAFBF8" font-family="serif" font-size="20">آپ کا عنوان</text>
</svg>
```

Save as `/public/images/your-post-cover.svg`
