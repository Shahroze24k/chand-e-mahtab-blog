import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';

// GET - Fetch a single post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const {
      titleEn,
      titleUr,
      summaryEn,
      summaryUr,
      content,
      tags,
      published,
      coverImage,
    } = body;

    // Validate required fields
    if (!titleEn?.trim() || !content?.trim()) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    // Generate new slug if title changed
    let newSlug = existingPost.slug;
    if (titleEn.trim() !== existingPost.titleEn) {
      newSlug = slugify(titleEn);
      
      // Check if new slug already exists (excluding current post)
      const existingSlug = await prisma.post.findFirst({
        where: {
          slug: newSlug,
          NOT: { id }
        }
      });

      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now()}`;
      }
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        slug: newSlug,
        titleEn: titleEn.trim(),
        titleUr: titleUr?.trim() || null,
        summaryEn: summaryEn?.trim() || null,
        summaryUr: summaryUr?.trim() || null,
        content: content.trim(),
        tags: tags?.trim() || '',
        published: Boolean(published),
        publishedAt: published && !existingPost.publishedAt ? new Date() : existingPost.publishedAt,
        coverImage: coverImage?.trim() || null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Post updated successfully',
      post: updatedPost,
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete all comments first (cascade delete)
    await prisma.comment.deleteMany({
      where: { postId: id }
    });

    // Delete the post
    await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'Post deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}