import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Catégories & Rubriques',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Intitulé de la rubrique',
      type: 'string',
      description: 'Ex. "Histoire & Mémoire", "Culture & Traditions", "Architecture traditionnelle", "Rites & Spiritualité", "Langue Ditammari", "Actualités locales", "Économie & Terroir".',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL (slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pilier d\'appartenance',
      type: 'string',
      options: {
        list: [
          { title: 'Pilier A — Média d\'information (Actualités, Reportages, Enquêtes)', value: 'media' },
          { title: 'Pilier B — Bibliothèque documentaire (Archives, Savoirs, Histoire)', value: 'documentation' },
        ],
        layout: 'radio',
      },
      initialValue: 'documentation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description de la rubrique',
      type: 'text',
      rows: 3,
      description: 'Texte d\'introduction affiché en tête de page de la catégorie.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Numéro pour ordonner les rubriques dans les menus et filtres (ex. 1, 2, 3...).',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pillar: 'pillar',
      order: 'displayOrder',
    },
    prepare({ title, pillar, order }) {
      return {
        title: title || 'Catégorie sans nom',
        subtitle: `[${pillar === 'media' ? 'Média' : 'Documentation'}] Ordre : ${order ?? ''}`,
      };
    },
  },
});
