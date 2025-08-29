/**
 * Chand-e-Mahtab Blog Data Export Script
 * Exports all blog data to WordPress-compatible format
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportBlogData() {
  console.log('🚀 Starting Chand-e-Mahtab blog data export...');

  try {
    // Get all data from the database
    const [posts, comments, siteMeta] = await Promise.all([
      prisma.post.findMany({
        include: {
          comments: {
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'asc' }
      }),
      prisma.comment.findMany({
        include: {
          post: {
            select: { slug: true, titleEn: true }
          }
        },
        orderBy: { createdAt: 'asc' }
      }),
      prisma.siteMeta.findFirst()
    ]);

    // Create export directory
    const exportDir = path.join(process.cwd(), 'wordpress-export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Export posts data
    const postsData = posts.map(post => ({
      // WordPress mapping
      wp_post_title: post.titleEn,
      wp_post_content: post.content,
      wp_post_excerpt: post.summaryEn || '',
      wp_post_status: post.published ? 'publish' : 'draft',
      wp_post_date: post.publishedAt || post.createdAt,
      wp_post_slug: post.slug,
      wp_post_type: 'post',
      
      // Custom fields for bilingual content
      meta: {
        title_urdu: post.titleUr || '',
        summary_urdu: post.summaryUr || '',
        cover_image: post.coverImage || '',
        tags: post.tags,
        original_id: post.id,
        created_at: post.createdAt,
        updated_at: post.updatedAt
      },
      
      // Comments
      comments: post.comments.map(comment => ({
        comment_author: comment.name,
        comment_author_email: comment.email || '',
        comment_content: comment.content,
        comment_approved: comment.approved ? 1 : 0,
        comment_date: comment.createdAt,
        comment_meta: {
          ip_hash: comment.ipHash,
          original_id: comment.id
        }
      }))
    }));

    // Export site metadata
    const siteData = {
      site_title: 'Chand-e-Mahtab',
      site_description: 'Moonlight of knowledge and youth - A bilingual blog',
      about_english: siteMeta?.aboutEn || '',
      about_urdu: siteMeta?.aboutUr || '',
      social_links: {
        facebook: siteMeta?.facebook || '',
        twitter: siteMeta?.twitter || '',
        instagram: siteMeta?.instagram || '',
        linkedin: siteMeta?.linkedin || '',
        youtube: siteMeta?.youtube || '',
        email: siteMeta?.email || '',
        phone: siteMeta?.phone || ''
      }
    };

    // Create WordPress XML export (WXR format)
    const wxrContent = generateWXR(postsData, siteData);
    
    // Write files
    fs.writeFileSync(
      path.join(exportDir, 'posts-export.json'), 
      JSON.stringify(postsData, null, 2)
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'site-data.json'), 
      JSON.stringify(siteData, null, 2)
    );
    
    fs.writeFileSync(
      path.join(exportDir, 'wordpress-import.xml'), 
      wxrContent
    );

    // Generate migration summary
    const summary = {
      export_date: new Date().toISOString(),
      total_posts: posts.length,
      published_posts: posts.filter(p => p.published).length,
      draft_posts: posts.filter(p => !p.published).length,
      total_comments: comments.length,
      approved_comments: comments.filter(c => c.approved).length,
      pending_comments: comments.filter(c => !c.approved).length,
      bilingual_posts: posts.filter(p => p.titleUr).length,
      media_files: posts.filter(p => p.coverImage).map(p => p.coverImage),
      tags: [...new Set(posts.flatMap(p => p.tags.split(',').map(t => t.trim()).filter(t => t)))]
    };

    fs.writeFileSync(
      path.join(exportDir, 'migration-summary.json'), 
      JSON.stringify(summary, null, 2)
    );

    console.log('✅ Export completed successfully!');
    console.log(`📊 Exported ${posts.length} posts, ${comments.length} comments`);
    console.log(`📁 Files saved to: ${exportDir}`);
    console.log(`🔤 Bilingual posts: ${summary.bilingual_posts}/${posts.length}`);
    
    return { postsData, siteData, summary };

  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function generateWXR(posts, siteData) {
  const now = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">

<channel>
  <title>Chand-e-Mahtab</title>
  <link>https://chandemahab.com</link>
  <description>Moonlight of knowledge and youth</description>
  <pubDate>${now}</pubDate>
  <language>en-US</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>https://chandemahab.com</wp:base_site_url>
  <wp:base_blog_url>https://chandemahab.com</wp:base_blog_url>

  ${posts.map(post => `
  <item>
    <title><![CDATA[${post.wp_post_title}]]></title>
    <link>https://chandemahab.com/posts/${post.wp_post_slug}</link>
    <pubDate>${new Date(post.wp_post_date).toUTCString()}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">https://chandemahab.com/?p=${Date.now()}</guid>
    <description></description>
    <content:encoded><![CDATA[${post.wp_post_content}]]></content:encoded>
    <excerpt:encoded><![CDATA[${post.wp_post_excerpt}]]></excerpt:encoded>
    <wp:post_id>${Date.now()}</wp:post_id>
    <wp:post_date><![CDATA[${new Date(post.wp_post_date).toISOString().slice(0, 19).replace('T', ' ')}]]></wp:post_date>
    <wp:post_date_gmt><![CDATA[${new Date(post.wp_post_date).toISOString().slice(0, 19).replace('T', ' ')}]]></wp:post_date_gmt>
    <wp:comment_status><![CDATA[open]]></wp:comment_status>
    <wp:ping_status><![CDATA[open]]></wp:ping_status>
    <wp:post_name><![CDATA[${post.wp_post_slug}]]></wp:post_name>
    <wp:status><![CDATA[${post.wp_post_status}]]></wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type><![CDATA[post]]></wp:post_type>
    <wp:post_password><![CDATA[]]></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    
    ${Object.entries(post.meta).map(([key, value]) => `
    <wp:postmeta>
      <wp:meta_key><![CDATA[${key}]]></wp:meta_key>
      <wp:meta_value><![CDATA[${value}]]></wp:meta_value>
    </wp:postmeta>`).join('')}
    
    ${post.comments.map((comment, idx) => `
    <wp:comment>
      <wp:comment_id>${Date.now() + idx}</wp:comment_id>
      <wp:comment_author><![CDATA[${comment.comment_author}]]></wp:comment_author>
      <wp:comment_author_email><![CDATA[${comment.comment_author_email}]]></wp:comment_author_email>
      <wp:comment_author_url></wp:comment_author_url>
      <wp:comment_author_IP></wp:comment_IP>
      <wp:comment_date><![CDATA[${new Date(comment.comment_date).toISOString().slice(0, 19).replace('T', ' ')}]]></wp:comment_date>
      <wp:comment_date_gmt><![CDATA[${new Date(comment.comment_date).toISOString().slice(0, 19).replace('T', ' ')}]]></wp:comment_date_gmt>
      <wp:comment_content><![CDATA[${comment.comment_content}]]></wp:comment_content>
      <wp:comment_approved><![CDATA[${comment.comment_approved}]]></wp:comment_approved>
      <wp:comment_type><![CDATA[]]></wp:comment_type>
      <wp:comment_parent>0</wp:comment_parent>
      <wp:comment_user_id>0</wp:comment_user_id>
    </wp:comment>`).join('')}
  </item>`).join('')}

</channel>
</rss>`;
}

// Run the export
if (require.main === module) {
  exportBlogData()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { exportBlogData };
