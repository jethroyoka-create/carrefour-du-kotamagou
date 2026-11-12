import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Articles & Reportages',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenu éditorial', default: true },
    { name: 'media', title: 'Médias associés' },
    { name: 'relations', title: 'Relations documentaires' },
    { name: 'editorial', title: 'Validation & Statut' },
    { name: 'seo', title: 'SEO & Réseaux' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      group: 'content',
      description: 'Titre éditorial clair et informatif.',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL (slug)',
      type: 'slug',
      group: 'content',
      description: 'Généré automatiquement depuis le titre pour composer l\'adresse web.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'articleType',
      title: 'Type de publication',
      type: 'string',
      group: 'content',
      description: 'Définit la mise en page et la rubrique de présentation.',
      options: {
        list: [
          { title: 'Actualité locale', value: 'actualite' },
          { title: 'Grand reportage de terrain', value: 'reportage' },
          { title: 'Interview / Portrait', value: 'interview' },
          { title: 'Dossier documentaire d\'analyse', value: 'dossier' },
          { title: 'Culture & Traditions', value: 'culture' },
          { title: 'Histoire & Mémoire', value: 'histoire' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'actualite',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Chapô / Résumé court',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Introduction accrocheuse affichée sur la page d\'accueil et partagée sur les réseaux sociaux (120 à 250 caractères).',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Photographie principale (À la Une)',
      type: 'image',
      group: 'media',
      description: 'Photographie originale autorisée du Koutammakou (interdiction des images d\'IA ou de banques génériques).',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte descriptif alternatif (Accessibilité obligatoire)',
          validation: (rule) => rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Légende éditoriale',
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Crédit / Auteur de la photo',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Corps du texte',
      type: 'blockContent',
      group: 'content',
      description: 'Texte complet structuré avec intertitres, citations et encadrés.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      group: 'editorial',
      description: 'Date et heure de parution visible sur le site public.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur / Rédacteur ou Source d\'origine',
      type: 'string',
      group: 'content',
      description: 'Ex. "Rédaction Carrefour du Kotamagou" ou "Propos recueillis par Noël K. Koussey".',
      initialValue: 'Rédaction Carrefour du Kotamagou',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie principale',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'relations',
      description: 'Rubrique principale d\'appartenance de l\'article.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedPersons',
      title: 'Personnes ressources citées ou interviewées',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      group: 'relations',
      description: 'Relie cet article aux fiches des intervenants pour le maillage documentaire.',
    }),
    defineField({
      name: 'relatedTerritories',
      title: 'Territoires et localités concernés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'territory' }] }],
      group: 'relations',
      description: 'Communes ou villages du Bénin/Togo mentionnés dans le sujet.',
    }),
    defineField({
      name: 'relatedClans',
      title: 'Clans Batammariba mentionnés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'clan' }] }],
      group: 'relations',
      description: 'Clans dont les récits ou membres sont abordés.',
    }),
    defineField({
      name: 'relatedDitammariTerms',
      title: 'Termes en Ditammari associés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'ditammariTerm' }] }],
      group: 'relations',
      description: 'Mots ou notions du glossaire éclairant ce sujet.',
    }),
    defineField({
      name: 'sources',
      title: 'Sources documentaires et bibliographie',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'source' }] }],
      group: 'relations',
      description: 'Ouvrages, thèses ou rapports scientifiques cités dans l\'article.',
    }),
    defineField({
      name: 'editorialStatus',
      title: 'Statut éditorial (Contrôle du cycle de vie)',
      type: 'string',
      group: 'editorial',
      description: 'Seul le statut "Publié en ligne" permet l\'affichage public sur le site web.',
      options: {
        list: [
          { title: '1. Brouillon (Travail en cours, invisible)', value: 'brouillon' },
          { title: '2. À vérifier (En attente de relecture factuelle)', value: 'a_verifier' },
          { title: '3. Prêt à publier (Revu et corrigé, prêt pour mise en ligne)', value: 'pret_a_publier' },
          { title: '4. Publié en ligne (Visible publiquement sur le site)', value: 'publie' },
          { title: '5. Archivé (Retiré du site public, conservé en mémoire interne)', value: 'archive' },
        ],
        layout: 'radio',
      },
      initialValue: 'brouillon',
      validation: (rule) =>
        rule.required().custom((status, context) => {
          if (status === 'publie') {
            const doc = context.document as any;
            const cv = doc?.culturalValidation;
            if (cv?.rightsVerified !== true) {
              return 'Les droits de diffusion et autorisations des témoins doivent être formellement vérifiés (rightsVerified == true) avant publication.';
            }
            if (cv?.sensitivityLevel && cv?.sensitivityLevel !== 'standard' && cv?.culturalValidated !== true) {
              return `Un contenu dont la sensibilité est "${cv.sensitivityLevel}" ne peut être publié sans validation culturelle formelle (culturalValidated == true).`;
            }
          }
          return true;
        }),
    }),
    defineField({
      name: 'culturalValidation',
      title: 'Validation culturelle et contrôle des droits',
      type: 'culturalValidation',
      group: 'editorial',
      description: 'Obligatoire pour les récits sacrés, initiatiques ou sujets coutumiers sensibles.',
    }),
    defineField({
      name: 'seo',
      title: 'Paramètres SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      articleType: 'articleType',
      status: 'editorialStatus',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, articleType, status, media, publishedAt }) {
      const statusLabels: Record<string, string> = {
        brouillon: '🟡 Brouillon',
        a_verifier: '🟠 À vérifier',
        pret_a_publier: '🔵 Prêt',
        publie: '🟢 Publié',
        archive: '⚪ Archivé',
      };
      const dateStr = publishedAt ? new Date(publishedAt).toLocaleDateString('fr-FR') : '';
      return {
        title: title || 'Sans titre',
        subtitle: `[${statusLabels[status] || status}] ${articleType || ''} — ${dateStr}`,
        media,
      };
    },
  },
});
