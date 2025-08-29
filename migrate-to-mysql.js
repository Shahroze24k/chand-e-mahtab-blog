// Migration script to move data from SQLite to MySQL
// Run this if you have existing data in SQLite that you want to migrate

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function migrateData() {
  console.log('🔄 Starting data migration from SQLite to MySQL...');

  // Check if SQLite database exists
  const sqliteDbPath = path.join(__dirname, 'prisma', 'dev.db');
  if (!fs.existsSync(sqliteDbPath)) {
    console.log('ℹ️ No SQLite database found. Starting fresh with MySQL.');
    return;
  }

  // Backup SQLite data first
  console.log('💾 Creating backup of SQLite data...');
  
  // Initialize SQLite Prisma client
  const sqlitePrisma = new PrismaClient({
    datasources: {
      db: {
        url: 'file:./dev.db'
      }
    }
  });

  // Initialize MySQL Prisma client (uses DATABASE_URL from env)
  const mysqlPrisma = new PrismaClient();

  try {
    // Fetch all data from SQLite
    console.log('📖 Reading data from SQLite...');
    
    const posts = await sqlitePrisma.post.findMany({
      include: {
        comments: true
      }
    });
    
    const siteMeta = await sqlitePrisma.siteMeta.findUnique({
      where: { id: 'main' }
    });

    console.log(`Found ${posts.length} posts and ${posts.reduce((acc, post) => acc + post.comments.length, 0)} comments`);

    // Clear MySQL database first
    console.log('🗑️ Clearing MySQL database...');
    await mysqlPrisma.comment.deleteMany();
    await mysqlPrisma.post.deleteMany();
    await mysqlPrisma.siteMeta.deleteMany();

    // Migrate site meta
    if (siteMeta) {
      console.log('📝 Migrating site metadata...');
      await mysqlPrisma.siteMeta.create({
        data: {
          id: siteMeta.id,
          aboutEn: siteMeta.aboutEn,
          aboutUr: siteMeta.aboutUr,
          facebook: siteMeta.facebook,
          twitter: siteMeta.twitter,
          instagram: siteMeta.instagram,
          linkedin: siteMeta.linkedin,
          youtube: siteMeta.youtube,
          email: siteMeta.email,
          phone: siteMeta.phone,
        }
      });
    }

    // Migrate posts and comments
    for (const post of posts) {
      console.log(`📄 Migrating post: ${post.titleEn}`);
      
      // Create post
      const newPost = await mysqlPrisma.post.create({
        data: {
          id: post.id,
          slug: post.slug,
          titleEn: post.titleEn,
          titleUr: post.titleUr,
          summaryEn: post.summaryEn,
          summaryUr: post.summaryUr,
          content: post.content,
          coverImage: post.coverImage,
          tags: post.tags,
          published: post.published,
          publishedAt: post.publishedAt,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        }
      });

      // Migrate comments
      for (const comment of post.comments) {
        await mysqlPrisma.comment.create({
          data: {
            id: comment.id,
            name: comment.name,
            email: comment.email,
            content: comment.content,
            approved: comment.approved,
            createdAt: comment.createdAt,
            ipHash: comment.ipHash,
            postId: newPost.id,
          }
        });
      }
    }

    console.log('✅ Data migration completed successfully!');
    console.log(`✨ Migrated ${posts.length} posts and their comments to MySQL`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('💡 Make sure your MySQL DATABASE_URL is correct in .env.local');
  } finally {
    await sqlitePrisma.$disconnect();
    await mysqlPrisma.$disconnect();
  }
}

// Run migration
migrateData()
  .catch(console.error);
