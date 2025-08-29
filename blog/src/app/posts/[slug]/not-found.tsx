import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4" style={{ color: '#14221C' }}>
            404
          </h1>
          
          <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#14221C' }}>
            Post Not Found
          </h2>
          
          <h3 className="font-urdu text-xl md:text-2xl mb-6 rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            مضمون نہیں ملا
          </h3>
          
          <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
            The post you're looking for doesn't exist or may have been moved.
          </p>
          
          <p className="font-urdu text-lg mb-8 max-w-md mx-auto rtl" style={{ color: 'rgba(20, 34, 28, 0.7)' }}>
            آپ جو مضمون تلاش کر رہے ہیں وہ موجود نہیں ہے۔
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
            >
              Go Home
            </Link>
            
            <Link
              href="/search"
              className="inline-block px-6 py-3 rounded-lg font-medium border hover:opacity-80 transition-opacity"
              style={{ 
                borderColor: '#0B5D1E', 
                color: '#0B5D1E',
                backgroundColor: 'transparent'
              }}
            >
              Search Posts
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
