 // src/pages/rss.xml.ts

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { filterDrafts, sortByDate } from '../utils';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const sortedPosts = sortByDate(filterDrafts(posts));

  return rss({
    title: 'Acme Ltd Blog',
    description: 'Tech & Marketing insights to help your business grow',
    site: context.site ?? 'https://ovixdev.github.io/acme-blog-pro',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author,
      link: `/acme-blog-pro/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}