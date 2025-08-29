import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* Large 404 */}
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-4" style={{ color: '#0B5D1E' }}>
            404
          </h1>
          
          {/* English Heading */}
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#14221C' }}>
            Page Not Found
          </h2>
          
          {/* Urdu Heading */}
          <h3 className="font-urdu text-2xl md:text-3xl mb-6 rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            صفحہ نہیں ملا
          </h3>
          
          {/* English Description */}
          <p className="text-lg mb-4 max-w-md mx-auto" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
            The page you're looking for doesn't exist. It might have been moved, deleted, or you may have entered the wrong URL.
          </p>
          
          {/* Urdu Description */}
          <p className="font-urdu text-lg mb-8 max-w-md mx-auto rtl" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
            آپ جو صفحہ تلاش کر رہے ہیں وہ موجود نہیں ہے۔ یہ منتقل، حذف ہو گیا ہو سکتا ہے، یا آپ نے غلط لنک داخل کیا ہو۔
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
            >
              Go Home
            </Link>
            
            <Link
              href="/about"
              className="inline-block px-8 py-3 rounded-lg font-medium border hover:opacity-80 transition-opacity"
              style={{ 
                borderColor: '#0B5D1E', 
                color: '#0B5D1E',
                backgroundColor: 'transparent'
              }}
            >
              About Us
            </Link>
          </div>

          {/* Decorative Moon */}
          <div className="mt-12">
            <div 
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: 'rgba(244, 196, 48, 0.1)' }}
            >
              <span className="text-4xl">🌙</span>
            </div>
            <p className="mt-4 text-sm" style={{ color: 'rgba(20, 34, 28, 0.5)' }}>
              Lost in the moonlight? Let us guide you back.
            </p>
            <p className="font-urdu text-sm rtl mt-2" style={{ color: 'rgba(20, 34, 28, 0.5)' }}>
              چاندنی میں کھو گئے؟ آئیے آپ کو واپس راہ دکھاتے ہیں۔
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
