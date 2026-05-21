import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dataroom = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dataroom' }),
  schema: z.object({
    section: z.string(),
    slug: z.string(),
    title: z.string().optional(),
  }),
});

export const collections = { dataroom };
