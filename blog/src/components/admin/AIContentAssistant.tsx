'use client';

import { useState, useCallback } from 'react';

interface AIContentAssistantProps {
  content: string;
  onContentUpdate?: (content: string) => void;
  className?: string;
}

export default function AIContentAssistant({ 
  content, 
  onContentUpdate, 
  className = ''
}: AIContentAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'suggestions' | 'content-translate'>('suggestions');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const generateSuggestions = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, language: 'english' }),
      });
      
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.suggestions);
      } else {
        console.error('API Error:', data.error, data.details);
        alert(`Failed to get suggestions: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      alert('Network error: Could not connect to AI service');
    } finally {
      setIsLoading(false);
    }
  };



  const addUrduTranslation = async () => {
    if (!content.trim()) {
      alert('Please add some content first');
      return;
    }
    
    console.log('Starting content translation with content length:', content.length);
    console.log('onContentUpdate function available:', !!onContentUpdate);
    

    
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content, targetLanguage: 'urdu' }),
      });
      
      const data = await response.json();
      console.log('Content translation response:', data);
      if (data.success && onContentUpdate) {
        // Add Urdu translation to the end of the content
        const separator = '\n\n---\n\n';
        const urduHeader = '<h2 class="font-urdu text-right">اردو ترجمہ</h2>\n\n';
        const urduContent = `<div class="font-urdu text-right" dir="rtl">${data.translatedText}</div>`;
        const updatedContent = content + separator + urduHeader + urduContent;
        console.log('Calling onContentUpdate with updated content length:', updatedContent.length);
        
        // Direct callback execution
        onContentUpdate(updatedContent);
        setSuccessMessage('Urdu translation added to the end of your content! Scroll down in the editor to see it.');
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        console.error('Content translation failed:', data);
        alert(`Failed to translate: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to translate:', error);
      alert('Network error: Could not connect to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`ai-assistant bg-white rounded-lg border shadow-sm ${className}`}>
      <div className="border-b p-4">
        <h3 className="font-semibold text-lg" style={{ color: '#14221C' }}>
          🤖 AI Content Assistant
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Get AI-powered suggestions to improve your content
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { key: 'suggestions', label: '💡 Suggestions', icon: '💡' },
          { key: 'content-translate', label: '🌐 Add Urdu Translation', icon: '🌐' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key as any);
              setSuccessMessage('');
            }}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✅</span>
              <p className="text-sm text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                generateSuggestions();
              }}
              disabled={isLoading || !content.trim()}
              className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                '✨ Get AI Suggestions'
              )}
            </button>

            {suggestions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Improvement Suggestions:</h4>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}



        {/* Content Translation Tab */}
        {activeTab === 'content-translate' && (
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addUrduTranslation();
              }}
              disabled={isLoading || !content.trim()}
              className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Translating...
                </>
              ) : (
                '🌐 Add Urdu Translation to Content'
              )}
            </button>


            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <p className="text-sm text-gray-700">
                  <strong>💡 How it works:</strong> This will translate your entire post content to Urdu and add it to the end of your post with proper RTL formatting.
                </p>
              </div>
              {!content.trim() && (
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-gray-700">
                    ⚠️ Please add some content to your post first before translating.
                  </p>
                </div>
              )}
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm text-gray-700">
                  <span className="font-urdu">✨ نتیجہ:</span> The Urdu translation will be added at the end with a "اردو ترجمہ" header and proper right-to-left formatting.
                </p>
              </div>
            </div>
          </div>
        )}

        {!content.trim() && (
          <div className="text-center py-8 text-gray-500">
            <p>Start writing content to get AI-powered suggestions!</p>
          </div>
        )}
      </div>
    </div>
  );
}
