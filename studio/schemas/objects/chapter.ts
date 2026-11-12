import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'chapter',
  title: 'Chapitre vidéo',
  type: 'object',
  fields: [
    defineField({
      name: 'timestamp',
      title: 'Repère temporel (mm:ss ou hh:mm:ss)',
      type: 'string',
      description: 'Exemple : "04:12" ou "01:15:30"',
      validation: (rule) =>
        rule.required().regex(/^(\d{1,2}:)?[0-5]?\d:[0-5]\d$/, {
          name: 'format horaire',
          invert: false,
        }),
    }),
    defineField({
      name: 'title',
      title: 'Titre du passage',
      type: 'string',
      description: 'Sujet abordé dans ce passage (ex. "Origines du clan Banadoba")',
      validation: (rule) => rule.required().max(120),
    }),
  ],
});
