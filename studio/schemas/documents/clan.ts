import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'clan',
  title: 'Clans Batammariba',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du clan',
      type: 'string',
      description: 'Nom patronymique / clanique (ex. "Banadoba", "Bèssoribè", "Ossori", "Bapakouba", "Bamatimaba", "Bakouatchienba").',
      validation: (rule) => rule.required().max(80),
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
      name: 'originStory',
      title: 'Récit de tradition orale sur les origines',
      type: 'text',
      rows: 5,
      description: 'Histoire transmise de l\'arrivée, des ancêtres fondateurs ou des alliances historiques.',
    }),
    defineField({
      name: 'oralSource',
      title: 'Source orale ou Référent coutumier',
      type: 'string',
      description: 'Aîné, chef de lignage ou autorité ayant partagé ce récit (ex. "Transmis par Joseph Ossori, chef de culte").',
    }),
    defineField({
      name: 'territories',
      title: 'Territoires et villages d\'implantation historiques',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'territory' }] }],
      description: 'Villages du Koutammakou où ce clan est historiquement établi.',
    }),
    defineField({
      name: 'validatedByElders',
      title: 'Récit validé par les aînés du clan',
      type: 'boolean',
      description: 'Atteste que les éléments d\'histoire clanique publiés respectent la mémoire des anciens.',
      initialValue: false,
    }),
    defineField({
      name: 'notes',
      title: 'Notes méthodologiques',
      type: 'string',
      description: 'Précisions sur d\'éventuelles variantes de tradition orale entre villages.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      source: 'oralSource',
      validated: 'validatedByElders',
    },
    prepare({ title, source, validated }) {
      return {
        title: title || 'Clan sans nom',
        subtitle: `${validated ? '✓ Validé aînés' : 'En cours'} | Source : ${source || 'Non précisée'}`,
      };
    },
  },
});
