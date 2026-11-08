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
        S.documentTypeListItem('newsStory').title('News stories'),
        S.divider(),
        S.listItem().title('Training').child(S.list().title('Training').items([
          S.documentTypeListItem('trainingDate').title('Course dates and prices'),
          S.documentTypeListItem('trainingCourse').title('Courses'),
        ])),
      ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
