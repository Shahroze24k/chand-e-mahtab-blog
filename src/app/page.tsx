import { Suspense } from 'react';
import Image from 'next/image';
import { getPublishedPosts, getSiteMeta } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import SearchBox from '@/components/SearchBox';

export default async function Home() {
  const [posts, siteMeta] = await Promise.all([
    getPublishedPosts(6),
    getSiteMeta(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section 
            className="relative py-20 md:py-32 overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #0B5D1E 0%, #0F7A28 50%, #0B5D1E 100%)',
              color: '#FAFBF8'
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white animate-pulse-soft"></div>
              <div className="absolute top-32 right-20 w-20 h-20 rounded-full bg-yellow-300 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-white animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-32 right-1/3 w-24 h-24 rounded-full bg-yellow-300 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="animate-fade-in-up">
                  <div className="relative inline-block mb-8">
                    <Image
                      src="/logo.svg"
                      alt="Chand-e-Mahtab Logo"
                      width={140}
                      height={140}
                      className="mx-auto hover-scale drop-shadow-2xl"
                      priority={true}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-20 blur-xl animate-pulse-soft"></div>
                  </div>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 gradient-text-gold drop-shadow-lg">
                    Chand-e-Mahtab
                  </h1>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <h2 className="font-urdu text-3xl md:text-5xl mb-8 rtl drop-shadow-md">
                    چاند مہتاب
                  </h2>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <p className="text-2xl md:text-3xl mb-8 font-semibold gradient-text-gold drop-shadow-sm">
                    Moonlight of knowledge and youth
                  </p>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
                    Exploring the intersection of tradition and modernity through bilingual insights, 
                    wisdom, and cultural heritage. Join us on a journey of discovery and enlightenment.
                  </p>
                </div>

                {/* Enhanced Search Box */}
                <div className="animate-fade-in-up max-w-lg mx-auto" style={{ animationDelay: '1s' }}>
                  <div className="glass rounded-2xl p-6 hover-lift">
                    <SearchBox 
                      placeholder="Search posts in English or Urdu..."
                      className="text-left"
                    />
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="animate-fade-in-up mt-12 flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '1.2s' }}>
                  <a
                    href="/about"
                    className="btn-primary inline-flex items-center justify-center hover-lift"
                  >
                    Learn More About Us
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#latest-posts"
                    className="btn-secondary inline-flex items-center justify-center hover-lift"
                  >
                    Explore Posts
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Latest Posts Section */}
          <section id="latest-posts" className="py-20 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 gradient-text">
                  Latest Posts
                </h2>
                <h3 className="font-urdu text-2xl md:text-3xl rtl mb-6" style={{ color: '#14221C', opacity: 0.8 }}>
                  تازہ مضامین
                </h3>
                <div className="w-24 h-1.5 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover our latest insights, stories, and reflections on culture, tradition, and modern life.
                </p>
              </div>

              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 animate-fade-in-up">
                  <div className="glass rounded-3xl p-12 max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold mb-2" style={{ color: '#14221C' }}>No posts available yet.</p>
                    <p className="font-urdu text-xl rtl mb-4" style={{ color: '#14221C', opacity: 0.8 }}>
                      ابھی تک کوئی مضامین دستیاب نہیں ہیں۔
                    </p>
                    <p className="text-gray-600">Check back soon for new content!</p>
                  </div>
                </div>
              )}

              {/* Enhanced View All Posts Link */}
              {posts.length >= 6 && (
                <div className="text-center mt-16 animate-fade-in-up">
                  <a
                    href="/posts"
                    className="btn-primary inline-flex items-center justify-center hover-lift text-lg px-8 py-4"
                  >
                    View All Posts
                    <svg className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer siteMeta={siteMeta} />
      </div>
  );
}
