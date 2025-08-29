import { NextRequest, NextResponse } from 'next/server';
import { getContentSuggestions } from '@/lib/ai';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Only authenticated admin can use this endpoint
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { content, language = 'english' } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (!['english', 'urdu'].includes(language)) {
      return NextResponse.json(
        { error: 'Language must be "english" or "urdu"' },
        { status: 400 }
      );
    }

    const suggestions = await getContentSuggestions(content, language);

    return NextResponse.json({
      success: true,
      suggestions,
      language,
      contentLength: content.length
    });

  } catch (error) {
    console.error('Content suggestions API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate content suggestions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
