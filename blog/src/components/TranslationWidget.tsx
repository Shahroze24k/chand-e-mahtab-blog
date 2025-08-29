'use client';

import { useState } from 'react';

interface TranslationWidgetProps {
  text: string;
  className?: string;
}

export default function TranslationWidget({ text, className = '' }: TranslationWidgetProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<'english' | 'urdu'>('urdu');
  const [showTranslation, setShowTranslation] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setIsTranslating(true);
    try {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.substring(0, 1000), // Limit to 1000 chars
          targetLanguage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTranslatedText(data.translatedText);
        setShowTranslation(true);
      } else {
        console.error('Translation failed:', data.error);
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className={`translation-widget ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
          style={{
            backgroundColor: 'rgba(11, 93, 30, 0.1)',
            color: '#0B5D1E',
            border: '1px solid rgba(11, 93, 30, 0.2)'
          }}
        >
          {isTranslating ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Translating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Translate to {targetLanguage === 'urdu' ? 'Urdu' : 'English'}
            </>
          )}
        </button>

        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value as 'english' | 'urdu')}
          className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          style={{ borderColor: 'rgba(11, 93, 30, 0.2)' }}
        >
          <option value="urdu">اردو (Urdu)</option>
          <option value="english">English</option>
        </select>
      </div>

      {showTranslation && translatedText && (
        <div 
          className="p-4 rounded-lg border-l-4 bg-gray-50"
          style={{ borderLeftColor: '#0B5D1E' }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm" style={{ color: '#0B5D1E' }}>
              Translation ({targetLanguage === 'urdu' ? 'اردو' : 'English'}):
            </h4>
            <button
              onClick={() => setShowTranslation(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p 
            className={`text-sm leading-relaxed ${targetLanguage === 'urdu' ? 'font-urdu rtl' : ''}`}
            style={{ color: '#14221C' }}
          >
            {translatedText}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            ✨ AI-powered translation • May not be 100% accurate
          </div>
        </div>
      )}
    </div>
  );
}
