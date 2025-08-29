'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Banner, BannerCategory, loadBannersConfig } from '@/lib/banners';

interface BannerSelectorProps {
  selectedBanner: string;
  onBannerSelect: (bannerPath: string) => void;
  className?: string;
}

export default function BannerSelector({ 
  selectedBanner, 
  onBannerSelect, 
  className = '' 
}: BannerSelectorProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<BannerCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBannersConfig()
      .then(config => {
        setBanners(config.defaultBanners);
        setCategories(config.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load banners:', error);
        setLoading(false);
      });
  }, []);

  const filteredBanners = selectedCategory === 'all' 
    ? banners 
    : banners.filter(banner => {
        const category = categories.find(cat => cat.name === selectedCategory);
        return category?.banners.includes(banner.id);
      });

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#14221C' }}>
          Select Cover Banner
        </h3>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold" style={{ color: '#14221C' }}>
          Select Cover Banner
        </h3>
        <h4 className="font-urdu text-md rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
          کور بینر کا انتخاب
        </h4>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'text-white'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={{ 
              backgroundColor: selectedCategory === 'all' ? '#0B5D1E' : undefined 
            }}
          >
            All Banners
          </button>
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'text-white'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={{ 
                backgroundColor: selectedCategory === category.name ? '#0B5D1E' : undefined 
              }}
            >
              {category.name}
              <span className="font-urdu text-xs ml-2 rtl">
                {category.nameUrdu}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom URL Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or enter custom image URL:
        </label>
        <input
          type="url"
          placeholder="https://example.com/your-image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onChange={(e) => onBannerSelect(e.target.value)}
        />
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBanners.map(banner => (
          <div
            key={banner.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg ${
              selectedBanner === banner.path
                ? 'border-green-600 ring-2 ring-green-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onBannerSelect(banner.path)}
          >
            {/* Banner Preview */}
            <div className="aspect-video relative">
              <Image
                src={banner.path}
                alt={banner.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            {/* Banner Info */}
            <div className="p-3">
              <h4 className="font-semibold text-sm text-gray-900 mb-1">
                {banner.name}
              </h4>
              <p className="font-urdu text-xs text-gray-600 rtl mb-2">
                {banner.nameUrdu}
              </p>
              <p className="text-xs text-gray-600 line-clamp-2">
                {banner.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {banner.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: 'rgba(11, 93, 30, 0.1)', 
                      color: '#0B5D1E' 
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedBanner === banner.path && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: '#0B5D1E' }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBanners.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No banners found for this category.</p>
        </div>
      )}

      {/* Selected Banner Preview */}
      {selectedBanner && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Banner:</h4>
          <div className="aspect-video w-full max-w-md relative rounded-lg overflow-hidden">
            <Image
              src={selectedBanner}
              alt="Selected banner"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">{selectedBanner}</p>
        </div>
      )}
    </div>
  );
}
