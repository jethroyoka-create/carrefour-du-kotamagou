import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'blockContent',
  title: 'Contenu rédigé',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Bloc de texte',
      type: 'block',
      styles: [
        { title: 'Paragraphe normal', value: 'normal' },
        { title: 'Titre de section (H2)', value: 'h2' },
        { title: 'Sous-titre (H3)', value: 'h3' },
        { title: 'Citation éditoriale', value: 'blockquote' },
      ],
      lists: [
        { title: 'Puces', value: 'bullet' },
        { title: 'Numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien externe ou interne',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL de destination',
                validation: (rule) =>
                  rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image dans le texte',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif (Accessibilité obligatoire)',
          description: 'Décrivez précisément ce que montre l\'image pour les personnes malvoyantes et les moteurs de recherche.',
          validation: (rule) => rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Légende visible',
          description: 'Explication affichée sous la photographie.',
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Crédit / Photographe',
          description: 'Exemple : "Photo © Équipe Carrefour du Kotamagou, 2026"',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      type: 'object',
      title: 'Encadré de repère ou contexte',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Titre de l\'encadré (ex. "Le saviez-vous ?", "Repère historique")',
          validation: (rule) => rule.required(),
        },
        {
          name: 'text',
          type: 'text',
          rows: 3,
          title: 'Texte explicatif',
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
});
