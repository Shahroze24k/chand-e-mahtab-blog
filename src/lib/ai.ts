import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface TranslationResult {
  translatedText: string;
  confidence: number;
}

export interface SummaryResult {
  summary: string;
  keyPoints: string[];
}

export interface ModerationResult {
  action: 'APPROVE' | 'REJECT' | 'REVIEW';
  reason: string;
  confidence: number;
}

// Translation service
export async function translateText(
  text: string, 
  targetLanguage: 'english' | 'urdu'
): Promise<TranslationResult> {
  try {
    const prompt = targetLanguage === 'urdu' 
      ? `Translate the following text to Urdu. Maintain the tone and context. Only return the translation: ${text}`
      : `Translate the following text to English. Maintain the tone and context. Only return the translation: ${text}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const translatedText = completion.choices[0]?.message?.content?.trim() || '';
    
    return {
      translatedText,
      confidence: 0.85 // Approximate confidence
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
}

// Content summarization
export async function generateSummary(
  content: string,
  language: 'english' | 'urdu' = 'english',
  maxLength: number = 150
): Promise<SummaryResult> {
  try {
    const prompt = language === 'urdu'
      ? `اس مضمون کا ایک مختصر خلاصہ ${maxLength} الفاظ میں لکھیں اور 3-5 اہم نکات فراہم کریں:\n\n${content}`
      : `Write a concise summary of this article in ${maxLength} words and provide 3-5 key points:\n\n${content}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.4,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parse response to extract summary and key points
    const lines = response.split('\n').map(line => line.trim()).filter(Boolean);
    
    // The first paragraph is usually the summary
    let summary = '';
    const keyPoints = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // If it's the first substantial line and doesn't look like a bullet point, it's probably the summary
      if (!summary && line.length > 50 && !line.match(/^[•\-*\d]/) && !line.toLowerCase().includes('key point')) {
        summary = line;
      }
      
      // Look for key points
      if (line.match(/^\d+\./) || line.match(/^[•\-*]/) || line.toLowerCase().includes('key point')) {
        const point = line.replace(/^(\d+\.|[•\-*]|\s*key point\s*\d*:?\s*)/i, '').trim();
        if (point.length > 10) {
          keyPoints.push(point);
        }
      }
    }
    
    // If no summary found, use the whole response as summary
    if (!summary) {
      summary = response.substring(0, maxLength * 6).trim(); // Rough word to character conversion
    }

    return {
      summary,
      keyPoints
    };
  } catch (error) {
    console.error('Summary generation error:', error);
    throw new Error('Failed to generate summary');
  }
}

// Comment moderation
export async function moderateComment(comment: string): Promise<ModerationResult> {
  try {
    const prompt = `Analyze this comment for spam, inappropriate content, hate speech, or toxicity. 
    Respond with ONLY one of: APPROVE, REJECT, or REVIEW followed by a brief reason.
    Comment: "${comment}"`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.2,
      max_tokens: 100,
    });

    const response = completion.choices[0]?.message?.content || '';
    const lines = response.trim().split('\n');
    const actionLine = lines[0].toUpperCase();
    
    let action: 'APPROVE' | 'REJECT' | 'REVIEW' = 'REVIEW';
    if (actionLine.includes('APPROVE')) action = 'APPROVE';
    else if (actionLine.includes('REJECT')) action = 'REJECT';
    
    const reason = lines.slice(1).join(' ').trim() || 'AI moderation analysis';

    return {
      action,
      reason,
      confidence: 0.8
    };
  } catch (error) {
    console.error('Moderation error:', error);
    // Default to manual review on error
    return {
      action: 'REVIEW',
      reason: 'AI moderation failed, requires manual review',
      confidence: 0.0
    };
  }
}

// SEO meta generation
export async function generateSEOMeta(content: string, title: string) {
  try {
    const prompt = `Generate SEO metadata for this blog post:
    Title: ${title}
    Content: ${content.substring(0, 1000)}...
    
    Provide:
    1. Meta description (150-160 characters)
    2. 5-8 relevant keywords
    3. Social media description (shorter, engaging)`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.4,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    return {
      metaDescription: response.split('\n')[0] || '',
      keywords: response.split('\n').slice(1).join(' '),
      socialDescription: response.substring(0, 100) + '...'
    };
  } catch (error) {
    console.error('SEO generation error:', error);
    throw new Error('Failed to generate SEO metadata');
  }
}

// Content enhancement suggestions
export async function getContentSuggestions(content: string, language: 'english' | 'urdu' = 'english') {
  try {
    const prompt = language === 'urdu'
      ? `اس مضمون کو بہتر بنانے کے لیے 3-5 تجاویز دیں:\n\n${content}`
      : `Provide 3-5 suggestions to improve this blog post content:\n\n${content}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.6,
      max_tokens: 400,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parse suggestions more flexibly
    const lines = response.split('\n').map(line => line.trim()).filter(Boolean);
    const suggestions = [];
    
    for (const line of lines) {
      // Look for numbered items (1., 2., etc.), bullet points, or lines starting with **
      if (line.match(/^\d+\./) || line.match(/^[•\-*]/) || line.match(/^\*\*/)) {
        suggestions.push(line.replace(/^(\d+\.|[•\-*]|\*\*)\s*/, '').replace(/\*\*$/, '').trim());
      } else if (line.length > 20 && suggestions.length < 5) {
        // If no clear formatting, treat longer lines as suggestions
        suggestions.push(line);
      }
    }
    
    return suggestions.length > 0 ? suggestions : ['Suggestion 1: Add more specific examples', 'Suggestion 2: Improve your introduction', 'Suggestion 3: Add relevant images'];
  } catch (error) {
    console.error('Content suggestions error:', error);
    throw new Error('Failed to generate content suggestions');
  }
}
