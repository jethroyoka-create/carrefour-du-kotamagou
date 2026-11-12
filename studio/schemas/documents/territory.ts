import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'territory',
  title: 'Territoires & Villages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Toponyme vérifié',
      type: 'string',
      description: 'Nom exact de la commune, du village ou du site (ex. "Boukoumbé", "Koutammakou", "Kouaba", "Nadoba", "Warengo", "Koussocoingou").',
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
      name: 'country',
      title: 'Pays de rattachement',
      type: 'string',
      options: {
        list: [
          { title: 'Bénin', value: 'benin' },
          { title: 'Togo', value: 'togo' },
          { title: 'Zone transfrontalière (Bénin / Togo)', value: 'transfrontalier' },
        ],
        layout: 'radio',
      },
      initialValue: 'benin',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'administrativeRegion',
      title: 'Découpage administratif',
      type: 'string',
      description: 'Ex. "Département de l\'Atacora, Arrondissement de Natta" (Bénin) ou "Région de la Kara, Préfecture de la Kéran" (Togo).',
    }),
    defineField({
      name: 'isUnescoSite',
      title: 'Site classé au Patrimoine Mondial de l\'UNESCO',
      type: 'boolean',
      description: 'Cocher si le territoire est situé dans le périmètre classé (2004 Togo ou extension 2023 Bénin).',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Présentation géographique et patrimoniale',
      type: 'text',
      rows: 4,
      description: 'Situation, relief, histoire du peuplement et importance culturelle.',
    }),
    defineField({
      name: 'photo',
      title: 'Photographie du territoire',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Description de la vue',
          validation: (rule) => rule.required(),
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Crédit photo',
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      country: 'country',
      region: 'administrativeRegion',
      media: 'photo',
    },
    prepare({ title, country, region, media }) {
      const countryLabels: Record<string, string> = {
        benin: '🇧🇯 Bénin',
        togo: '🇹🇬 Togo',
        transfrontalier: '🇧🇯/🇹🇬 Transfrontalier',
      };
      return {
        title: title || 'Territoire sans nom',
        subtitle: `${countryLabels[country] || country || ''} — ${region || ''}`,
        media,
      };
    },
  },
});
