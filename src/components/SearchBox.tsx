'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBox({ 
  placeholder = "Search posts...", 
  className = "" 
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-10 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
          style={{ 
            borderColor: 'rgba(11, 93, 30, 0.2)',
            '--tw-ring-color': '#0B5D1E'
          } as React.CSSProperties}
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5"
            style={{ color: 'rgba(20, 34, 28, 0.5)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
