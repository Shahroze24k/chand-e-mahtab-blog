import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getSiteMeta } from '@/lib/db';
import { formatDate, calculateReadingTime, parseTagsString, processPostContent } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';
import ShareButtons from '@/components/ShareButtons';
import TranslationWidget from '@/components/TranslationWidget';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.titleEn,
    description: post.summaryEn || post.titleEn,
    openGraph: {
      title: post.titleEn,
      description: post.summaryEn || post.titleEn,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, siteMeta] = await Promise.all([
    getPostBySlug(slug),
    getSiteMeta(),
  ]);

  if (!post || !post.published) {
    notFound();
  }

  const tags = parseTagsString(post.tags);
  const readingTime = calculateReadingTime(post.content);
  const publishedDate = post.publishedAt || post.createdAt;
  
  // Process content (convert markdown to HTML if needed)
  const contentHtml = processPostContent(post.content);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
              <li>
                <Link href="/" className="hover:opacity-80">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium" style={{ color: '#14221C' }}>
                {post.titleEn}
              </li>
            </ol>
          </nav>

          {/* Post Header */}
          <header className="mb-8">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ 
                      backgroundColor: 'rgba(11, 93, 30, 0.1)', 
                      color: '#0B5D1E' 
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* English Title */}
            <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-4" style={{ color: '#14221C' }}>
              {post.titleEn}
            </h1>

            {/* Urdu Title */}
            {post.titleUr && (
              <h2 
                className="font-urdu text-2xl md:text-3xl mb-6 rtl" 
                style={{ color: 'rgba(20, 34, 28, 0.8)' }}
              >
                {post.titleUr}
              </h2>
            )}

            {/* Meta Information */}
            <div 
              className="flex flex-wrap items-center gap-4 text-sm mb-8 pb-8 border-b"
              style={{ 
                color: 'rgba(20, 34, 28, 0.6)',
                borderColor: 'rgba(20, 34, 28, 0.1)'
              }}
            >
              <time dateTime={publishedDate.toISOString()}>
                {formatDate(publishedDate)}
              </time>
              <span>•</span>
              <span>{readingTime} min read</span>
              {post.comments && post.comments.length > 0 && (
                <>
                  <span>•</span>
                  <span>{post.comments.length} comments</span>
                </>
              )}
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.titleEn}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* English Summary */}
          {post.summaryEn && (
            <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(11, 93, 30, 0.05)' }}>
              <p className="text-lg italic" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
                {post.summaryEn}
              </p>
            </div>
          )}

          {/* Urdu Summary */}
          {post.summaryUr && (
            <div className="mb-8 p-6 rounded-lg rtl" style={{ backgroundColor: 'rgba(11, 93, 30, 0.05)' }}>
              <p className="font-urdu text-lg italic" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
                {post.summaryUr}
              </p>
            </div>
          )}

          {/* Post Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            style={{ color: '#14221C' }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* AI Translation Widget */}
          <div className="mb-8">
            <TranslationWidget 
              text={post.content.substring(0, 1000)} 
              className="border-t pt-6"
            />
          </div>

          {/* Share Section */}
          <div className="mb-12 p-6 rounded-lg" style={{ backgroundColor: '#FAFBF8' }}>
            <ShareButtons 
              title={post.titleEn}
              summary={post.summaryEn || undefined}
            />
          </div>
        </article>

        {/* Comments Section */}
        <CommentSection postId={post.id} comments={post.comments || []} />
      </main>

      <Footer siteMeta={siteMeta} />
    </div>
  );
}
