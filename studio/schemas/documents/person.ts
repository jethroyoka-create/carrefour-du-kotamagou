import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'person',
  title: 'Personnes ressources & Chercheurs',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet vérifié',
      type: 'string',
      description: 'Nom et prénoms usuels (ex. "Pr Didier N\'Dah", "Noël Koumba Koussey", "Dr Gérard K. Tidouo", "Dr Rigobert Kpanipa Kouagou").',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL (slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Qualité, Fonction ou Domaine d\'expertise',
      type: 'string',
      description: 'Ex. "Archéologue, Enseignant-chercheur à l\'UAC", "Historien", "Sociologue", "Chef de culte", "Aîné porteur de mémoire".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'bio',
      title: 'Notice biographique publique',
      type: 'text',
      rows: 4,
      description: 'Parcours intellectuel, travaux de recherche ou ancrage coutumier public. RAPPEL STRICT DE SÉCURITÉ : Ne jamais saisir de numéros de téléphone, d\'adresses privées ou d\'emails personnels dans cette fiche publique.',
    }),
    defineField({
      name: 'photo',
      title: 'Portrait photographique (consenti)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Description alternative de la photo',
          validation: (rule) => rule.required(),
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Crédit photo / Date',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'territory',
      title: 'Territoire / Village de rattachement',
      type: 'reference',
      to: [{ type: 'territory' }],
      description: 'Localité principale d\'attachement ou de travail.',
    }),
    defineField({
      name: 'clan',
      title: 'Clan d\'appartenance (si vérifié et public)',
      type: 'reference',
      to: [{ type: 'clan' }],
    }),
    defineField({
      name: 'active',
      title: 'Afficher cette notice dans le répertoire public',
      type: 'boolean',
      description: 'Décocher pour masquer temporairement la notice sans la supprimer.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
});
