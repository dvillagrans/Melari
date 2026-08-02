import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.yaml' }),
  schema: z.object({
    name: z.string(),
    text: z.string(),
    img: z.string(),
    featured: z.boolean().default(false),
    provisional: z.boolean().default(false),
    slug: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.string().optional(),
    benefits: z.array(z.string()).optional(),
  }),
});

const highlights = defineCollection({
  loader: glob({ base: './src/content/highlights', pattern: '**/*.yaml' }),
  schema: z.object({
    title: z.string(),
    text: z.string(),
    img: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '**/*.yaml' }),
  schema: z.object({
    name: z.string(),
    location: z.string(),
    img: z.string(),
    review: z.string(),
    provisional: z.boolean().default(false),
  }),
});

const stats = defineCollection({
  loader: glob({ base: './src/content/stats', pattern: '**/*.yaml' }),
  schema: z.object({
    text: z.string(),
    num: z.number(),
    provisional: z.boolean().default(false),
  }),
});

export const collections = { services, highlights, testimonials, stats };
