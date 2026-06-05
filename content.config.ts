import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    heritage: defineCollection({
      type: 'page',
      source: 'heritage/**/*.md',
    }),
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
    }),
    school: defineCollection({
      type: 'page',
      source: 'school/**/*.md',
    }),
  },
})
