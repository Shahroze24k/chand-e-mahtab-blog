import { NextRequest, NextResponse } from 'next/server';
import { moderateComment } from '@/lib/ai';
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

    const { comment } = await request.json();

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment is required' },
        { status: 400 }
      );
    }

    const result = await moderateComment(comment);

    return NextResponse.json({
      success: true,
      comment,
      moderation: {
        action: result.action,
        reason: result.reason,
        confidence: result.confidence,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Moderation API error:', error);
    return NextResponse.json(
      { error: 'Failed to moderate comment' },
      { status: 500 }
    );
  }
}
