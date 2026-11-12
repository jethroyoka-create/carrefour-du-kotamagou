/**
 * Requêtes GROQ normalisées et sécurisées pour Astro SSG
 * Projet : Carrefour du Kotamagou
 *
 * Règles strictes de sécurité et conformité coutumière :
 * - Groupe A (Articles & Vidéos) :
 *     1. editorialStatus == "publie"
 *     2. culturalValidation.rightsVerified == true (droits témoins vérifiés)
 *     3. Si culturalValidation.sensitivityLevel != "standard" => culturalValidation.culturalValidated == true
 * - Groupe B (Fonds documentaire & métadonnées) :
 *     - Clans : validatedByElders == true
 *     - Termes Ditammari : linguisticValidation == "valide"
 *     - Personnes : active != false
 * - Résilience : filtrage strict des références orphelines via [defined(_id)]
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

export const articlesQuery = `*[_type == "article" && editorialStatus == "publie" && culturalValidation.rightsVerified == true && (culturalValidation.sensitivityLevel == "standard" || culturalValidation.culturalValidated == true)] | order(publishedAt desc){
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
  "culturalValidation": {
    "culturalValidated": culturalValidation.culturalValidated,
    "rightsVerified": culturalValidation.rightsVerified,
    "sensitivityLevel": culturalValidation.sensitivityLevel
  },
  category->{
    _id,
    title,
    slug,
    pillar
  },
  relatedPersons[]->[defined(_id)]{
    _id,
    name,
    role
  },
  relatedTerritories[]->[defined(_id)]{
    _id,
    name,
    country
  }
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug && editorialStatus == "publie" && culturalValidation.rightsVerified == true && (culturalValidation.sensitivityLevel == "standard" || culturalValidation.culturalValidated == true)][0]{
  _id,
  _type,
  title,
  slug,
  articleType,
  excerpt,
  mainImage,
  body,
  publishedAt,
  author,
  editorialStatus,
  "culturalValidation": {
    "culturalValidated": culturalValidation.culturalValidated,
    "rightsVerified": culturalValidation.rightsVerified,
    "sensitivityLevel": culturalValidation.sensitivityLevel
  },
  category->{
    _id,
    title,
    slug,
    pillar
  },
  relatedPersons[]->[defined(_id)]{
    _id,
    name,
    role
  },
  relatedTerritories[]->[defined(_id)]{
    _id,
    name,
    country
  },
  relatedClans[]->[defined(_id)]{
    _id,
    name
  },
  relatedDitammariTerms[]->[defined(_id)]{
    _id,
    term,
    frenchTranslation
  },
  sources[]->[defined(_id)]{
    _id,
    title,
    author,
    year
  },
  seo
}`;

export const featuredArticleQuery = `*[_type == "article" && editorialStatus == "publie" && culturalValidation.rightsVerified == true && (culturalValidation.sensitivityLevel == "standard" || culturalValidation.culturalValidated == true)] | order(publishedAt desc)[0]{
  _id,
  _type,
  title,
  slug,
  articleType,
  excerpt,
  mainImage,
  publishedAt,
  author,
  "culturalValidation": {
    "culturalValidated": culturalValidation.culturalValidated,
    "rightsVerified": culturalValidation.rightsVerified,
    "sensitivityLevel": culturalValidation.sensitivityLevel
  },
  category->{
    _id,
    title,
    slug,
    pillar
  }
}`;

export const videosQuery = `*[_type == "video" && editorialStatus == "publie" && culturalValidation.rightsVerified == true && (culturalValidation.sensitivityLevel == "standard" || culturalValidation.culturalValidated == true)] | order(publishedDate desc){
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
  "culturalValidation": {
    "culturalValidated": culturalValidation.culturalValidated,
    "rightsVerified": culturalValidation.rightsVerified,
    "sensitivityLevel": culturalValidation.sensitivityLevel
  },
  category->{
    _id,
    title,
    slug,
    pillar
  },
  speakers[]->[defined(_id)]{
    _id,
    name,
    role
  },
  territories[]->[defined(_id)]{
    _id,
    name,
    country
  },
  clans[]->[defined(_id)]{
    _id,
    name
  },
  ditammariTerms[]->[defined(_id)]{
    _id,
    term,
    frenchTranslation
  },
  sources[]->[defined(_id)]{
    _id,
    title,
    author,
    year
  }
}`;

export const videoBySlugQuery = `*[_type == "video" && slug.current == $slug && editorialStatus == "publie" && culturalValidation.rightsVerified == true && (culturalValidation.sensitivityLevel == "standard" || culturalValidation.culturalValidated == true)][0]{
  _id,
  _type,
  title,
  slug,
  youtubeId,
  duration,
  publishedDate,
  language,
  summary,
  transcription,
  chapters,
  editorialStatus,
  "culturalValidation": {
    "culturalValidated": culturalValidation.culturalValidated,
    "rightsVerified": culturalValidation.rightsVerified,
    "sensitivityLevel": culturalValidation.sensitivityLevel
  },
  category->{
    _id,
    title,
    slug,
    pillar
  },
  speakers[]->[defined(_id)]{
    _id,
    name,
    role
  },
  territories[]->[defined(_id)]{
    _id,
    name,
    country
  },
  clans[]->[defined(_id)]{
    _id,
    name
  },
  ditammariTerms[]->[defined(_id)]{
    _id,
    term,
    frenchTranslation
  },
  sources[]->[defined(_id)]{
    _id,
    title,
    author,
    year
  },
  seo
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

export const clansQuery = `*[_type == "clan" && validatedByElders == true] | order(name asc){
  _id,
  _type,
  name,
  slug,
  originStory,
  oralSource,
  validatedByElders,
  territories[]->[defined(_id)]{
    name,
    country
  }
}`;

export const ditammariTermsQuery = `*[_type == "ditammariTerm" && linguisticValidation == "valide"] | order(term asc){
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
