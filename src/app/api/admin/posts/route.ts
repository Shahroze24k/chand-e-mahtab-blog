import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      titleEn,
      titleUr,
      summaryEn,
      summaryUr,
      content,
      tags,
      published,
      coverImage,
    } = await request.json();

    // Validate required fields
    if (!titleEn || !content) {
      return NextResponse.json(
        { error: 'Title (English) and content are required' },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = slugify(titleEn);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        slug,
        titleEn,
        titleUr: titleUr || null,
        summaryEn: summaryEn || null,
        summaryUr: summaryUr || null,
        content,
        tags: tags || '',
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
        coverImage: coverImage || null,
      },
    });

    return NextResponse.json({
      message: 'Post created successfully',
      post: {
        id: post.id,
        slug: post.slug,
        titleEn: post.titleEn,
        published: post.published,
      },
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all posts for admin
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { comments: true }
        }
      }
    });

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

