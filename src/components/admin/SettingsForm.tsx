'use client';

import { useState } from 'react';

interface SiteMeta {
  id: string;
  aboutEn: string;
  aboutUr: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  email: string;
  phone: string;
}

interface SettingsFormProps {
  siteMeta: SiteMeta | null;
}

export default function SettingsForm({ siteMeta }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    aboutEn: siteMeta?.aboutEn || '',
    aboutUr: siteMeta?.aboutUr || '',
    facebook: siteMeta?.facebook || '',
    twitter: siteMeta?.twitter || '',
    instagram: siteMeta?.instagram || '',
    linkedin: siteMeta?.linkedin || '',
    youtube: siteMeta?.youtube || '',
    email: siteMeta?.email || '',
    phone: siteMeta?.phone || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* About Section */}
        <div>
          <h3 className="font-playfair text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
            About Content
          </h3>
          
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="aboutEn" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                About (English)
              </label>
              <textarea
                id="aboutEn"
                name="aboutEn"
                value={formData.aboutEn}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-vertical"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="Enter about content in English..."
              />
            </div>

            <div>
              <label 
                htmlFor="aboutUr" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                About (Urdu) - اردو میں
              </label>
              <textarea
                id="aboutUr"
                name="aboutUr"
                value={formData.aboutUr}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-vertical font-urdu rtl"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="اردو میں مواد داخل کریں..."
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-playfair text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="contact@chand-e-mahtab.com"
              />
            </div>

            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="font-playfair text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
            Social Media Links
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="facebook" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                Facebook
              </label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="https://facebook.com/chand.e.mahtab"
              />
            </div>

            <div>
              <label 
                htmlFor="twitter" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="https://twitter.com/chand_e_mahtab"
              />
            </div>

            <div>
              <label 
                htmlFor="instagram" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                Instagram
              </label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="https://instagram.com/chand.e.mahtab"
              />
            </div>

            <div>
              <label 
                htmlFor="linkedin" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="https://linkedin.com/company/chand-e-mahtab"
              />
            </div>

            <div>
              <label 
                htmlFor="youtube" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                YouTube
              </label>
              <input
                type="url"
                id="youtube"
                name="youtube"
                value={formData.youtube}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="https://youtube.com/@chand-e-mahtab"
              />
            </div>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div 
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: message.type === 'success' 
                ? 'rgba(11, 93, 30, 0.1)' 
                : 'rgba(220, 53, 69, 0.1)',
              color: message.type === 'success' ? '#0B5D1E' : '#dc3545'
            }}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
