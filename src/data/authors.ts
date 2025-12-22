// src/data/authors.ts

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export const authors: Record<string, Author> = {
  'jane-smith': {
    id: 'jane-smith',
    name: 'Jane Smith',
    role: 'CEO & Founder',
    bio: 'Jane has 15 years of experience in tech and marketing leadership. She founded Acme Ltd to help businesses grow through practical strategies.',
    avatar: 'jane-smith.jpg',
    social: {
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
    },
  },
  'john-doe': {
    id: 'john-doe',
    name: 'John Doe',
    role: 'Head of Content',
    bio: 'John is a former journalist with a passion for storytelling. He leads our content strategy and writes about marketing and business growth.',
    avatar: 'john-doe.jpg',
    social: {
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
    },
  },
  'sarah-johnson': {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Tech Lead',
    bio: 'Sarah is a full-stack developer and open source contributor. She writes about TypeScript, web development, and engineering best practices.',
    avatar: 'sarah-johnson.jpg',
    social: {
      github: 'https://github.com/sarahjohnson',
      website: 'https://sarahjohnson.dev',
    },
  },
};

export function getAvatarUrl(filename: string | undefined): string | undefined {
  if (!filename) return undefined;
  const base = import.meta.env.BASE_URL;
  return `${base}/avatars/${filename}`.replace(/\/+/g, '/');
}

export function getAuthorById(id: string): Author | undefined {
  return authors[id];
}

export function getAuthorByName(name: string): Author | undefined {
  return Object.values(authors).find((author) => author.name.toLowerCase() === name.toLowerCase());
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
