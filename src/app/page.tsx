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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 overflow-hidden">
            {/* Moonlight gradient background */}
            <div 
              className="absolute inset-0"
              style={{ background: 'var(--gradient-moonlight)' }}
            >
              <div className="absolute inset-0 pattern-moonlight opacity-20"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
              <div className="absolute top-32 right-20 w-20 h-20 rounded-full bg-yellow-300 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-white animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-32 right-1/3 w-24 h-24 rounded-full bg-yellow-300 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="content-width">
                <div className="animate-fade-in-up">
                  <div className="relative inline-block mb-8">
                    <Image
                      src="/cemlogo.svg"
                      alt="Chand-e-Mahtab Logo"
                      width={120}
                      height={120}
                      className="mx-auto transition-transform duration-300 hover:scale-110 drop-shadow-2xl"
                      priority={true}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-20 blur-xl animate-pulse"></div>
                  </div>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <h1 className="heading-hero font-playfair text-white mb-4 text-balance drop-shadow-lg">
                    Chand-e-Mahtab
                  </h1>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <h2 className="font-urdu text-2xl md:text-4xl mb-8 text-white/90 rtl drop-shadow-md">
                    چاند مہتاب
                  </h2>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <p className="text-xl md:text-2xl mb-8 font-medium text-white/95 text-balance">
                    Moonlight of Knowledge and Youth
                  </p>
                  <p className="font-urdu text-lg md:text-xl mb-8 text-white/90 rtl">
                    علم اور نوجوانوں کا چاند
                  </p>
                </div>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  <p className="text-lg mb-12 max-w-2xl mx-auto text-white/80 leading-relaxed text-balance">
                    Exploring the intersection of tradition and modernity through bilingual insights, 
                    cultural heritage, and the vibrant voice of South Asian youth.
                  </p>
                </div>

                {/* Enhanced Search Box */}
                <div className="animate-fade-in-up max-w-md mx-auto" style={{ animationDelay: '1s' }}>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
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
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pattern-subtle opacity-50"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="heading-section font-playfair mb-4" style={{ color: 'var(--text-primary)' }}>
                  Latest Posts
                </h2>
                <h3 className="font-urdu text-xl md:text-2xl rtl mb-6" style={{ color: 'var(--text-secondary)' }}>
                  تازہ مضامین
                </h3>
                <div className="w-20 h-1 mx-auto rounded-full mb-6" style={{ background: 'var(--gradient-cultural)' }}></div>
                <p className="text-lg max-w-2xl mx-auto text-balance" style={{ color: 'var(--text-secondary)' }}>
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
