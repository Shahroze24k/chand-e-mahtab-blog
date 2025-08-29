import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { content, language = 'english', maxLength = 150 } = await request.json();

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

    const result = await generateSummary(content, language, maxLength);

    return NextResponse.json({
      success: true,
      summary: result.summary,
      keyPoints: result.keyPoints,
      language,
      originalLength: content.length,
      summaryLength: result.summary.length
    });

  } catch (error) {
    console.error('Summarization API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
