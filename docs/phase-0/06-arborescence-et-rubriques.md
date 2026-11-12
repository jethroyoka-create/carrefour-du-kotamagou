# 06 — Proposition d'arborescence et organisation des rubriques

## 1. Principe directeur

L'architecture de l'information doit rendre immédiatement lisible la double vocation de **Carrefour du Kotamagou** — **suivre la vie du territoire (Espace Média)** et **explorer un patrimoine structuré (Espace Documentation)** — tout en offrant des passerelles permanentes entre les deux.

### Amélioration proposée par rapport à la structure préliminaire
L'organisation préliminaire proposée est très saine. Deux ajustements ergonomiques sont recommandés pour la navigation de premier niveau :
1. **Regrouper sans multiplier les entrées de menu :** Garder une barre de navigation principale claire en 2 niveaux visuels ou 6 entrées phares sur mobile/desktop (`À la une`, `Média`, `Documentation`, `Clans & Territoires`, `Archives vidéo`, `Glossaire`), afin d'éviter un menu encombré sur smartphones Android (conformément aux recommandations UX de `ui-ux-pro-max`).
2. **Créer des « Dossiers documentaires » transversaux en point d'entrée privilégié :** Les séries thématiques (ex. *Tipaanti*, *Tibénti à Dikou*, *Koutchati*, *Fonio*) deviennent des objets éditoriaux de premier plan reliant articles Média et fiches Documentation.

---

## 2. Arborescence détaillée

```text
/                                   Accueil (« La Une » éditoriale + Dossiers + Dernières archives + Accès rapide)
│
├── ESPACE MÉDIA (/media)
│   ├── /a-la-une                   Sélection éditoriale principale & grands formats du moment
│   ├── /actualites                 Faits récents, décisions locales, vie communautaire (Bénin & Togo)
│   ├── /reportages                 Enquêtes et immersions de terrain (société, agriculture, patrimoine vivant)
│   ├── /interviews                 Entretiens longs retranscrits et contextualisés
│   ├── /portraits                  Portraits de personnalités, bâtisseurs, artistes, acteurs contemporains
│   └── /evenements                 Agenda et couvertures (FACTAM, Koutchati, séminaires CNLD, colloques)
│
├── ESPACE DOCUMENTATION (/documentation)
│   ├── /dossiers                   Dossiers thématiques multimédias de référence (formats longs)
│   ├── /histoire-et-origines       Peuplement de l'Atacora, migrations, période coloniale, faits marquants
│   ├── /clans-et-territoires       Répertoire des clans Batammariba + fiches des villages et communes
│   │   ├── /clans/[slug]           Fiche clan (ex. /clans/banacoba, /clans/bessoribe, /clans/ossonou)
│   │   └── /territoires/[slug]     Fiche lieu (ex. /territoires/boukoumbe, /territoires/koussocoingou)
│   ├── /traditions-et-savoirs      Coutumes, mariage, parenté, musique, agriculture (fonio), artisanat, rites
│   ├── /architecture               Takienta / Tata Somba : matériaux, typologie, symbolique, conservation
│   ├── /langue-et-expressions      Langue Ditammari, anthroponymie (noms), alphabétisation (CNLD), proverbes
│   ├── /personnes-ressources       Annuaire pérenne des sages, chercheurs, chefs de culte et témoins cités
│   └── /archives-audiovisuelles    Médiathèque complète filtrable (Documentaires, Interviews, Terrain, Shorts)
│
└── ESPACES TRANSVERSAUX
    ├── /recherche                  Recherche globale multi-critères (articles, dossiers, vidéos, clans, mots)
    ├── /glossaire                  Glossaire Ditammari ↔ Français indexable et lié aux articles
    ├── /carte                      Carte interactive transfrontalière du Koutammakou (Bénin & Togo)
    ├── /a-propos                   Mission, charte éditoriale, distinction Kotamagou/Koutammakou, gouvernance
    ├── /partenariats               Coopérations académiques, institutionnelles, culturelles et mécénat
    └── /contact                    Contact rédactionnel, proposition de témoignage, signalement d'erreur
```

---

## 3. Fiches fonctionnelles des rubriques et maillage croisé

