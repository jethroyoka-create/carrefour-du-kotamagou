import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configuration du média & Paramètres généraux',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom officiel du média',
      type: 'string',
      initialValue: 'Carrefour du Kotamagou',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre éditorial',
      type: 'string',
      initialValue: 'Le média de référence sur le Koutammakou et le patrimoine Batammariba',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'signature',
      title: 'Signature éditoriale',
      type: 'string',
      initialValue: 'Informer. Documenter. Préserver. Valoriser. Transmettre.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description globale du média (SEO & Partages)',
      type: 'text',
      rows: 3,
      initialValue:
        'Carrefour du Kotamagou est une plateforme numérique spécialisée dans la documentation, l\'information, la valorisation et la transmission du patrimoine du Koutammakou et de la culture des Batammariba au Bénin et au Togo.',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Adresse email publique officielle de contact',
      type: 'string',
      description: 'Adresse email affichée publiquement sur la page Contact et dans le pied de page.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'officialSocialLinks',
      title: 'Comptes officiels sur les réseaux sociaux',
      type: 'object',
      fields: [
        {
          name: 'youtube',
          title: 'Chaîne YouTube officielle',
          type: 'url',
          initialValue: 'https://youtube.com/@carrefourdukoutammakou-lz3cq',
        },
        {
          name: 'facebook',
          title: 'Page Facebook officielle',
          type: 'url',
          initialValue: 'https://www.facebook.com/share/18fE9SxRk3/',
        },
        {
          name: 'tiktok',
          title: 'Compte TikTok officiel',
          type: 'url',
          initialValue: 'https://www.tiktok.com/@carrefour.du.kout',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
});
