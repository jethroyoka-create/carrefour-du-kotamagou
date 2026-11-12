import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Carrefour du Kotamagou')
    .items([
      // 1. Espace Rédactionnel
      S.listItem()
        .title('Espace Rédactionnel')
        .child(
          S.list()
            .title('Publications éditoriales')
            .items([
              S.documentTypeListItem('article').title('Articles & Reportages'),
              S.documentTypeListItem('video').title('Vidéos & Documentaires'),
            ])
        ),

      S.divider(),

      // 2. Bibliothèque documentaire & Savoirs
      S.listItem()
        .title('Bibliothèque Documentaire')
        .child(
          S.list()
            .title('Fonds documentaire')
            .items([
              S.documentTypeListItem('person').title('Personnes ressources & Chercheurs'),
              S.documentTypeListItem('ditammariTerm').title('Glossaire de la langue Ditammari'),
              S.documentTypeListItem('source').title('Sources documentaires & Bibliographie'),
            ])
        ),

      // 3. Territoires & Clans
      S.listItem()
        .title('Territoires & Clans')
        .child(
          S.list()
            .title('Patrimoine territorial et lignages')
            .items([
              S.documentTypeListItem('territory').title('Territoires & Villages (Bénin / Togo)'),
              S.documentTypeListItem('clan').title('Clans Batammariba'),
            ])
        ),

      // 4. Taxonomies
      S.listItem()
        .title('Rubriques & Catégories')
        .child(S.documentTypeList('category').title('Rubriques du média et de la bibliothèque')),

      S.divider(),

      // 5. Configuration générale (Singleton)
      S.listItem()
        .title('Paramètres du Média')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configuration générale du site')
        ),
    ]);
