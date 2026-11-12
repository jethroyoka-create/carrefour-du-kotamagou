import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ditammariTerm',
  title: 'Termes en Ditammari (Glossaire)',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Terme en langue Ditammari',
      type: 'string',
      description: 'Orthographe normalisée (ex. "Takienta", "Tipaanti", "Difonni", "Dikountri", "Tibénti", "Dikou", "Opon").',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL (slug)',
      type: 'slug',
      options: {
        source: 'term',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'frenchTranslation',
      title: 'Traduction littérale ou Équivalent en français',
      type: 'string',
      description: 'Exemple : "Maison traditionnelle à étage / forteresse de terre", "Art divinatoire", "Rite d\'initiation des jeunes hommes".',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'phonetic',
      title: 'Prononciation / Phonétique indicative',
      type: 'string',
      description: 'Aide à la prononciation pour le grand public et les chercheurs.',
    }),
    defineField({
      name: 'definition',
      title: 'Explication culturelle approfondie',
      type: 'text',
      rows: 5,
      description: 'Sens symbolique, origine, règles d\'usage et contexte rituel ou quotidien.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'exampleSentence',
      title: 'Exemple de phrase en Ditammari',
      type: 'string',
      description: 'Phrase illustrant l\'usage du terme dans la langue.',
    }),
    defineField({
      name: 'exampleTranslation',
      title: 'Traduction française de l\'exemple',
      type: 'string',
    }),
    defineField({
      name: 'linguisticValidation',
      title: 'Statut de validation linguistique',
      type: 'string',
      options: {
        list: [
          { title: 'Validé — Conforme aux travaux de la CNLD et des linguistes', value: 'valide' },
          { title: 'En attente — Graphie ou sens en cours de vérification', value: 'en_attente' },
        ],
        layout: 'radio',
      },
      initialValue: 'en_attente',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source documentaire ou linguistique',
      type: 'reference',
      to: [{ type: 'source' }],
      description: 'Ouvrage de grammaire, lexique ou personne ressource attestant ce terme.',
    }),
  ],
  preview: {
    select: {
      title: 'term',
      translation: 'frenchTranslation',
      validation: 'linguisticValidation',
    },
    prepare({ title, translation, validation }) {
      return {
        title: title || 'Terme sans nom',
        subtitle: `${validation === 'valide' ? '✓ Validé CNLD' : '⏳ En attente'} — ${translation || ''}`,
      };
    },
  },
});
