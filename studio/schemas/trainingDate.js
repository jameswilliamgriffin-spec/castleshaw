import { defineField, defineType } from 'sanity'

// One upcoming date for a course, with its prices. Dates in the past drop off the site automatically.
export default defineType({
  name: 'trainingDate',
  title: 'Course date',
  type: 'document',
  fields: [
    defineField({ name: 'course', title: 'Course', type: 'reference', to: [{ type: 'trainingCourse' }], validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'time', title: 'Time (optional)', type: 'string', description: 'e.g. “9.30am to 3.30pm”.' }),
    defineField({ name: 'venue', title: 'Where', type: 'string', initialValue: 'Castleshaw Centre' }),
    defineField({ name: 'priceMember', title: 'Price for members', type: 'string', description: 'e.g. “£45” or “Free (one place a year)”.' }),
    defineField({ name: 'priceStandard', title: 'Price for non-members', type: 'string', description: 'e.g. “£90”. Leave empty if members only.' }),
    defineField({
      name: 'status', title: 'Places', type: 'string', initialValue: 'open',
      options: { list: [{ title: 'Places available', value: 'open' }, { title: 'Few places left', value: 'few' }, { title: 'Full', value: 'full' }], layout: 'radio', direction: 'horizontal' },
    }),
  ],
  orderings: [{ title: 'Soonest first', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: {
    select: { course: 'course.name', date: 'date', status: 'status' },
    prepare: ({ course, date, status }) => ({ title: course || 'Course date', subtitle: [date, status === 'full' ? 'Full' : status === 'few' ? 'Few places' : ''].filter(Boolean).join(' · ') }),
  },
})
