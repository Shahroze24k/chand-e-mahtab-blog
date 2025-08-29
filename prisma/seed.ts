import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.siteMeta.deleteMany();

  // Create site meta
  await prisma.siteMeta.create({
    data: {
      id: 'main',
      aboutEn: `Welcome to Chand-e-Mahtab, where knowledge illuminates like moonlight. This blog explores topics of wisdom, youth, and cultural heritage through both English and Urdu perspectives.

Founded with the vision of bridging traditions and modernity, we share insights that resonate across generations and cultures.`,
      aboutUr: `چاند مہتاب میں خوش آمدید، جہاں علم چاندنی کی طرح روشنی ڈالتا ہے۔ یہ بلاگ انگریزی اور اردو دونوں نقطہ نظر سے حکمت، جوانی، اور ثقافتی ورثے کے موضوعات کو تلاش کرتا ہے۔

روایات اور جدیدیت کو جوڑنے کے وژن کے ساتھ قائم کیا گیا، ہم ایسی بصیرتیں شیئر کرتے ہیں جو نسلوں اور ثقافتوں میں گونجتی ہیں۔`,
      email: 'contact@chandemahab.com',
      facebook: 'https://facebook.com/chandemahab',
      twitter: 'https://twitter.com/chandemahab',
      instagram: 'https://instagram.com/chandemahab',
    },
  });

  // Create sample posts
  const post1 = await prisma.post.create({
    data: {
      slug: 'welcome-to-chand-e-mahtab',
      titleEn: 'Welcome to Chand-e-Mahtab',
      titleUr: 'چاند مہتاب میں خوش آمدید',
      summaryEn: 'Introducing our bilingual blog dedicated to sharing wisdom and cultural insights.',
      summaryUr: 'ہمارے دو لسانی بلاگ کا تعارف جو حکمت اور ثقافتی بصیرتیں شیئر کرنے کے لیے وقف ہے۔',
      content: `# Welcome to Chand-e-Mahtab

**Moonlight of knowledge and youth** - چاند مہتاب

Welcome to our bilingual blog where we explore the intersection of tradition and modernity, wisdom and youth, East and West.

## Our Mission

Through both English and Urdu content, we aim to:

- Share timeless wisdom
- Bridge cultural gaps  
- Inspire thoughtful dialogue
- Celebrate our rich heritage

## What to Expect

You'll find posts covering:

- Philosophy and ethics
- Cultural traditions
- Modern perspectives on classic texts
- Youth and education
- Literary discussions

---

## ہمارا مشن

انگریزی اور اردو دونوں مواد کے ذریعے، ہمارا مقصد یہ ہے:

- لازوال حکمت کا اشتراک
- ثقافتی خلاء کو پاٹنا
- سوچ سمجھ کر بات چیت کی حوصلہ افزائی
- ہماری بھرپور ورثے کا جشن

Thank you for joining us on this journey of discovery.`,
      tags: 'welcome,introduction,bilingual',
      published: true,
      publishedAt: new Date(),
      coverImage: '/images/welcome-cover.svg',
    },
  });

  const post2 = await prisma.post.create({
    data: {
      slug: 'wisdom-of-rumi',
      titleEn: 'The Timeless Wisdom of Rumi',
      titleUr: 'رومی کی لازوال حکمت',
      summaryEn: 'Exploring the profound teachings of the great Sufi poet that continue to inspire millions.',
      summaryUr: 'عظیم صوفی شاعر کی گہری تعلیمات کا جائزہ جو لاکھوں لوگوں کو متاثر کرتی رہتی ہے۔',
      content: `# The Timeless Wisdom of Rumi

Jalal ad-Din Muhammad Rumi, the 13th-century Persian poet and Sufi mystic, continues to inspire readers across cultures and centuries.

## Universal Love

Rumi's central message revolves around universal love and the unity of all beings:

> "Love is the bridge between you and everything."

## The Journey Within

His poetry often speaks of the spiritual journey:

> "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself."

---

# رومی کی لازوال حکمت

جلال الدین محمد رومی، تیرہویں صدی کے فارسی شاعر اور صوفی عارف، صدیوں اور ثقافتوں میں قارئین کو متاثر کرتے رہتے ہیں۔

## عالمگیر محبت

رومی کا بنیادی پیغام عالمگیر محبت اور تمام مخلوقات کی وحدت کے گرد گھومتا ہے۔

## باطنی سفر

ان کی شاعری اکثر روحانی سفر کی بات کرتی ہے۔

The wisdom of Rumi reminds us that true knowledge comes from within.`,
      tags: 'rumi,sufism,poetry,wisdom',
      published: true,
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      coverImage: '/images/rumi-cover.svg',
    },
  });

  // Add the beautiful Chand-e-Mahtab poem
  const post3 = await prisma.post.create({
    data: {
      slug: 'chand-e-mahtab-the-luminous-moonlight',
      titleEn: 'Chand-e-Mahtab: The Luminous Moonlight',
      titleUr: 'چاند مہتاب: روشن چاندنی',
      summaryEn: 'A poetic reflection on Pakistan\'s youth as the true moonlight that illuminates our nation\'s future.',
      summaryUr: 'پاکستان کے نوجوانوں پر ایک شاعرانہ تفکر جو ہمارے ملک کے مستقبل کو روشن کرنے والی حقیقی چاندنی ہیں۔',
      content: `# Chand-e-Mahtab: The Luminous Moonlight

## The True Radiance of Pakistan

"Chand-e-Mahtab" the luminous moonlight, is but a metaphor,  
For the true radiance lies upon the face of this land we call Pakistan.

Where every valley, every mountain, every flowing river,  
Glows like moonlight on a still night.

And the ones who shape this glow into new dawns,  
Are none other than our youth,  
With dreams in their eyes,  
Courage in their hearts,  
and constellations in their ambitions.

## Our Youth: The Living Moonlight

These young souls are no less than the moonlight itself,  
Sometimes in the brilliance of passion,  
Sometimes in the calm glow of determination,  
Sometimes in their smiles,  
And sometimes in the silent prayers they carry.

They are the moons that shine through the darkest nights,  
The beams of hope draped in resolve.

## The Heart of Our Nation

The true beauty of Pakistan  
Is not just in its canals, fields, mountains, or breeze,  
But in these beating, believing hearts  
That turn the soil into stardust,  
And the night into light.

They are our Chand-e-Mahtab,  
The architects of tomorrow,  
And the living poetry of our dreams.

---

*This piece celebrates the youth of Pakistan - the true moonlight that illuminates our path forward, transforming challenges into opportunities and dreams into reality.*`,
      tags: 'pakistan,youth,poetry,moonlight,inspiration,dreams',
      published: true,
      publishedAt: new Date(),
      coverImage: '/images/welcome-cover.svg',
    },
  });

  // Add a sample custom post
  const post4 = await prisma.post.create({
    data: {
      slug: 'first-custom-post',
      titleEn: 'My First Custom Post',
      titleUr: 'میری پہلی حسب ضرورت پوسٹ',
      summaryEn: 'This is my first custom blog post on Chand-e-Mahtab.',
      summaryUr: 'یہ چاند مہتاب پر میری پہلی حسب ضرورت بلاگ پوسٹ ہے۔',
      content: `# My First Custom Post

Welcome to my custom content!

## About This Post

This demonstrates how easy it is to add new bilingual content to the Chand-e-Mahtab blog.

## اس پوسٹ کے بارے میں

یہ دکھاتا ہے کہ چاند مہتاب بلاگ میں نیا دو لسانی مواد شامل کرنا کتنا آسان ہے۔

### Features:
- Bilingual support
- Beautiful typography
- RTL text support
- SEO optimization

Thank you for reading!`,
      tags: 'custom,example,bilingual,test',
      published: true,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      coverImage: '/images/welcome-cover.svg',
    },
  });

  // Add sample comments
  await prisma.comment.createMany({
    data: [
      {
        postId: post1.id,
        name: 'Ahmed Hassan',
        content: 'Beautiful initiative! Looking forward to reading more bilingual content.',
        approved: true,
      },
      {
        postId: post1.id,
        name: 'Sarah Khan',
        content: 'Wonderful to see Urdu literature being celebrated alongside English.',
        approved: true,
      },
      {
        postId: post2.id,
        name: 'Dr. Ali Akbar',
        content: 'Rumi\'s wisdom is indeed timeless. Thank you for this thoughtful piece.',
        approved: true,
      },
      {
        postId: post3.id,
        name: 'Fatima Javed',
        content: 'What a beautiful tribute to our youth! This truly captures the spirit of Pakistan.',
        approved: true,
      },
      {
        postId: post3.id,
        name: 'Muhammad Asif',
        content: 'چاند مہتاب - واقعی ہمارے نوجوان ہی ہماری امید کی کرن ہیں۔ بہترین!',
        approved: false,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📝 Created ${await prisma.post.count()} posts`);
  console.log(`💬 Created ${await prisma.comment.count()} comments`);
  console.log(`⚙️ Created site metadata`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
