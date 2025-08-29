import { NextRequest, NextResponse } from 'next/server';
import { createComment, prisma } from '@/lib/db';
import { containsUrl, isValidEmail } from '@/lib/utils';
import crypto from 'crypto';

// Simple bad words filter - you can expand this list
const BAD_WORDS = [
  'spam', 'fake', 'scam', 'viagra', 'casino', 'porn',
  // Add Urdu profanity as needed
];

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

function isRateLimited(ipHash: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ipHash);
  
  if (!record) {
    rateLimitStore.set(ipHash, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return false;
  }
  
  if (now > record.resetTime) {
    rateLimitStore.set(ipHash, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return false;
  }
  
  if (record.count >= 3) { // Max 3 comments per hour
    return true;
  }
  
  record.count++;
  return false;
}

function containsBadWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return BAD_WORDS.some(word => lowerText.includes(word));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, name, email, content } = body;

    // Validation
    if (!postId || !name || !content) {
      return NextResponse.json(
        { message: 'Post ID, name, and content are required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { message: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (typeof content !== 'string' || content.trim().length < 10) {
      return NextResponse.json(
        { message: 'Comment must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Anti-spam checks
    const clientIP = getClientIP(request);
    const ipHash = hashIP(clientIP);

    // Rate limiting
    if (isRateLimited(ipHash)) {
      return NextResponse.json(
        { message: 'Too many comments. Please wait before submitting again.' },
        { status: 429 }
      );
    }

    // Check for URLs (allow max 1)
    if (containsUrl(content)) {
      return NextResponse.json(
        { message: 'Comments with multiple links are not allowed' },
        { status: 400 }
      );
    }

    // Check for bad words
    if (containsBadWords(content) || containsBadWords(name)) {
      return NextResponse.json(
        { message: 'Your comment contains inappropriate content' },
        { status: 400 }
      );
    }

    // Create comment (auto-approve if passes all checks)
    const comment = await createComment({
      postId,
      name: name.trim(),
      email: email?.trim(),
      content: content.trim(),
      ipHash,
    });

    // Auto-approve clean comments
    await prisma.comment.update({
      where: { id: comment.id },
      data: { approved: true },
    });

    return NextResponse.json(
      { 
        message: 'Comment submitted successfully!',
        commentId: comment.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating comment:', error);
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
