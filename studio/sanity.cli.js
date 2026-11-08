import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: { projectId: process.env.SANITY_STUDIO_PROJECT_ID, dataset: process.env.SANITY_STUDIO_DATASET || 'production' },
  // the Studio is published at https://castleshaw.sanity.studio (change if the name is taken)
  studioHost: 'castleshaw',
})
