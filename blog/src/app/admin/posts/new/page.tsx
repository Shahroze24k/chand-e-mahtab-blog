'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import RichTextEditor from '@/components/RichTextEditor';
import BannerSelector from '@/components/admin/BannerSelector';
import AIContentAssistant from '@/components/admin/AIContentAssistant';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: '',
    titleUr: '',
    summaryEn: '',
    summaryUr: '',
    content: '',
    tags: '',
    published: false,
    coverImage: '',
  });
  
  const [urduTranslation, setUrduTranslation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          content: formData.content, // Already HTML from rich text editor
        }),
      });

      if (response.ok) {
        const { post } = await response.json();
        router.push(`/admin/posts`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
      <AdminHeader />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2" style={{ color: '#14221C' }}>
                Create New Post
              </h1>
              <h2 className="font-urdu text-xl md:text-2xl rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
                نیا مضمون بنائیں
              </h2>
            </div>
            
            <Link
              href="/admin/posts"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              ← Back to Posts
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#14221C' }}>
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Title */}
              <div>
                <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-2">
                  Title (English) *
                </label>
                <div className="flex gap-2">
                  <input
                    id="titleEn"
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter the post title in English"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!formData.titleEn.trim()) {
                        alert('Please enter an English title first');
                        return;
                      }
                      
                      try {
                        const response = await fetch('/api/ai/translate', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ text: formData.titleEn, targetLanguage: 'urdu' }),
                        });
                        
                        const data = await response.json();
                        if (data.success) {
                          setFormData({ ...formData, titleUr: data.translatedText });
                        } else {
                          alert('Failed to translate title');
                        }
                      } catch (error) {
                        alert('Network error: Could not connect to translation service');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
                  >
                    🏷️ Translate
                  </button>
                </div>
              </div>

              {/* Urdu Title */}
              <div>
                <label htmlFor="titleUr" className="block text-sm font-medium text-gray-700 mb-2">
                  Title (Urdu)
                </label>
                <input
                  id="titleUr"
                  type="text"
                  value={formData.titleUr}
                  onChange={(e) => setFormData({ ...formData, titleUr: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent font-urdu rtl"
                  placeholder="اردو میں عنوان درج کریں"
                />
              </div>

              {/* English Summary */}
              <div>
                <label htmlFor="summaryEn" className="block text-sm font-medium text-gray-700 mb-2">
                  Summary (English)
                </label>
                <div className="space-y-2">
                  <textarea
                    id="summaryEn"
                    rows={3}
                    value={formData.summaryEn}
                    onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Brief summary of the post in English"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!formData.summaryEn.trim()) {
                        alert('Please enter an English summary first');
                        return;
                      }
                      
                      try {
                        const response = await fetch('/api/ai/translate', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ text: formData.summaryEn, targetLanguage: 'urdu' }),
                        });
                        
                        const data = await response.json();
                        if (data.success) {
                          setFormData({ ...formData, summaryUr: data.translatedText });
                        } else {
                          alert('Failed to translate summary');
                        }
                      } catch (error) {
                        alert('Network error: Could not connect to translation service');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    📝 Translate Summary
                  </button>
                </div>
              </div>

              {/* Urdu Summary */}
              <div>
                <label htmlFor="summaryUr" className="block text-sm font-medium text-gray-700 mb-2">
                  Summary (Urdu)
                </label>
                <textarea
                  id="summaryUr"
                  rows={3}
                  value={formData.summaryUr}
                  onChange={(e) => setFormData({ ...formData, summaryUr: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent font-urdu rtl"
                  placeholder="اردو میں مختصر خلاصہ"
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
              </div>


            </div>
          </div>

          {/* Banner Selection */}
          <BannerSelector
            selectedBanner={formData.coverImage}
            onBannerSelect={(bannerPath) => setFormData({ ...formData, coverImage: bannerPath })}
          />

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#14221C' }}>
              Post Content
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Use the rich text editor below to write your post. You can format text, add images, import Word/PDF documents, and use emojis. 
              The editor supports both English and Urdu text.
            </p>
            
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Start writing your post here... You can import from Word/PDF, add images, and use rich formatting!"
            />
          </div>

          {/* Urdu Translation Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold" style={{ color: '#14221C' }}>
                  Urdu Translation
                </h3>
                <p className="text-sm text-gray-600">
                  Generate Urdu translation of your content for review and manual copying.
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (!formData.content.trim()) {
                    alert('Please add some content first');
                    return;
                  }
                  
                  try {
                    setIsLoading(true);
                    const response = await fetch('/api/ai/translate', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ text: formData.content, targetLanguage: 'urdu' }),
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                      setUrduTranslation(data.translatedText);
                    } else {
                      alert('Failed to translate content');
                    }
                  } catch (error) {
                    alert('Network error: Could not connect to translation service');
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading || !formData.content.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Translating...
                  </>
                ) : (
                  <>🌐 Add Urdu Translation</>
                )}
              </button>
            </div>
            
            <textarea
              value={urduTranslation}
              onChange={(e) => setUrduTranslation(e.target.value)}
              rows={10}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent font-urdu rtl"
              placeholder="Urdu translation will appear here. You can edit it and copy-paste as needed."
              dir="rtl"
            />
            
            {urduTranslation && (
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  ✨ Translation generated! You can edit it above and copy-paste where needed.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(urduTranslation);
                    alert('Urdu translation copied to clipboard!');
                  }}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  📋 Copy Text
                </button>
              </div>
            )}
          </div>

          {/* Publishing Options */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#14221C' }}>
              Publishing Options
            </h3>
            
            <div className="flex items-center">
              <input
                id="published"
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Publish immediately (uncheck to save as draft)
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/posts"
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={isLoading || !formData.titleEn.trim() || !formData.content.trim()}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Creating...' : formData.published ? 'Publish Post' : 'Save Draft'}
            </button>
          </div>
        </form>

        {/* AI Content Assistant - Outside of form to prevent submission conflicts */}
        <div className="mt-8">
          <AIContentAssistant 
            content={formData.content}
            onContentUpdate={(content) => setFormData({ ...formData, content })}
          />
        </div>
      </main>
    </div>
  );
}

