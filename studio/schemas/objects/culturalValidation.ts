import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'culturalValidation',
  title: 'Validation culturelle et droits',
  type: 'object',
  fields: [
    defineField({
      name: 'sensitivityLevel',
      title: 'Niveau de sensibilité du sujet',
      type: 'string',
      description: 'Définit le degré de prudence requis avant toute publication.',
      options: {
        list: [
          { title: 'Standard — Sujet public ordinaire', value: 'standard' },
          { title: 'Sensible — Débat clanique, foncier ou historique', value: 'sensible' },
          { title: 'Sacré — Rite initiatique, divination, pratiques funéraires', value: 'sacre' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'culturalValidated',
      title: 'Validation culturelle confirmée',
      type: 'boolean',
      description: 'Cocher si le contenu a été relu et approuvé par une autorité coutumière ou un chercheur compétent.',
      initialValue: false,
    }),
    defineField({
      name: 'rightsVerified',
      title: 'Droits et autorisations de diffusion vérifiés',
      type: 'boolean',
      description: 'Cocher si les autorisations des intervenants et les droits d\'image sont conservés hors ligne.',
      initialValue: false,
    }),
    defineField({
      name: 'validationNote',
      title: 'Référence interne de validation',
      type: 'string',
      description: 'Identifiant anonymisé ou mention d\'autorité (ex. "Approuvé par Pr N\'Dah — Réf. ARCH-2026-042"). IMPORTANT : Ne jamais saisir de données personnelles privées.',
    }),
  ],
});
