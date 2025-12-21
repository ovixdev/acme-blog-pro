// src/utils/index.ts

import type { CollectionEntry } from 'astro:content';

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
  const textOnly = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const words = textOnly.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
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
export function getUniqueTags(posts: CollectionEntry<'posts'>[]): string[] {
  const tags = posts.flatMap((post) => post.data.tags);
  return [...new Set(tags)].sort();
}

/**
 * Filters out draft posts in production
 */
export function filterDrafts(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
  if (import.meta.env.PROD) {
    return posts.filter((post) => !post.data.draft);
  }
  return posts;
}

/**
 * Sorts posts by date (newest first)
 */
export function sortByDate(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
  return [...posts].sort((a, b) => {
    const dateA = toDate(a.data.pubDate);
    const dateB = toDate(b.data.pubDate);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Gets related posts based on shared tags
 */
export function getRelatedPosts(
  currentPost: CollectionEntry<'posts'>,
  allPosts: CollectionEntry<'posts'>[],
  limit: number = 3
): CollectionEntry<'posts'>[] {
  const currentTags = currentPost.data.tags;

  const postsWithScore = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) => currentTags.includes(tag));
      return { post, score: sharedTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScore.slice(0, limit).map((item) => item.post);
}
