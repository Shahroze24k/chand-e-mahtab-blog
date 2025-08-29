import { NextRequest, NextResponse } from 'next/server';
import { translateText } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      );
    }

    if (!['english', 'urdu'].includes(targetLanguage)) {
      return NextResponse.json(
        { error: 'Target language must be "english" or "urdu"' },
        { status: 400 }
      );
    }

    const result = await translateText(text, targetLanguage);

    return NextResponse.json({
      success: true,
      originalText: text,
      translatedText: result.translatedText,
      targetLanguage,
      confidence: result.confidence
    });

  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    );
  }
}
