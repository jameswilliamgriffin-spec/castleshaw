import { defineField, defineType } from 'sanity'

// The centre's licence and badge numbers: one record, shown wherever the site mentions them
// (footer, Accreditation page, advice page, homepage film and activities pages).
export default defineType({
  name: 'accreditation',
  title: 'Accreditation',
  type: 'document',
  fields: [
    defineField({ name: 'aala', title: 'AALA licence number', type: 'string', description: 'e.g. L194369', validation: (r) => r.required().max(20) }),
    defineField({
      name: 'aalaCovers', title: 'What the AALA licence covers', type: 'string',
      description: 'Finishes the sentence “Licensed by AALA for …”, e.g. “climbing, watersports and trekking”.',
      validation: (r) => r.required().max(80),
    }),
    defineField({ name: 'lotc', title: 'LOtC Quality Badge number', type: 'string', description: 'e.g. 101040', validation: (r) => r.required().max(20) }),
  ],
  preview: { select: { aala: 'aala', lotc: 'lotc' }, prepare: ({ aala, lotc }) => ({ title: 'Accreditation', subtitle: `AALA ${aala || '?'} · LOtC ${lotc || '?'}` }) },
})
