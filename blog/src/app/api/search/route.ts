import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Search in published posts
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          {
            titleEn: {
              contains: query,
            },
          },
          {
            titleUr: {
              contains: query,
            },
          },
          {
            summaryEn: {
              contains: query,
            },
          },
          {
            summaryUr: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
          {
            tags: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        _count: {
          select: { comments: true }
        }
      }
    });

    return NextResponse.json({
      query,
      results: posts,
      count: posts.length,
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
