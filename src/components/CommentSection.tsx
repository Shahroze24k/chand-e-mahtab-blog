'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';

interface Comment {
  id: string;
  name: string;
  email?: string | null;
  content: string;
  approved: boolean;
  createdAt: Date;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

interface CommentFormData {
  name: string;
  email: string;
  content: string;
  honeypot: string; // Anti-spam field
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const [formData, setFormData] = useState<CommentFormData>({
    name: '',
    email: '',
    content: '',
    honeypot: '', // Hidden field for spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const approvedComments = comments.filter(comment => comment.approved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.content.trim()) {
      setErrorMessage('Name and comment are required.');
      setSubmitStatus('error');
      return;
    }

    // Check honeypot (anti-spam)
    if (formData.honeypot) {
      setErrorMessage('Spam detected.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          name: formData.name.trim(),
          email: formData.email.trim() || undefined,
          content: formData.content.trim(),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', content: '', honeypot: '' });
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Failed to submit comment');
        setSubmitStatus('error');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border-t pt-8" style={{ borderColor: 'rgba(20, 34, 28, 0.1)' }}>
        {/* Comments Header */}
        <div className="mb-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-2" style={{ color: '#14221C' }}>
            Comments ({approvedComments.length})
          </h2>
          <h3 className="font-urdu text-lg rtl" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            تبصرے ({approvedComments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <div className="mb-12 p-6 rounded-lg" style={{ backgroundColor: '#FAFBF8' }}>
          <h3 className="font-playfair text-xl font-semibold mb-4" style={{ color: '#14221C' }}>
            Leave a Comment
          </h3>
          <p className="font-urdu text-sm rtl mb-6" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
            اپنا تبصرہ لکھیں
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#14221C' }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ 
                    borderColor: 'rgba(11, 93, 30, 0.2)',
                    '--tw-ring-color': '#0B5D1E'
                  } as React.CSSProperties}
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#14221C' }}
                >
                  Email (optional)
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
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="content" 
                className="block text-sm font-medium mb-2" 
                style={{ color: '#14221C' }}
              >
                Comment *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-vertical"
                style={{ 
                  borderColor: 'rgba(11, 93, 30, 0.2)',
                  '--tw-ring-color': '#0B5D1E'
                } as React.CSSProperties}
                placeholder="Share your thoughts..."
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(11, 93, 30, 0.1)', color: '#0B5D1E' }}>
                Thank you! Your comment has been submitted and is awaiting approval.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}>
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
                * Required fields. Comments are moderated.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: '#0B5D1E', color: '#FAFBF8' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Comment'}
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {approvedComments.length > 0 ? (
            approvedComments.map((comment) => (
              <div
                key={comment.id}
                className="p-6 rounded-lg border"
                style={{ 
                  backgroundColor: 'white',
                  borderColor: 'rgba(20, 34, 28, 0.1)'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium" style={{ color: '#14221C' }}>
                    {comment.name}
                  </h4>
                  <time 
                    className="text-sm" 
                    style={{ color: 'rgba(20, 34, 28, 0.6)' }}
                    dateTime={comment.createdAt.toISOString()}
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                <p className="leading-relaxed" style={{ color: 'rgba(20, 34, 28, 0.8)' }}>
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
                No comments yet. Be the first to share your thoughts!
              </p>
              <p className="font-urdu text-lg rtl mt-2" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
                ابھی تک کوئی تبصرہ نہیں۔ پہلے بننے والے بنیں!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
