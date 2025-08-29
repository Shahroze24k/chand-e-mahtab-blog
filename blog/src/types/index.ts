export interface Post {
  id: string;
  slug: string;
  titleEn: string;
  titleUr?: string | null;
  summaryEn?: string | null;
  summaryUr?: string | null;
  content: string;
  coverImage?: string | null;
  tags: string; // Comma-separated
  published: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  name: string;
  email?: string;
  content: string;
  approved: boolean;
  createdAt: Date;
  ipHash?: string;
  postId: string;
  post?: Post;
}

export interface SiteMeta {
  id: string;
  aboutEn: string;
  aboutUr: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  id: string;
  title: string;
  summary: string;
  slug: string;
  tags: string[];
}

export interface CommentFormData {
  name: string;
  email?: string;
  content: string;
  honeypot?: string; // Anti-spam field
}
