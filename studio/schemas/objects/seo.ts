import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'Référencement & Réseaux sociaux',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titre SEO personnalisé',
      type: 'string',
      description: 'Laissez vide pour utiliser le titre principal de la publication (recommandé 50 à 60 caractères).',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description SEO (méta-description)',
      type: 'text',
      rows: 3,
      description: 'Résumé incitatif pour les résultats Google et partages WhatsApp/Facebook (140 à 160 caractères).',
      validation: (rule) => rule.max(170),
    }),
  ],
});
