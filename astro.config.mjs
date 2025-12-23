// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ovixdev.github.io',
  base: '/acme-blog-pro',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap()],
  image: {
    // Image optimization settings
    domains: ['randomuser.me', 'images.unsplash.com', 'ui-avatars.com'],
    remotePatterns: [{ protocol: 'https' }],
  },
});
