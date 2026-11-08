import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// The editing app for the Castleshaw website. Two areas: News, and Training (courses and dates).
export default defineConfig({
  name: 'castleshaw',
  title: 'Castleshaw Centre website',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Website content').items([
        S.listItem().title('News stories').schemaType('newsStory').child(S.documentTypeList('newsStory').title('News stories').defaultOrdering([{ field: 'date', direction: 'desc' }])),
        S.divider(),
        S.listItem().title('Training').child(S.list().title('Training').items([
          S.listItem().title('Course dates and prices').schemaType('trainingDate').child(S.documentTypeList('trainingDate').title('Course dates and prices').defaultOrdering([{ field: 'date', direction: 'asc' }])),
          S.listItem().title('Courses').schemaType('trainingCourse').child(S.documentTypeList('trainingCourse').title('Courses').defaultOrdering([{ field: 'order', direction: 'asc' }])),
        ])),
      ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
