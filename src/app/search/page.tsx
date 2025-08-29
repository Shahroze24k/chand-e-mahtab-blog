'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBox from '@/components/SearchBox';
import PostCard from '@/components/PostCard';

interface SearchResult {
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
  _count: { comments: number };
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  count: number;
  error?: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data: SearchResponse = await response.json();

      if (response.ok) {
        setResults(data.results);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="text-center mb-12">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4" style={{ color: '#14221C' }}>
          Search Posts
        </h1>
        <h2 className="font-urdu text-xl md:text-2xl rtl mb-6" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
          مضامین تلاش کریں
        </h2>
        <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: '#F4C430' }}></div>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBox
          placeholder="Search posts in English or Urdu..."
          className="w-full"
        />
      </div>

      {/* Search Results */}
      {query && (
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#14221C' }}>
              Search Results for: <span style={{ color: '#0B5D1E' }}>"{query}"</span>
            </h3>
            <h4 className="font-urdu text-lg rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
              "{query}" کے لیے تلاش کے نتائج
            </h4>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600">Searching...</p>
              <p className="font-urdu text-gray-600 rtl">تلاش جاری ہے...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-red-600 mb-2">❌ {error}</div>
              <button
                onClick={() => performSearch(query)}
                className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0B5D1E' }}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && results.length === 0 && query && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#14221C' }}>
                No results found
              </h3>
              <p className="text-gray-600 mb-2">
                No posts found matching "{query}". Try different keywords.
              </p>
              <p className="font-urdu text-gray-600 rtl">
                "{query}" سے میل کھانے والے کوئی مضامین نہیں ملے۔ مختلف الفاظ آزمائیں۔
              </p>
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                <p className="font-urdu text-gray-600 rtl">
                  {results.length} نتائج ملے
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={{
                      ...post,
                      comments: Array(post._count.comments).fill({ id: '' })
                    }} 
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Default State */}
      {!query && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
            Search Our Blog
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            Use the search box above to find posts by title, content, or tags in both English and Urdu.
          </p>
          <p className="font-urdu text-gray-600 max-w-md mx-auto rtl">
            اوپر دیے گئے سرچ باکس کا استعمال کرتے ہوئے انگریزی اور اردو دونوں میں عنوان، مواد یا ٹیگز کے ذریعے مضامین تلاش کریں۔
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [siteMeta, setSiteMeta] = useState(null);

  useEffect(() => {
    // Load site meta for footer
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => setSiteMeta(data.siteMeta))
      .catch(err => console.error('Failed to load site meta:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Suspense fallback={
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Loading search...</p>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </main>

      <Footer siteMeta={siteMeta} />
    </div>
  );
}
