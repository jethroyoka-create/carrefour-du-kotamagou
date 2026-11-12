import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'source',
  title: 'Sources documentaires & Bibliographie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la source',
      type: 'string',
      description: 'Titre de l\'ouvrage, de la thèse, de l\'article ou du document d\'archive (ex. "Archéologie du peuplement de l\'Atacora", "Dossier d\'inscription Koutammakou UNESCO").',
      validation: (rule) => rule.required().max(180),
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
      name: 'author',
      title: 'Auteur(s) ou Organisme émetteur',
      type: 'string',
      description: 'Ex. "Didier N\'Dah", "Gérard K. Tidouo", "UNESCO / Direction du Patrimoine Culturel du Bénin".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'sourceType',
      title: 'Type de ressource',
      type: 'string',
      options: {
        list: [
          { title: 'Ouvrage / Livre de recherche', value: 'livre' },
          { title: 'Article dans une revue scientifique', value: 'article_scientifique' },
          { title: 'Thèse de doctorat / Mémoire universitaire', value: 'these' },
          { title: 'Rapport officiel / Document UNESCO', value: 'rapport_unesco' },
          { title: 'Archive orale / Transcription d\'entretien', value: 'archive_orale' },
          { title: 'Ressource en ligne / Site institutionnel', value: 'site_web' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'livre',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année de publication',
      type: 'number',
      description: 'Année de parution (ex. 2004, 2018, 2023).',
    }),
    defineField({
      name: 'publisher',
      title: 'Éditeur, Revue ou Institution',
      type: 'string',
      description: 'Ex. "Éditions Karthala", "Revue Annales de l\'UAC", "UNESCO World Heritage Centre".',
    }),
    defineField({
      name: 'url',
      title: 'Lien web public vers la ressource (si disponible)',
      type: 'url',
      description: 'URL vers le document complet en accès libre (PDF institutionnel, portail académique).',
    }),
    defineField({
      name: 'annotation',
      title: 'Notice bibliographique / Intérêt pour le Kotamagou',
      type: 'text',
      rows: 3,
      description: 'Présentation concise de l\'apport de cette source pour l\'étude du Koutammakou.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      year: 'year',
      type: 'sourceType',
    },
    prepare({ title, author, year, type }) {
      return {
        title: title || 'Source sans titre',
        subtitle: `${author || 'Auteur inconnu'} (${year || 's.d.'}) — ${type || ''}`,
      };
    },
  },
});
