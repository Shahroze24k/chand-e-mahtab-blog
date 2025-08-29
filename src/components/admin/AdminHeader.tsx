'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminHeader() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b" style={{ borderColor: 'rgba(11, 93, 30, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="Chand-e-Mahtab Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <h1 className="font-playfair text-lg font-semibold" style={{ color: '#0B5D1E' }}>
                  Admin Panel
                </h1>
                <span className="font-urdu text-sm" style={{ color: 'rgba(11, 93, 30, 0.8)' }}>
                  ایڈمن پینل
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/admin"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#14221C' }}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/posts"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#14221C' }}
            >
              Posts
            </Link>
            <Link
              href="/admin/comments"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#14221C' }}
            >
              Comments
            </Link>
            <Link
              href="/admin/settings"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#14221C' }}
            >
              Settings
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* View Site */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#0B5D1E' }}
            >
              View Site →
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#dc3545', color: 'white' }}
            >
              {isLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t" style={{ borderColor: 'rgba(11, 93, 30, 0.1)' }}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <Link
                href="/admin"
                className="text-sm font-medium"
                style={{ color: '#14221C' }}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/posts"
                className="text-sm font-medium"
                style={{ color: '#14221C' }}
              >
                Posts
              </Link>
              <Link
                href="/admin/comments"
                className="text-sm font-medium"
                style={{ color: '#14221C' }}
              >
                Comments
              </Link>
              <Link
                href="/admin/settings"
                className="text-sm font-medium"
                style={{ color: '#14221C' }}
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
