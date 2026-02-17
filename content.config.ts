import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cases: defineCollection({
      type: 'data',
      source: 'cases/*.md',
      schema: z.object({
        title: z.string(),
        context: z.string(),
        problem: z.string(),
        approach: z.string(),
        result: z.string(),
        stack: z.array(z.string()),
      }),
    }),
  },
})
