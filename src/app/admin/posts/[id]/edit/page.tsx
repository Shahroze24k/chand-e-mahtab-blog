'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import RichTextEditor from '@/components/RichTextEditor';
import BannerSelector from '@/components/admin/BannerSelector';
import AIContentAssistant from '@/components/admin/AIContentAssistant';
import Link from 'next/link';

interface Post {
  id: string;
  titleEn: string;
  titleUr?: string;
  summaryEn?: string;
  summaryUr?: string;
  content: string;
  tags: string;
  published: boolean;
  coverImage?: string;
  slug: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'settings'>('basic');
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

  // Load existing post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch(`/api/admin/posts/${postId}`);
        if (response.ok) {
          const post: Post = await response.json();
          setFormData({
            titleEn: post.titleEn,
            titleUr: post.titleUr || '',
            summaryEn: post.summaryEn || '',
            summaryUr: post.summaryUr || '',
            content: post.content,
            tags: post.tags,
            published: post.published,
            coverImage: post.coverImage || '',
          });
        } else if (response.status === 401) {
          // Authentication failed - redirect to login
          setAuthError(true);
          router.push('/admin/login');
          return;
        } else if (response.status === 404) {
          alert('Post not found');
          router.push('/admin/posts');
          return;
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert(errorData.message || 'Failed to load post');
          router.push('/admin/posts');
          return;
        }
      } catch (error) {
        console.error('Error loading post:', error);
        alert('Failed to load post. Please check your connection.');
        router.push('/admin/posts');
      } finally {
        setIsLoadingPost(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Post updated successfully!');
        router.push('/admin/posts');
      } else if (response.status === 401) {
        alert('Authentication failed. Please log in again.');
        router.push('/admin/login');
      } else if (response.status === 404) {
        alert('Post not found. It may have been deleted.');
        router.push('/admin/posts');
      } else {
        const error = await response.json().catch(() => ({}));
        alert(error.message || 'Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // AI Helper Functions
  const translateTitle = async () => {
    if (!formData.titleEn.trim()) return;
    
    setIsLoading(true);
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
        alert(`Failed to translate: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to translate title:', error);
      alert('Network error: Could not connect to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  const translateSummary = async () => {
    if (!formData.summaryEn.trim()) return;
    
    setIsLoading(true);
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
        alert(`Failed to translate: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to translate summary:', error);
      alert('Network error: Could not connect to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  const translateContent = async () => {
    if (!formData.content.trim()) return;
    
    setIsLoading(true);
    try {
      // Strip HTML tags for AI processing
      const textContent = formData.content.replace(/<[^>]*>/g, '');
      
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textContent, targetLanguage: 'urdu' }),
      });
      
      const data = await response.json();
      if (data.success) {
        setUrduTranslation(data.translatedText);
      } else {
        alert(`Failed to translate: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to translate content:', error);
      alert('Network error: Could not connect to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  const autoGenerateTags = async () => {
    if (!formData.content.trim()) return;
    
    setIsLoading(true);
    try {
      // Strip HTML tags for AI processing
      const textContent = formData.content.replace(/<[^>]*>/g, '');
      
      const response = await fetch('/api/ai/generate-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: textContent }),
      });
      
      const data = await response.json();
      if (data.success) {
        // Convert array to comma-separated string
        const tagsString = Array.isArray(data.tags) ? data.tags.join(', ') : data.tags;
        setFormData({ ...formData, tags: tagsString });
      } else {
        alert(`Failed to generate tags: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to generate tags:', error);
      alert('Network error: Could not connect to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Post deleted successfully!');
        router.push('/admin/posts');
      } else if (response.status === 401) {
        alert('Authentication failed. Please log in again.');
        router.push('/admin/login');
      } else if (response.status === 404) {
        alert('Post not found. It may have already been deleted.');
        router.push('/admin/posts');
      } else {
        const error = await response.json().catch(() => ({}));
        alert(error.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authError) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">Authentication Required</h1>
            <p className="text-gray-600 mb-4">Please log in to access the admin panel.</p>
            <Link href="/admin/login" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Go to Login
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (isLoadingPost) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFBF8' }}>
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2" style={{ color: '#14221C' }}>
            Edit Post
          </h1>
          <h2 className="font-urdu text-xl md:text-2xl rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            مضمون میں تبدیلی کریں
          </h2>
          <p className="text-gray-600 mt-2">
            Make changes to your blog post and save when ready.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'basic', label: 'Basic Info', icon: '📝' },
                { key: 'content', label: 'Content', icon: '✍️' },
                { key: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#14221C' }}>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Title */}
            <div className="bg-white rounded-lg shadow p-6">
              <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-2">
                English Title *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="titleEn"
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
            <div className="bg-white rounded-lg shadow p-6">
              <label htmlFor="titleUr" className="block text-sm font-medium text-gray-700 mb-2">
                Urdu Title (اردو عنوان)
              </label>
              <input
                type="text"
                id="titleUr"
                value={formData.titleUr}
                onChange={(e) => setFormData({ ...formData, titleUr: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent font-urdu rtl"
                placeholder="اردو میں عنوان درج کریں"
              />
            </div>

            {/* English Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <label htmlFor="summaryEn" className="block text-sm font-medium text-gray-700 mb-2">
                English Summary
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
            <div className="bg-white rounded-lg shadow p-6">
              <label htmlFor="summaryUr" className="block text-sm font-medium text-gray-700 mb-2">
                Urdu Summary (اردو خلاصہ)
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
            <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
            </div>
          </div>

          {/* Cover Image Selector */}
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
              Edit your post content using the rich text editor below.
            </p>
            
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Edit your post content here..."
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
                Published (visible to readers)
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Deleting...' : 'Delete Post'}
            </button>
            
            <div className="flex space-x-4">
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
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
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