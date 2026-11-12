// Objects
import blockContent from './objects/blockContent';
import culturalValidation from './objects/culturalValidation';
import chapter from './objects/chapter';
import seo from './objects/seo';

// Documents Groupe A (Contenus éditoriaux avec workflow à 5 statuts)
import article from './documents/article';
import video from './documents/video';

// Documents Groupe B (Entités documentaires et taxonomies)
import person from './documents/person';
import territory from './documents/territory';
import clan from './documents/clan';
import category from './documents/category';
import ditammariTerm from './documents/ditammariTerm';
import source from './documents/source';

// Singleton
import siteSettings from './documents/siteSettings';

export const schemaTypes = [
  // Objets
  blockContent,
  culturalValidation,
  chapter,
  seo,

  // Groupe A (Contenus éditoriaux)
  article,
  video,

  // Groupe B (Entités documentaires & taxonomies)
  person,
  territory,
  clan,
  category,
  ditammariTerm,
  source,

  // Singleton
  siteSettings,
];
