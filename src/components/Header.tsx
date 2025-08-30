import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/50">
      {/* Moonlight pattern overlay */}
      <div className="absolute inset-0 pattern-moonlight opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Site Name */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <Image
                src="/cemlogo.svg"
                alt="Chand-e-Mahtab Logo"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
                priority={true}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-playfair text-xl md:text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                Chand-e-Mahtab
              </h1>
              <span className="font-urdu text-sm md:text-base text-slate-600 rtl">
                چاند مہتاب
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link px-3 py-2 font-medium">
              Home
            </Link>
            <Link href="/about" className="nav-link px-3 py-2 font-medium">
              About
            </Link>
            <Link href="/search" className="nav-link px-3 py-2 font-medium">
              Search
            </Link>
            <div className="relative group">
              <button className="nav-link px-3 py-2 font-medium flex items-center space-x-1">
                <span>Categories</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu can be added here */}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