### A. Espace Média
| Rubrique | Fonction principale | Types de contenus accueillis | Relations avec le reste du site |
| :--- | :--- | :--- | :--- |
| **À la une** | Vitrine éditoriale curatée manuellement par la rédaction. | 1 sujet phare plein cadre + 3 à 4 sujets majeurs (mix Média & Dossiers). | Pointe vers toutes les rubriques selon l'actualité et les dossiers prioritaires. |
| **Actualités** | Suivre la vie publique, culturelle et territoriale récente. | Brèves sourcées, comptes-rendus (FAPE, foncier, décisions locales, sécurité). | Reliée aux fiches *Territoires* et *Personnes-ressources* citées. |
| **Reportages** | Donner de la profondeur à des faits de société ou traditions vivantes. | Récits illustrés + vidéos de terrain (*Koutchati*, quête de l'eau, patrimoine colonial). | Reliée aux *Dossiers*, aux *Territoires* et au *Glossaire*. |
| **Interviews** | Restituer une parole experte ou institutionnelle en format lisible. | Vidéo YouTube intégrée + synthèse/transcription structurée + chapitrage. | Crée un lien automatique vers la fiche *Personne-ressource* de l'invité. |
| **Portraits** | Mettre en lumière des parcours individuels inspirants ou méconnus. | Biographies narratives (Clément Yadonta, Philomène Gnamou, Bassari, Pascal N'Dah Sekou). | Alimente l'annuaire *Personnes-ressources* et l'histoire contemporaine. |
| **Événements** | Documenter les rassemblements culturels et scientifiques. | Calendrier sobre + archives des éditions (FACTAM, séminaires CNLD, colloques UNESCO). | Reliée aux *Archives audiovisuelles* et aux *Territoires*. |

### B. Espace Documentation
| Rubrique | Fonction principale | Types de contenus accueillis | Relations avec le reste du site |
| :--- | :--- | :--- | :--- |
| **Dossiers** | Agréger plusieurs formats autour d'un grand thème. | Pages longues structurées mêlant texte de synthèse, cartes, vidéos liées et bibliographie. | Piliers SEO reliés aux *Actualités*, *Clans*, *Glossaire* et *Archives*. |
| **Histoire et origines** | Raconter le temps long du Koutammakou. | Synthèses archéologiques (Atacora IIIe s., migrations), récits de fondation, chronologies. | Reliée aux *Clans*, *Territoires* et *Personnes-ressources* (historiens/archéologues). |
| **Clans et territoires** | Structurer l'encyclopédie géographique et sociale. | Fiches normalisées par clan et par village/commune (Bénin & Togo). | Connectée directement à la *Carte interactive* et aux *Archives audiovisuelles*. |
| **Traditions et savoirs** | Documenter les pratiques culturelles, sociales et rituelles autorisées. | Rites de passage (*Difonni*, *Dikountri*, *Dipiééri*), funérailles (*Tibénti*, *Dikou*), divination (*Tipaanti*), mariage, parenté, fonio. | Chaque fiche précise le niveau de validation culturelle et pointe vers le *Glossaire*. |
| **Architecture** | Offrir une référence sur l'habitat fortifié en terre crue. | Anatomie *Takienta / Tata Somba*, matériaux, symbolique, enjeux UNESCO de conservation. | Reliée aux *Territoires*, au *Glossaire* architectural et aux *Dossiers*. |
| **Langue et expressions** | Préserver et valoriser la langue *Ditammari*. | Anthroponymie (noms), histoire de l'alphabétisation (CNLD), distinctions terminologiques, proverbes. | Moteur direct du *Glossaire* transversal et des vidéos en *Ditammari*. |
| **Personnes ressources** | Centraliser les porteurs de mémoire et experts. | Fiches bio-bibliographiques avec photo (si consentie), spécialité, clan/localité et index des interventions. | Liée à toutes les *Interviews*, *Portraits* et *Archives vidéo*. |
| **Archives audiovisuelles** | Offrir un catalogue structuré de tout le patrimoine vidéo et audio. | Fiches unitaires des 122+ vidéos (avec filtres : format, thème, langue, intervenant, durée). | Source primaire alimentant les *Dossiers* et la *Recherche globale*. |

### C. Espaces Transversaux
- **Recherche globale (`/recherche`) :** Point d'entrée unique interrogeant simultanément articles, dossiers, fiches clans/villages, glossaire, personnes-ressources et vidéos.
- **Glossaire (`/glossaire`) :** Index alphabétique et thématique français ↔ *Ditammari* ; alimente également des infobulles contextuelles dans tous les articles.
- **Carte du territoire (`/carte`) :** Visualisation géographique du Koutammakou transfrontalier (Bénin + Togo) affichant uniquement les lieux documentés de façon fiable (cliquables vers leurs fiches et archives).
- **À propos / Partenariats / Contact :** Transparence éditoriale, méthode de vérification, protocole culturel, soumission de rectificatifs et demandes de coopération.
