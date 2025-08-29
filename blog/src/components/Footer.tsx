import Link from 'next/link';

interface FooterProps {
  siteMeta?: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    email: string;
  } | null;
}

export default function Footer({ siteMeta }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', url: siteMeta?.facebook, icon: 'facebook' },
    { name: 'Twitter', url: siteMeta?.twitter, icon: 'twitter' },
    { name: 'Instagram', url: siteMeta?.instagram, icon: 'instagram' },
    { name: 'LinkedIn', url: siteMeta?.linkedin, icon: 'linkedin' },
    { name: 'YouTube', url: siteMeta?.youtube, icon: 'youtube' },
  ].filter(link => link.url);

  return (
    <footer className="mt-20 relative overflow-hidden" style={{ background: 'var(--gradient-primary)', color: '#FAFBF8' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-300 animate-pulse-soft"></div>
        <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-white animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 rounded-full bg-yellow-300 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="text-center md:text-left animate-fade-in-left">
            <div className="mb-6">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-2 gradient-text-gold">
                Chand-e-Mahtab
              </h3>
              <p className="font-urdu text-xl md:text-2xl rtl mb-4">چاند مہتاب</p>
              <p className="text-lg font-semibold" style={{ color: '#F4C430' }}>
                Moonlight of knowledge and youth
              </p>
            </div>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Bridging cultures through thoughtful content, exploring the beautiful intersection of tradition and modernity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center animate-fade-in-up">
            <h4 className="font-playfair text-xl font-bold mb-6" style={{ color: '#F4C430' }}>Quick Links</h4>
            <div className="space-y-3">
              <Link href="/" className="block hover:text-yellow-300 transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link href="/about" className="block hover:text-yellow-300 transition-colors duration-200 font-medium">
                About
              </Link>
              <Link href="/search" className="block hover:text-yellow-300 transition-colors duration-200 font-medium">
                Search
              </Link>
              {siteMeta?.email && (
                <a
                  href={`mailto:${siteMeta.email}`}
                  className="block hover:text-yellow-300 transition-colors duration-200 font-medium"
                >
                  Contact
                </a>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right animate-fade-in-right">
            <h4 className="font-playfair text-xl font-bold mb-6" style={{ color: '#F4C430' }}>Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center hover-lift transition-all duration-300 group"
                  style={{ background: 'var(--gradient-secondary)' }}
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold group-hover:scale-110 transition-transform duration-200" style={{ color: '#0B5D1E' }}>
                    {social.name.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-sm opacity-75">
              Follow us for updates and insights
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-8 text-center animate-fade-in-up" style={{ borderColor: 'rgba(244, 196, 48, 0.3)' }}>
          <p className="text-sm font-medium" style={{ color: '#F4C430' }}>
            © {currentYear} Chand-e-Mahtab. All rights reserved.
          </p>
          <p className="text-xs mt-2 opacity-75">
            Made with ❤️ for knowledge seekers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
