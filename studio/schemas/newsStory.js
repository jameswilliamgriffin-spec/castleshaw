import { defineField, defineType } from 'sanity'

// A news story: shown on /news/ and on its own page, newest first.
export default defineType({
  name: 'newsStory',
  title: 'News story',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string', validation: (r) => r.required().max(80) }),
    defineField({
      name: 'slug', title: 'Web address', type: 'slug',
      description: 'The end of the story’s address, e.g. raising-the-roof. Press “Generate” to make it from the headline.',
      options: { source: 'title', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'dateShows', title: 'Show the date as', type: 'string', initialValue: 'month',
      options: { list: [{ title: '14 March 2024', value: 'day' }, { title: 'March 2024', value: 'month' }, { title: '2024', value: 'year' }], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'image', title: 'Photo', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the photo', type: 'string', description: 'For people who can’t see it, e.g. “Two people on paddleboards on the reservoir”.', validation: (r) => r.required() })],
    }),
    defineField({
      name: 'summary', title: 'Summary (optional)', type: 'text', rows: 2,
      description: 'One sentence for the News page. Leave empty to use the story’s first sentence.',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'body', title: 'Story', type: 'array',
      description: 'Plain paragraphs. You can add links.',
      of: [{ type: 'block', styles: [{ title: 'Paragraph', value: 'normal' }], lists: [], marks: { decorators: [], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'Address', validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) }] }] } }],
      validation: (r) => r.required().min(1),
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date', media: 'image' } },
})
