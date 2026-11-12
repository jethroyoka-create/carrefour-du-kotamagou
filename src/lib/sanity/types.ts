/**
 * Définitions TypeScript des 8 schémas Sanity + Singleton SiteSettings
 * Projet : Carrefour du Kotamagou
 */

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  credit?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface CulturalValidation {
  sensitivityLevel: 'standard' | 'sensible' | 'sacre';
  culturalValidated: boolean;
  rightsVerified: boolean;
  validationNote?: string;
}

export interface VideoChapter {
  _key: string;
  timestamp: string;
  title: string;
}

// -------------------------------------------------------------
// GROUPE A : Contenus éditoriaux (avec editorialStatus)
// -------------------------------------------------------------

export type EditorialStatus =
  | 'brouillon'
  | 'a_verifier'
  | 'pret_a_publier'
  | 'publie'
  | 'archive';

export interface Article {
  _id: string;
  _type: 'article';
  title: string;
  slug: { current: string };
  articleType: 'actualite' | 'reportage' | 'interview' | 'dossier' | 'culture' | 'histoire' | 'enquete' | 'analyse';
  excerpt: string;
  mainImage?: SanityImage;
  body?: any[];
  publishedAt: string;
  author: string;
  editorialStatus: EditorialStatus;
  culturalValidation?: CulturalValidation;
  category?: Category;
  relatedPersons?: Person[];
  relatedTerritories?: Territory[];
  relatedClans?: Clan[];
  relatedDitammariTerms?: DitammariTerm[];
  sources?: Source[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Video {
  _id: string;
  _type: 'video';
  title: string;
  slug: { current: string };
  youtubeId: string;
  duration?: string;
  publishedDate?: string;
  language: 'francais' | 'ditammari' | 'ditammari_st_fr' | 'mixte';
  summary: string;
  transcription?: any[];
  chapters?: VideoChapter[];
  editorialStatus: EditorialStatus;
  culturalValidation?: CulturalValidation;
  category?: Category;
  speakers?: Person[];
  territories?: Territory[];
  clans?: Clan[];
  ditammariTerms?: DitammariTerm[];
  sources?: Source[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

// -------------------------------------------------------------
// GROUPE B : Entités documentaires & taxonomies (sans editorialStatus)
// -------------------------------------------------------------

export interface Person {
  _id: string;
  _type: 'person';
  name: string;
  slug: { current: string };
  role: string;
  bio?: string;
  photo?: SanityImage;
  territory?: Territory;
  clan?: Clan;
  active?: boolean;
}

export interface Territory {
  _id: string;
  _type: 'territory';
  name: string;
  slug: { current: string };
  country: 'benin' | 'togo' | 'transfrontalier';
  administrativeRegion?: string;
  isUnescoSite?: boolean;
  description?: string;
  photo?: SanityImage;
}

export interface Clan {
  _id: string;
  _type: 'clan';
  name: string;
  slug: { current: string };
  originStory?: string;
  oralSource?: string;
  territories?: Territory[];
  validatedByElders?: boolean;
  notes?: string;
}

export interface Category {
  _id: string;
  _type?: 'category';
  title: string;
  slug: { current: string };
  pillar: 'media' | 'documentation';
  description?: string;
  displayOrder?: number;
}

export interface DitammariTerm {
  _id: string;
  _type: 'ditammariTerm';
  term: string;
  slug: { current: string };
  frenchTranslation: string;
  phonetic?: string;
  definition: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  linguisticValidation: 'valide' | 'en_attente';
  source?: Source;
}

export interface Source {
  _id: string;
  _type: 'source';
  title: string;
  slug: { current: string };
  author: string;
  sourceType:
    | 'livre'
    | 'article_scientifique'
    | 'these'
    | 'rapport_unesco'
    | 'archive_orale'
    | 'site_web';
  year?: number;
  publisher?: string;
  url?: string;
  annotation?: string;
}

// -------------------------------------------------------------
// SINGLETON : Configuration générale du média
// -------------------------------------------------------------

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  title: string;
  subtitle: string;
  signature: string;
  description: string;
  contactEmail?: string;
  officialSocialLinks?: {
    youtube?: string;
    facebook?: string;
    tiktok?: string;
  };
}
