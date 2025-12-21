// src/utils/index.ts

/**
 * Ensures a value is a Date object
 */
export function toDate(date: Date | string): Date {
  return date instanceof Date ? date : new Date(date);
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  return toDate(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a date to a short string
 */
export function formatDateShort(date: Date | string): string {
  return toDate(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculates reading time for content
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Builds a URL with the base path
 */
export function buildUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\//, '');
  return `${base}/${cleanPath}`.replace(/\/+/g, '/');
}

/**
 * Gets unique tags from all posts
 */
export function getUniqueTags(posts: { data: { tags: string[] } }[]): string[] {
  const tags = posts.flatMap((post) => post.data.tags);
  return [...new Set(tags)].sort();
}

/**
 * Filters out draft posts in production
 */
export function filterDrafts<T extends { data: { draft: boolean } }>(posts: T[]): T[] {
  if (import.meta.env.PROD) {
    return posts.filter((post) => !post.data.draft);
  }
  return posts;
}

/**
 * Sorts posts by date (newest first)
 */
export function sortByDate<T extends { data: { pubDate: Date | string } }>(posts: T[]): T[] {
  return posts.sort((a, b) => {
    const dateA = toDate(a.data.pubDate);
    const dateB = toDate(b.data.pubDate);
    return dateB.getTime() - dateA.getTime();
  });
}