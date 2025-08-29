import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteMeta } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Chand-e-Mahtab - Moonlight of knowledge and youth',
  openGraph: {
    title: 'About Chand-e-Mahtab',
    description: 'Learn more about Chand-e-Mahtab - Moonlight of knowledge and youth',
    type: 'website',
  },
};

export default async function AboutPage() {
  const siteMeta = await getSiteMeta();

  // Fallback content if no site meta is found
  const aboutContentEn = siteMeta?.aboutEn || `Welcome to Chand-e-Mahtab, where knowledge illuminates like moonlight. This blog explores topics of wisdom, youth, and cultural heritage through both English and Urdu perspectives.

Founded with the vision of bridging traditions and modernity, we share insights that resonate across generations and cultures.`;

  const aboutContentUr = siteMeta?.aboutUr || `چاند مہتاب میں خوش آمدید، جہاں علم چاندنی کی طرح روشنی ڈالتا ہے۔ یہ بلاگ انگریزی اور اردو دونوں نقطہ نظر سے حکمت، جوانی، اور ثقافتی ورثے کے موضوعات کو تلاش کرتا ہے۔

روایات اور جدیدیت کو جوڑنے کے وژن کے ساتھ قائم کیا گیا، ہم ایسی بصیرتیں شیئر کرتے ہیں جو نسلوں اور ثقافتوں میں گونجتی ہیں۔`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-16 md:py-24"
          style={{ 
            background: 'linear-gradient(to bottom right, #0B5D1E, #0B5D1E)',
            color: '#FAFBF8'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <Image
                src="/cemlogo.svg"
                alt="Chand-e-Mahtab Logo"
                width={120}
                height={120}
                className="mx-auto mb-8"
                priority={true}
              />
              
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
                About Us
              </h1>
              
              <h2 className="font-urdu text-2xl md:text-4xl mb-6 rtl">
                ہمارے بارے میں
              </h2>
              
              <p className="text-xl md:text-2xl mb-8" style={{ color: '#F4C430' }}>
                Moonlight of knowledge and youth
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* English Content */}
              <div className="mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: '#14221C' }}>
                  Our Story
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-lg leading-relaxed space-y-6"
                    style={{ color: '#14221C' }}
                    dangerouslySetInnerHTML={{ 
                      __html: aboutContentEn.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>')
                    }}
                  />
                </div>
              </div>

              {/* Urdu Content */}
              <div className="mb-16">
                <h2 className="font-urdu text-3xl md:text-4xl font-bold mb-8 text-center rtl" style={{ color: '#14221C' }}>
                  ہماری کہانی
                </h2>
                
                <div className="prose prose-lg max-w-none rtl">
                  <div 
                    className="font-urdu text-lg leading-loose space-y-6 rtl"
                    style={{ color: '#14221C' }}
                    dangerouslySetInnerHTML={{ 
                      __html: aboutContentUr.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>')
                    }}
                  />
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Mission - English */}
                <div className="p-8 rounded-lg" style={{ backgroundColor: 'rgba(11, 93, 30, 0.05)' }}>
                  <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#0B5D1E' }}>
                    Our Mission
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#14221C' }}>
                    To bridge the gap between traditional wisdom and modern perspectives, 
                    creating a platform where knowledge flows like moonlight - gentle, 
                    illuminating, and accessible to all.
                  </p>
                </div>

                {/* Mission - Urdu */}
                <div className="p-8 rounded-lg rtl" style={{ backgroundColor: 'rgba(244, 196, 48, 0.05)' }}>
                  <h3 className="font-urdu text-2xl font-semibold mb-4" style={{ color: '#F4C430' }}>
                    ہمارا مقصد
                  </h3>
                  <p className="font-urdu text-lg leading-loose" style={{ color: '#14221C' }}>
                    روایتی حکمت اور جدید نقطہ نظر کے درمیان خلاء کو پاٹنا، ایک ایسا پلیٹ فارم بنانا 
                    جہاں علم چاندنی کی طرح بہے - نرم، روشن، اور سب کے لیے قابل رسائی۔
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: '#14221C' }}>
                  Our Values
                </h2>
                <h2 className="font-urdu text-2xl md:text-3xl mb-12 text-center rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
                  ہماری اقدار
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Value 1 */}
                  <div className="text-center p-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#0B5D1E' }}
                    >
                      <span className="text-2xl" style={{ color: '#FAFBF8' }}>📚</span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-2" style={{ color: '#14221C' }}>
                      Knowledge
                    </h3>
                    <p className="font-urdu text-lg rtl mb-3" style={{ color: '#14221C' }}>
                      علم
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
                      Pursuing wisdom in all its forms
                    </p>
                  </div>

                  {/* Value 2 */}
                  <div className="text-center p-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#F4C430' }}
                    >
                      <span className="text-2xl" style={{ color: '#0B5D1E' }}>🌉</span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-2" style={{ color: '#14221C' }}>
                      Bridge Building
                    </h3>
                    <p className="font-urdu text-lg rtl mb-3" style={{ color: '#14221C' }}>
                      پل بنانا
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
                      Connecting cultures and generations
                    </p>
                  </div>

                  {/* Value 3 */}
                  <div className="text-center p-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#0B5D1E' }}
                    >
                      <span className="text-2xl" style={{ color: '#FAFBF8' }}>🌙</span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-2" style={{ color: '#14221C' }}>
                      Gentle Illumination
                    </h3>
                    <p className="font-urdu text-lg rtl mb-3" style={{ color: '#14221C' }}>
                      نرم روشنی
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
                      Sharing light without overwhelming
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              {siteMeta && (siteMeta.email || siteMeta.facebook || siteMeta.twitter) && (
                <div className="mb-16 p-8 rounded-lg text-center" style={{ backgroundColor: '#FAFBF8' }}>
                  <h2 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#14221C' }}>
                    Connect With Us
                  </h2>
                  <h3 className="font-urdu text-xl rtl mb-6" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
                    ہم سے رابطہ کریں
                  </h3>

                  <div className="flex flex-wrap justify-center gap-4">
                    {siteMeta.email && (
                      <a
                        href={`mailto:${siteMeta.email}`}
                        className="inline-flex items-center px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
                      >
                        📧 Email
                      </a>
                    )}
                    {siteMeta.facebook && (
                      <a
                        href={siteMeta.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: '#4267B2', color: 'white' }}
                      >
                        📘 Facebook
                      </a>
                    )}
                    {siteMeta.twitter && (
                      <a
                        href={siteMeta.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: '#1DA1F2', color: 'white' }}
                      >
                        🐦 Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="text-center">
                <h2 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#14221C' }}>
                  Join Our Journey
                </h2>
                <h3 className="font-urdu text-xl rtl mb-6" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
                  ہمارے سفر میں شامل ہوں
                </h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
                  Explore our latest posts and join the conversation about wisdom, culture, and the beautiful intersection of tradition and modernity.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
                >
                  Read Our Posts
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer siteMeta={siteMeta} />
    </div>
  );
}
