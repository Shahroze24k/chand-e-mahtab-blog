'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to admin dashboard
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFBF8' }}>
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/cemlogo.svg"
              alt="Chand-e-Mahtab Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
              priority={true}
            />
          </Link>
          <h1 className="font-playfair text-3xl font-bold mb-2" style={{ color: '#14221C' }}>
            Admin Login
          </h1>
          <h2 className="font-urdu text-xl rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            ایڈمن لاگ ان
          </h2>
          <p className="text-sm mt-2" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
            Enter your password to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8 border" style={{ borderColor: 'rgba(11, 93, 30, 0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="Enter admin password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div 
                className="p-3 rounded-lg text-sm"
                style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: 'rgba(20, 34, 28, 0.1)' }}>
            <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
              Forgot your password? Contact the site administrator.
            </p>
            <Link 
              href="/" 
              className="text-sm hover:opacity-80 transition-opacity inline-block mt-2"
              style={{ color: '#0B5D1E' }}
            >
              ← Back to website
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: 'rgba(20, 34, 28, 0.5)' }}>
            🔒 This is a secure admin area. Your session will expire after 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
