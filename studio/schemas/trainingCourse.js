import { defineField, defineType } from 'sanity'

// A training course: one card on the Training page.
export default defineType({
  name: 'trainingCourse',
  title: 'Training course',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Course name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Short name', type: 'slug',
      description: 'Used in links to this course, e.g. evc. Keep it short.',
      options: { source: 'name', maxLength: 30 }, validation: (r) => r.required(),
    }),
    defineField({ name: 'length', title: 'Length', type: 'string', description: 'e.g. “One day” or “Three hours”.' }),
    defineField({ name: 'audience', title: 'Who it’s for', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required().max(400) }),
    defineField({ name: 'order', title: 'Position on the page', type: 'number', description: '1 comes first.', initialValue: 10 }),
    defineField({ name: 'featured', title: 'Show it open on phones', type: 'boolean', description: 'Tick for the one course that matters most.', initialValue: false }),
  ],
  orderings: [{ title: 'Page order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'length' } },
})
