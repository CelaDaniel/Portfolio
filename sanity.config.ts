import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { markdownSchema } from 'sanity-plugin-markdown';
import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';

export default defineConfig({
  name: 'default',
  title: 'alexanderkonietzko.vercel.app',
  projectId: 'evkyvibr',
  dataset: 'production',
  plugins: [
    deskTool(),
    markdownSchema(),
    media(),
    visionTool({
      defaultApiVersion: '2022-08-15',
      defaultDataset: 'production',
    }),
  ],
  schema: {
    types: [
      {
        name: 'post',
        type: 'document',
        title: 'Post',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
            },
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown',
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'string',
          },
          {
            name: 'date',
            title: 'Date',
            type: 'datetime',
          },
          {
            name: 'language',
            title: 'Language',
            type: 'string',
          },
          {
            name: 'translation',
            title: 'Translation',
            type: 'string',
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
      },
    ],
  },
});
