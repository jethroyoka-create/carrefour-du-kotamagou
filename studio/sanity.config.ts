import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'carrefour-kotamagou';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'carrefour-du-kotamagou',
  title: 'Carrefour du Kotamagou — Back-Office',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
