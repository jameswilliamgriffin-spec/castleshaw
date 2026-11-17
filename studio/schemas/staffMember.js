import { defineField, defineType } from 'sanity'

// A member of staff: one card in "Our team" on the About page, in page order.
export default defineType({
  name: 'staffMember',
  title: 'Staff member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required().max(60) }),
    defineField({ name: 'role', title: 'Job title', type: 'string', description: 'e.g. “Senior tutor”. Leave empty if you’d rather not show one.', validation: (r) => r.max(60) }),
    defineField({
      name: 'group', title: 'Show under', type: 'string', initialValue: 'team',
      options: { list: [{ title: 'Our team', value: 'team' }, { title: 'Part-time staff', value: 'part-time' }], layout: 'radio', direction: 'horizontal' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true },
      description: 'A clear photo of their face. After uploading, use the crop tool to put the focus on their face: the site shows a tall oval cut from the middle of that area.',
      fields: [defineField({ name: 'alt', title: 'Describe the photo (optional)', type: 'string', description: 'Leave empty to use their name.' })],
    }),
    defineField({ name: 'about', title: 'Specialisms (optional)', type: 'string', description: 'One short line, e.g. “Caving and paddlesport”.', validation: (r) => r.max(90) }),
    defineField({ name: 'order', title: 'Position on the page', type: 'number', description: '1 comes first. Gaps are fine (10, 20, 30…), so you can slot people in between.', initialValue: 100 }),
  ],
  orderings: [{ title: 'Page order', name: 'order', by: [{ field: 'group', direction: 'desc' }, { field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', role: 'role', group: 'group', media: 'photo' },
    prepare: ({ title, role, group, media }) => ({ title, subtitle: [role, group === 'part-time' ? 'Part-time' : null].filter(Boolean).join(' · '), media }),
  },
})
