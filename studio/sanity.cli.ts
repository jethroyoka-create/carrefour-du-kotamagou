import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'carrefour-kotamagou',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'carrefour-du-kotamagou',
});
