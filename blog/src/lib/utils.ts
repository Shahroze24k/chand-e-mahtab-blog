import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { marked } from 'marked';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (locale.startsWith('ur')) {
    return dateObj.toLocaleDateString('ur-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  // Strip HTML tags for word count
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = textContent.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(words / wordsPerMinute);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Alias for slugify to match API usage
export const generateSlug = slugify;

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function containsUrl(text: string): boolean {
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const matches = text.match(urlRegex);
  return matches ? matches.length > 1 : false; // Allow one URL, block more
}

export function parseTagsString(tagsString: string): string[] {
  return tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];
}

export function formatTagsArray(tags: string[]): string {
  return tags.join(',');
}

export function parseMarkdown(content: string): string {
  // Configure marked for better security and formatting
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // Enable GitHub Flavored Markdown
    headerIds: false, // Disable header IDs for security
    mangle: false, // Don't mangle email addresses
  });
  
  return marked(content) as string;
}

// Helper function to detect if content is markdown
export function isMarkdownContent(content: string): boolean {
  const markdownPatterns = [
    /^#+\s/m, // Headers
    /\*\*.*\*\*/,  // Bold
    /\*.*\*/,      // Italic (less specific)
    /^>\s/m,       // Blockquotes
    /^-\s/m,       // Unordered lists
    /^\d+\.\s/m,   // Ordered lists
    /^---+$/m,     // Horizontal rules
    /\[.*\]\(.*\)/, // Links
    /`.*`/,        // Inline code
  ];
  
  // If content contains HTML tags, it's likely already HTML
  if (/<[^>]*>/g.test(content)) {
    return false;
  }
  
  // Check if any markdown patterns exist
  return markdownPatterns.some(pattern => pattern.test(content));
}

// Enhanced content processor that handles both markdown and HTML
export function processPostContent(content: string): string {
  if (isMarkdownContent(content)) {
    return parseMarkdown(content);
  }
  return content;
}
