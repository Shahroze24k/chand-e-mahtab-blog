import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header-enhanced sticky top-0 z-50 border-b border-white/20" style={{ backdropFilter: 'blur(20px)' }}>
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-50 via-transparent to-yellow-50"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-gradient-to-bl from-yellow-100 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Logo and Site Name */}
          <Link href="/" className="flex items-center space-x-3 hover-scale group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="Chand-e-Mahtab Logo"
                width={44}
                height={44}
                className="w-10 h-10 md:w-11 md:h-11 group-hover:rotate-12 transition-transform duration-300"
                priority={true}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-playfair text-xl md:text-2xl font-bold gradient-text">
                Chand-e-Mahtab
              </h1>
              <span className="font-urdu text-sm md:text-base rtl" style={{ color: '#0B5D1E', opacity: 0.8 }}>
                چاند مہتاب
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="relative px-3 py-2 font-semibold transition-all duration-300 hover:text-green-600 group"
              style={{ color: '#14221C' }}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="relative px-3 py-2 font-semibold transition-all duration-300 hover:text-green-600 group"
              style={{ color: '#14221C' }}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/search"
              className="relative px-3 py-2 font-semibold transition-all duration-300 hover:text-green-600 group"
              style={{ color: '#14221C' }}
            >
              Search
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-3 rounded-xl hover:bg-green-50 transition-colors duration-200 group" style={{ color: '#14221C' }}>
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
