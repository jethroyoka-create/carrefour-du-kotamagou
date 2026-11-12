import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'video',
  title: 'Vidéos & Documentaires',
  type: 'document',
  groups: [
    { name: 'main', title: 'Informations vidéo', default: true },
    { name: 'content', title: 'Résumé & Transcription' },
    { name: 'relations', title: 'Relations documentaires' },
    { name: 'editorial', title: 'Statut & Validation' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre exact de la vidéo',
      type: 'string',
      group: 'main',
      description: 'Titre vérifié tel que diffusé ou titre documentaire normalisé.',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL (slug)',
      type: 'slug',
      group: 'main',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtubeId',
      title: 'Identifiant YouTube (11 caractères)',
      type: 'string',
      group: 'main',
      description: 'L\'identifiant unique de la vidéo sur YouTube (ex. "pq-pTTrLmes", "UMBuzQpXlAI", "nb62kCbckiw").',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-zA-Z0-9_-]{11}$/, {
            name: 'ID YouTube valide (11 caractères)',
            invert: false,
          }),
    }),
    defineField({
      name: 'duration',
      title: 'Durée (mm:ss ou hh:mm:ss)',
      type: 'string',
      group: 'main',
      description: 'Durée constatée (ex. "22:17", "14:35", "37:11").',
      validation: (rule) =>
        rule.regex(/^(\d{1,2}:)?[0-5]?\d:[0-5]\d$/, {
          name: 'format horaire mm:ss ou hh:mm:ss',
          invert: false,
        }),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Date de diffusion d\'origine',
      type: 'date',
      group: 'main',
      description: 'Date de mise en ligne sur YouTube ou date de captation historique si connue.',
    }),
    defineField({
      name: 'language',
      title: 'Langue principale parlée',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Français', value: 'francais' },
          { title: 'Ditammari', value: 'ditammari' },
          { title: 'Ditammari (sous-titré français)', value: 'ditammari_st_fr' },
          { title: 'Bilingue / Mixte (Français & Ditammari)', value: 'mixte' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'francais',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Présentation & Résumé documentaire validé',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Synthèse claire des enseignements, questions traitées et contexte de l\'entretien.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'transcription',
      title: 'Transcription ou Synthèse écrite approfondie',
      type: 'blockContent',
      group: 'content',
      description: 'Texte intégral ou synthèse structurée des déclarations des témoins.',
    }),
    defineField({
      name: 'chapters',
      title: 'Chapitrage thématique',
      type: 'array',
      of: [{ type: 'chapter' }],
      group: 'content',
      description: 'Découpage minuté pour naviguer directement aux moments clés de l\'entretien.',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie documentaire',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'relations',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'speakers',
      title: 'Intervenants et témoins identifiés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      group: 'relations',
      description: 'Chercheurs, historiens, anciens ou témoins filmés dans cette archive.',
    }),
    defineField({
      name: 'territories',
      title: 'Territoires et localités associés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'territory' }] }],
      group: 'relations',
    }),
    defineField({
      name: 'clans',
      title: 'Clans Batammariba concernés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'clan' }] }],
      group: 'relations',
    }),
    defineField({
      name: 'ditammariTerms',
      title: 'Termes Ditammari abordés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'ditammariTerm' }] }],
      group: 'relations',
    }),
    defineField({
      name: 'sources',
      title: 'Sources complémentaires',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'source' }] }],
      group: 'relations',
    }),
    defineField({
      name: 'editorialStatus',
      title: 'Statut de publication',
      type: 'string',
      group: 'editorial',
      options: {
        list: [
          { title: '1. Brouillon (Invisible)', value: 'brouillon' },
          { title: '2. À vérifier (En cours d\'écoute / identification)', value: 'a_verifier' },
          { title: '3. Prêt à publier (Notice complète validée)', value: 'pret_a_publier' },
          { title: '4. Publié en ligne (Visible dans la médiathèque)', value: 'publie' },
          { title: '5. Archivé (Notice retirée du site public)', value: 'archive' },
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
              return 'Les autorisations des intervenants et droits de diffusion doivent être formellement confirmés (rightsVerified == true) avant mise en ligne.';
            }
            if (cv?.sensitivityLevel && cv?.sensitivityLevel !== 'standard' && cv?.culturalValidated !== true) {
              return `Une archive vidéo dont la sensibilité est "${cv.sensitivityLevel}" ne peut être publiée sans validation culturelle formelle (culturalValidated == true).`;
            }
          }
          return true;
        }),
    }),
    defineField({
      name: 'culturalValidation',
      title: 'Validation culturelle & Droits',
      type: 'culturalValidation',
      group: 'editorial',
      description: '⚠️ Renforcée obligatoire pour les rituels initiatiques, funéraires ou divinatoires.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      youtubeId: 'youtubeId',
      duration: 'duration',
      status: 'editorialStatus',
    },
    prepare({ title, youtubeId, duration, status }) {
      const statusLabels: Record<string, string> = {
        brouillon: '🟡 Brouillon',
        a_verifier: '🟠 À vérifier',
        pret_a_publier: '🔵 Prêt',
        publie: '🟢 Publié',
        archive: '⚪ Archivé',
      };
      return {
        title: title || 'Vidéo sans titre',
        subtitle: `[${statusLabels[status] || status}] Durée : ${duration || 'N/C'} | YouTube : ${youtubeId || ''}`,
      };
    },
  },
});
