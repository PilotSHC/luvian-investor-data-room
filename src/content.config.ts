import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dataroom = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/dataroom',
    // Astro's default `generateId` for the glob loader splits on `--`
    // and keeps only the trailing segment, which collapses our flat
    // `{section}--{slug}.md` layout into id `{slug}` and produces
    // collisions / unfindable entries when looked up by full id.
    // Use the full filename (minus extension) as the id so callers can
    // reliably do `getEntry('dataroom', `${section}--${slug}`)`.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    section: z.string(),
    slug: z.string(),
    title: z.string().optional(),
  }),
});

export const collections = { dataroom };
