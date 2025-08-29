import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper functions for database operations
export async function getPublishedPosts(limit?: number) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    include: {
      comments: {
        where: { approved: true },
        select: { id: true },
      },
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      comments: {
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

export async function getSiteMeta() {
  return prisma.siteMeta.findUnique({
    where: { id: 'main' },
  });
}

export async function createComment(data: {
  postId: string;
  name: string;
  email?: string;
  content: string;
  ipHash?: string;
}) {
  return prisma.comment.create({
    data: {
      ...data,
      approved: false, // Will be auto-approved after spam checks
    },
  });
}

export function parseTagsString(tagsString: string): string[] {
  return tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];
}

export function formatTagsArray(tags: string[]): string {
  return tags.join(',');
}
