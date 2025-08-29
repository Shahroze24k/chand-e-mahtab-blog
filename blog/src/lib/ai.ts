import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function moderateComment(content: string): Promise<{ isAppropriate: boolean; reason?: string }> {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.warn('GROQ_API_KEY not configured, skipping moderation');
      return { isAppropriate: true };
    }

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a content moderator. Analyze the following comment and determine if it contains inappropriate content like spam, hate speech, explicit content, or harassment. Respond with "appropriate" or "inappropriate" followed by a brief reason if inappropriate.'
        },
        {
          role: 'user',
          content: content
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.1,
      max_tokens: 100
    });

    const result = response.choices[0]?.message?.content?.toLowerCase() || '';
    const isAppropriate = result.includes('appropriate') && !result.includes('inappropriate');
    
    return {
      isAppropriate,
      reason: isAppropriate ? undefined : result
    };
  } catch (error) {
    console.error('Moderation error:', error);
    // Default to allowing comments if moderation fails
    return { isAppropriate: true };
  }
}

export async function generateSuggestions(content: string): Promise<string[]> {
  try {
    if (!process.env.GROQ_API_KEY) {
      return [];
    }

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Generate 3-5 short, relevant tag suggestions for the following blog post content. Return only the tags, comma-separated.'
        },
        {
          role: 'user',
          content: content.substring(0, 1000) // Limit content length
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.3,
      max_tokens: 50
    });

    const result = response.choices[0]?.message?.content || '';
    return result.split(',').map(tag => tag.trim()).filter(Boolean);
  } catch (error) {
    console.error('Suggestion generation error:', error);
    return [];
  }
}

export async function summarizeContent(content: string): Promise<string> {
  try {
    if (!process.env.GROQ_API_KEY) {
      return '';
    }

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Summarize the following blog post content in 2-3 sentences. Make it engaging and informative.'
        },
        {
          role: 'user',
          content: content.substring(0, 2000) // Limit content length
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.2,
      max_tokens: 150
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Summarization error:', error);
    return '';
  }
}

export async function translateText(text: string, targetLanguage: 'ur' | 'en'): Promise<string> {
  try {
    if (!process.env.GROQ_API_KEY) {
      return '';
    }

    const languageName = targetLanguage === 'ur' ? 'Urdu' : 'English';
    
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Translate the following text to ${languageName}. Maintain the original meaning and tone.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.1,
      max_tokens: 500
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Translation error:', error);
    return '';
  }
}
