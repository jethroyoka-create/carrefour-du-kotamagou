/**
 * Requêtes GROQ normalisées pour Astro SSG
 * Règle stricte : filtrage sur editorialStatus == "publie" pour tous les contenus éditoriaux (Groupe A)
 */

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  title,
  subtitle,
  signature,
  description,
  contactEmail,
  officialSocialLinks
}`;

export const categoriesQuery = `*[_type == "category"] | order(displayOrder asc, title asc){
  _id,
  _type,
  title,
  slug,
  pillar,
  description,
  displayOrder
}`;

export const articlesQuery = `*[_type == "article" && editorialStatus == "publie"] | order(publishedAt desc){
  _id,
  _type,
  title,
  slug,
  articleType,
  excerpt,
  mainImage,
  publishedAt,
  author,
  editorialStatus,
  culturalValidation,
  category->{
    _id,
    title,
    slug,
    pillar
  },
  relatedPersons[]->{
    _id,
    name,
    role
  },
  relatedTerritories[]->{
    _id,
    name,
    country
  }
}`;

export const featuredArticleQuery = `*[_type == "article" && editorialStatus == "publie"] | order(publishedAt desc)[0]{
  _id,
  _type,
  title,
  slug,
  articleType,
  excerpt,
  mainImage,
  publishedAt,
  author,
  category->{
    _id,
    title,
    slug
  }
}`;

export const videosQuery = `*[_type == "video" && editorialStatus == "publie"] | order(publishedDate desc){
  _id,
  _type,
  title,
  slug,
  youtubeId,
  duration,
  publishedDate,
  language,
  summary,
  chapters,
  editorialStatus,
  culturalValidation,
  category->{
    _id,
    title,
    slug
  },
  speakers[]->{
    _id,
    name,
    role
  },
  territories[]->{
    _id,
    name,
    country
  }
}`;

export const personsQuery = `*[_type == "person" && active != false] | order(name asc){
  _id,
  _type,
  name,
  slug,
  role,
  bio,
  photo,
  territory->{
    name,
    country
  },
  clan->{
    name
  }
}`;

export const territoriesQuery = `*[_type == "territory"] | order(country asc, name asc){
  _id,
  _type,
  name,
  slug,
  country,
  administrativeRegion,
  isUnescoSite,
  description,
  photo
}`;

export const clansQuery = `*[_type == "clan"] | order(name asc){
  _id,
  _type,
  name,
  slug,
  originStory,
  oralSource,
  validatedByElders,
  territories[]->{
    name,
    country
  }
}`;

export const ditammariTermsQuery = `*[_type == "ditammariTerm"] | order(term asc){
  _id,
  _type,
  term,
  slug,
  frenchTranslation,
  phonetic,
  definition,
  exampleSentence,
  exampleTranslation,
  linguisticValidation,
  source->{
    title,
    author
  }
}`;

export const sourcesQuery = `*[_type == "source"] | order(year desc, title asc){
  _id,
  _type,
  title,
  slug,
  author,
  sourceType,
  year,
  publisher,
  url,
  annotation
}`;
