import Link from 'next/link';
import Image from 'next/image';
import { formatDate, calculateReadingTime, parseTagsString } from '@/lib/utils';

interface PostCardProps {
  post: {
    id: string;
    slug: string;
    titleEn: string;
    titleUr?: string | null;
    summaryEn?: string | null;
    summaryUr?: string | null;
    content: string;
    coverImage?: string | null;
    tags: string;
    published: boolean;
    publishedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    comments?: { id: string }[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  const tags = parseTagsString(post.tags);
  const readingTime = calculateReadingTime(post.content);
  const publishedDate = post.publishedAt || post.createdAt;

  return (
    <article className="moonlight-card overflow-hidden group">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.titleEn}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      <div className="p-7">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-full hover-scale cursor-pointer transition-all duration-200"
                style={{ 
                  background: index === 0 ? 'var(--gradient-primary)' : 'rgba(11, 93, 30, 0.1)', 
                  color: index === 0 ? 'white' : '#0B5D1E' 
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h2 
            className="font-playfair text-xl md:text-2xl font-bold mb-3 group-hover:text-green-700 transition-colors duration-200 line-clamp-2"
            style={{ color: '#14221C' }}
          >
            {post.titleEn}
          </h2>
        </Link>

        {/* Urdu Title */}
        {post.titleUr && (
          <h3 
            className="font-urdu text-lg mb-3 rtl line-clamp-1"
            style={{ color: 'rgba(20, 34, 28, 0.8)' }}
          >
            {post.titleUr}
          </h3>
        )}

        {/* Summary */}
        {post.summaryEn && (
          <p 
            className="mb-4 line-clamp-3"
            style={{ color: 'rgba(20, 34, 28, 0.7)' }}
          >
            {post.summaryEn}
          </p>
        )}

        {/* Urdu Summary */}
        {post.summaryUr && (
          <p 
            className="font-urdu mb-4 rtl line-clamp-2"
            style={{ color: 'rgba(20, 34, 28, 0.7)' }}
          >
            {post.summaryUr}
          </p>
        )}

        {/* Meta Information */}
        <div 
          className="flex items-center justify-between text-sm"
          style={{ color: 'rgba(20, 34, 28, 0.6)' }}
        >
          <div className="flex items-center space-x-4">
            <time dateTime={publishedDate.toISOString()}>
              {formatDate(publishedDate)}
            </time>
            <span>{readingTime} min read</span>
          </div>

          {/* Comment Count */}
          {post.comments && post.comments.length > 0 && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{post.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
