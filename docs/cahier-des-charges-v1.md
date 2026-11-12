# CAHIER DES CHARGES FONCTIONNEL ET TECHNIQUE
## CARREFOUR DU KOTAMAGOU

**Version :** 1.2 — Cahier des charges consolidé (Séparation des logiques éditoriales des 8 schémas et sécurité Sanity)  
**Date :** 12 novembre 2026  
**Nature du projet :** Média numérique et plateforme documentaire  
**Zone géographique :** Bénin et Togo  
**Langue principale :** Français  
**Domaine initial envisagé :** `carrefour-du-kotamagou.pages.dev` *(disponibilité à vérifier lors de la configuration, sans déploiement anticipé)*

---

## 1. PRÉSENTATION GÉNÉRALE DU PROJET

### 1.1. Nom du projet

**Carrefour du Kotamagou**

Sous-titre proposé :  
*Le média de référence sur le Koutammakou et le patrimoine Batammariba.*

Signature éditoriale :  
**Informer. Documenter. Préserver. Valoriser. Transmettre.**

### 1.2. Contexte

Carrefour du Kotamagou est un projet de média numérique destiné à informer, documenter et valoriser l'histoire, la culture, les traditions, les communautés et le patrimoine du Koutammakou.

Le projet s'appuie notamment sur un important fonds audiovisuel déjà constitué sur YouTube, comprenant **122 vidéos et Shorts publics** recensés lors de la préparation initiale (`114` vidéos longues/standards + `8` Shorts).

Ce fonds représente une base documentaire importante qui sera progressivement organisée, enrichie et rendue plus accessible grâce à une plateforme web dédiée.

Le média continuera également à produire de nouveaux contenus : actualités, interviews, reportages, portraits et documentaires.

### 1.3. Vision

Faire de Carrefour du Kotamagou une plateforme numérique de référence permettant de retrouver, consulter, comprendre et transmettre les connaissances relatives au Koutammakou et au patrimoine Batammariba, au Bénin comme au Togo.

La plateforme réunit deux dimensions complémentaires :
- Un média d'information vivant.
- Une bibliothèque documentaire organisée et durable.

---

## 2. OBJECTIFS DU PROJET

### 2.1. Objectif général

Développer une plateforme numérique professionnelle, accessible et évolutive qui rassemble l'actualité et les ressources documentaires consacrées au Koutammakou et au patrimoine Batammariba.

### 2.2. Objectifs spécifiques

1. Donner une présence numérique professionnelle au média.
2. Centraliser les publications et les archives audiovisuelles.
3. Faciliter la consultation des anciennes interviews.
4. Permettre la publication régulière de nouvelles actualités.
5. Préserver les témoignages et les connaissances documentées.
6. Faciliter la recherche par sujet, personnalité, territoire et catégorie.
7. Valoriser les chercheurs, historiens, personnes ressources et communautés.
8. Développer progressivement un fonds documentaire linguistique Ditammari.
9. Toucher les communautés locales, la diaspora, les chercheurs et le public international.
10. Préparer une évolution vers un média multilingue.

---

## 3. PUBLIC CIBLE

La plateforme s'adresse notamment :
- Aux communautés Batammariba et Otamari.
- Aux habitants du Koutammakou au Bénin et au Togo.
- Aux membres de la diaspora.
- Aux chercheurs et universitaires.
- Aux étudiants.
- Aux historiens et anthropologues.
- Aux journalistes.
- Aux associations culturelles.
- Aux institutions patrimoniales.
- Aux passionnés d'histoire et de traditions africaines.
- Aux visiteurs intéressés par le patrimoine culturel.

L'interface doit être compréhensible par un public non technique et performante sur smartphones Android d'entrée et de milieu de gamme.

---

## 4. POSITIONNEMENT ÉDITORIAL

Carrefour du Kotamagou se comporte comme un véritable média et ne se limite pas à la publication de vidéos.

### 4.1. Premier pilier : le média d'actualité
Contenus prévus : actualités locales, reportages, interviews, portraits, événements culturels, initiatives communautaires, activités associatives, informations relatives au patrimoine, projets de développement local, préservation et transmission des traditions.

### 4.2. Deuxième pilier : la bibliothèque documentaire
Rubriques : histoire et mémoire, peuples et clans, territoires et villages, architecture traditionnelle, traditions et rites, langue Ditammari, personnalités et chercheurs, témoignages, archives audiovisuelles, patrimoine matériel et immatériel.

### 4.3. Liaison entre les deux piliers
Une même publication peut appartenir à plusieurs catégories et être reliée à des entités documentaires (clans, territoires, personnes, termes Ditammari), afin que chaque nouvelle publication enrichisse durablement les archives.

---

## 5. ARCHITECTURE GÉNÉRALE DU SITE (PAGES DU MVP VALIDÉES)

Le MVP devra fournir des pages **réellement fonctionnelles et cohérentes** (aucune maquette vide) :

1. **Accueil (`/`)** : présentation éditoriale du média, grand sujet principal à la Une, dernières actualités, reportages récents, interviews à découvrir, sélection de ressources documentaires, accès à la bibliothèque, liens vers les réseaux sociaux officiels et pied de page institutionnel.
2. **Actualités (`/actualites`)** : liste chronologique, pagination, catégories, image principale, titre et résumé, date de publication, auteur ou source, accès à l'article complet.
3. **Reportages (`/reportages`)** : titre, introduction, texte explicatif, photographies autorisées, vidéo associée (optionnelle), lieu concerné, intervenants, catégories.
4. **Interviews (`/interviews`)** : entretiens avec chercheurs, historiens, responsables communautaires, témoins et personnes ressources, avec vidéo YouTube intégrée en façade.
5. **Culture & Traditions (`/culture-et-traditions`)** : traditions, rites, pratiques culturelles, savoir-faire, transmission, patrimoine matériel et immatériel (avec validation culturelle renforcée sur les sujets sensibles).
6. **Histoire & Mémoire (`/histoire-et-memoire`)** : éléments historiques, origines et récits, clans, territoires, villages, témoignages, travaux de recherche (informations sourcées et interprétations attribuées à leurs auteurs).
7. **Bibliothèque documentaire (`/bibliotheque`)** : accès centralisé aux ressources organisées avec filtrage par catégorie, type de ressource, vidéos, dossiers, amorce du glossaire Ditammari et personnes ressources.
8. **Recherche (`/recherche`)** : moteur de recherche global accessible depuis l'en-tête (propulsé par Pagefind en statique).
9. **À propos (`/a-propos`)** : histoire du média, mission, objectifs, territoire de couverture, ligne éditoriale (y compris la distinction rigoureuse des appellations), engagement patrimonial, réseaux sociaux officiels.
10. **Contact (`/contact`)** : coordonnées et formulaire protégé contre le spam (sans stockage de données personnelles privées dans le dataset public Sanity).
11. **Mentions légales (`/mentions-legales`)**.
12. **Politique de confidentialité (`/politique-de-confidentialite`)** *(incluant la politique de gestion des cookies si nécessaire et une page 404 personnalisée)*.

*Évolution progressive (Phase 2+) :* les pages dédiées approfondies du glossaire complet, de l'atlas cartographique et des monographies détaillées par clan/territoire/personne seront enrichies progressivement, tout en reposant sur un modèle de données déjà prêt dès la Phase 1.

---

## 6. GESTION DES VIDÉOS YOUTUBE EXISTANTES ET DES PHOTOGRAPHIES

### 6.1. Source principale et sélection sur validation humaine
- Source principale : chaîne YouTube officielle (`https://youtube.com/@carrefourdukoutammakou-lz3cq`, 122 vidéos et Shorts recensés).
- **Sélection de travail :** une liste indicative de **20 vidéos candidates** a été extraite et analysée (voir `docs/decisions-techniques-mvp.md`).
- **Gouvernance :** l'équipe technique ne choisit pas elle-même les vidéos finales ; **le comité éditorial et la direction du média sélectionneront les 10 à 15 vidéos finales du lancement**, en s'appuyant sur les indicateurs de droits, d'intervenants manquants, de sensibilité et de validation culturelle renforcée (obligatoire pour les rites initiatiques et pratiques spirituelles).
- **Intégration technique :** lecteur YouTube en mode confidentiel (`youtube-nocookie.com`) avec chargement **en façade** (vignette officielle YouTube légère + chargement de l'iframe uniquement au clic de l'utilisateur).

### 6.2. Fiche documentaire d'une vidéo
Champs prévus : titre, identifiant YouTube, URL originale, date de publication (lorsqu'elle est vérifiée), durée, présentation, résumé validé, personnes intervenantes, thématiques, catégories, territoires concernés, mots-clés, transcription (si disponible et autorisée), sources complémentaires.

### 6.3. Constat réel des photographies et stratégie visuelle du lancement
- **Constat d'inventaire :** **0 photographie originale** n'est présente dans le dossier local du projet. Les seules images existantes sont les vignettes YouTube distantes et la photo de profil Facebook.
- **Interdiction formelle confirmée :** aucune image générique issue de banques d'images libres ni aucune image générée par intelligence artificielle ne sera utilisée pour représenter le Koutammakou, les Batammariba ou leur architecture.
- **Stratégie visuelle de substitution (0 €) :**
  1. *Design sobre axé sur la typographie et la mise en page* : grand soin apporté aux titres, chapô, lettrines, citations et espaces respirants (*Journalisme de terre et de mémoire*).
  2. *Palette chromatique identitaire sobre* : Kaolin (`#FAF8F4`), Charbon (`#161412`), Ocre latérite (`#8C3B22`), Vert Atakora (`#234738`), Sable d'argile (`#EFECE6`).
  3. *Typographies libres et distinctives* : `Newsreader` (titres), `Source Serif 4` (textes longs), `Public Sans` (interface).
  4. *Schémas et cartes vectorielles sobres (SVG)* : cartographie territoriale sobre (Bénin / Togo) et schémas patrimoniaux clairs sans fioritures décoratives.
  5. *Composants vidéo en façade* : exploitation sobre des vignettes YouTube officielles dans les fiches vidéo.
  6. *Intégration progressive* : dès la remise de photos de terrain par le média (lot de 15 à 30 clichés), chaque image sera intégrée dans Sanity Assets avec sa **fiche de droits obligatoire** (auteur, date, lieu, personnes, consentement).

---

## 7. SYSTÈME DE RECHERCHE DOCUMENTAIRE

- Recherche globale accessible depuis l'en-tête, permettant de chercher : sujet, personnalité, village, territoire, clan, tradition, rite, terme Ditammari, interview, reportage, vidéo.
- Solution retenue pour le lancement : **Pagefind** (indexation statique du HTML généré par Astro, 0 € de serveur, ultra-léger sur mobile).
- Affichage du type de ressource et de la catégorie sur chaque résultat.

---

## 8. GESTION ÉDITORIALE ET ADMINISTRATION

### 8.1. Gouvernance initiale
- Un seul administrateur principal au lancement ; aucun compte public grand public dans le MVP.
- Espace Sanity Studio privé et sécurisé par authentification, accessible sans compétences en développement web.

### 8.2. Fonctionnalités du Back-office
- Tableau de bord clair (publications, brouillons, contenus à vérifier, accès rapides, archives).
- Création, modification, dépublication/archivage de contenus ; ajout d'images via Sanity Assets et intégration par identifiant/URL YouTube ; gestion des catégories, mots-clés, entités documentaires et métadonnées SEO.
- *Précision validée :* la programmation automatique native des publications n'est **pas obligatoire dans le MVP** (une publication manuelle est acceptée dans la limite de l'offre gratuite Sanity).

### 8.3. Workflow éditorial et logiques de publication distinctes
Deux logiques de publication et de visibilité sont formellement distinguées :

1. **Contenus éditoriaux (`Article`, `Vidéo`) :**
   - Soumis au **workflow complet à 5 statuts** dans Sanity :
     1. `Brouillon`
     2. `À vérifier`
     3. `Prêt à publier`
     4. `Publié`
     5. `Archivé`
   - **Garde-fou obligatoire :** ajout d'un champ explicite **« Vérification des droits et validation culturelle »** (ex. case à cocher + référence/note publique ou interne non confidentielle) exigé pour les contenus rituels, historiques contestés ou témoignages impliquant des tiers.
   - **Visibilité publique :** conditionnée impérativement à `editorialStatus == "publie"`.

2. **Entités documentaires et taxonomies (`Personne`, `Territoire`, `Clan`, `Catégorie`, `Terme Ditammari`, `Source`) :**
   - **Ne possèdent pas de champ `editorialStatus`.**
   - Suivent le mécanisme de publication natif de Sanity (`Publish` dans Studio).
   - Visibilité publique conditionnée au rattachement à des contenus publiés ou à leur présence dans les répertoires/glossaires publics.

### 8.4. Gestion des médias
Chaque image importée dans Sanity Assets comporte : nom/titre, description, texte alternatif (`alt`), source/crédit et mention des droits d'utilisation.

### 8.5. Règle d'architecture du webhook unique
Conformément à la limite stricte de **2 webhooks GROQ par projet** sur le plan Sanity Free, l'actualisation automatique du site repose sur **un seul webhook principal** couvrant l'ensemble des 8 schémas sur le dataset `production`. Il est formellement exclu de créer un webhook distinct par type de contenu. Le second emplacement de webhook reste libre en réserve.
Le webhook sépare le déclenchement selon les deux catégories :
- Pour les contenus éditoriaux (`Article`, `Vidéo`) : déclenchement uniquement lors des transitions touchant au statut public `editorialStatus == "publie"` (publication initiale, mise à jour en ligne, archivage ou dépublication).
- Pour les entités documentaires et taxonomies : déclenchement lors de toute création, modification ou suppression d'un document publié.
- Les brouillons (`drafts.**`) sont formellement exclus pour tous les types.

---

## 9. MODÈLE DE DONNÉES DOCUMENTAIRES (PRÉPARÉ DÈS LA PHASE 1)

Les **8 schémas Sanity** suivants sont modélisés dès la Phase 1 avec leurs relations, répartis en deux catégories distinctes :

### 9.1. Groupe A — Contenus éditoriaux (avec champ `editorialStatus`)
1. **Article** (inclut actualités, reportages, dossiers, analyses — distingués par type/rubrique) : titre, slug, type éditorial, résumé, contenu structuré, image principale, date de publication, **`editorialStatus`** (`brouillon` | `a_verifier` | `pret_a_publier` | `publie` | `archive`), validation culturelle/droits (`culturalValidation`, `sensitivityLevel`, `rightsVerified`, `validationNote`), catégories, mots-clés, entités liées, SEO.
2. **Vidéo** : titre, identifiant YouTube, URL originale, résumé validé, durée, date, langue, personnes associées, territoires, clans, thématiques, transcription autorisée, sources complémentaires, **`editorialStatus`** (`brouillon` | `a_verifier` | `pret_a_publier` | `publie` | `archive`), validation culturelle/droits pour les pratiques spirituelles et rites.

### 9.2. Groupe B — Entités documentaires et taxonomies (sans champ `editorialStatus`)
3. **Personne** : nom, fonction ou domaine d'expertise vérifié, biographie publique, clan/territoire vérifié, liens vers publications et vidéos associées *(aucune coordonnée privée ni contact)*.
4. **Territoire** : toponyme vérifié, pays (Bénin / Togo), présentation, repères toponymiques, ressources associées.
5. **Clan** : nom, présentation de la tradition orale validée par la source, territoires associés, mention de validation coutumière (`validatedByElders`).
6. **Catégorie** : intitulé, slug, description, pilier d'appartenance (Média / Documentation).
7. **Terme linguistique Ditammari** : graphie Ditammari conforme aux normes linguistiques, phonétique, traduction française, explication grammaticale/culturelle, exemple, source, statut de validation linguistique (`linguisticValidation: "valide" | "en_attente"`).
8. **Source documentaire** : référence bibliographique, type de source, auteur ou organisme, URL ou document public, date de consultation.

*(+ Document singleton `siteSettings` : titre du site, métadonnées globales SEO, réseaux sociaux officiels).*

*Règle stricte d'intégrité :* aucune relation culturelle, clanique, territoriale ou linguistique ne doit être générée ou inférée automatiquement sans validation humaine.

---

## 10. STRATÉGIE LINGUISTIQUE

- **Phase initiale :** Français (interface, administration, actualités, articles, fiches documentaires).
- **Développement progressif :** fonds linguistique *Ditammari* (termes vérifiés, explications, exemples, prononciations si disponibles et validées).
- **Phase ultérieure :** ouverture prévue vers l'anglais pour les chercheurs et institutions internationales (structure d'URL et schémas pensés pour faciliter cette extension sans l'imposer au MVP).

---

## 11. IDENTITÉ VISUELLE ET EXPÉRIENCE UTILISATEUR

- **Direction artistique :** *Journalisme de terre et de mémoire*.
- **Palette indicative :** Kaolin `#FAF8F4`, Charbon `#161412`, Ocre latérite `#8C3B22`, Vert Atakora `#234738` (complétée au besoin par des tons neutres d'argile/sable pour les filets et surfaces).
- **Typographies à tester sur maquette :** `Newsreader` (titres), `Source Serif 4` (textes éditoriaux), `Public Sans` (interface).
- **Principes :** aucune esthétique générique type grille répétitive de cartes IA, dégradés excessifs ou glassmorphism décoratif ; priorité absolue à la hiérarchie éditoriale, aux photographies authentiques, aux espaces respirants et aux performances sur **smartphones Android d'entrée/milieu de gamme sous connexion limitée**.

---

## 12. ARCHITECTURE TECHNIQUE ET BUDGET VALIDÉS

- **Objectif financier impératif :** **0 € de frais techniques obligatoires au lancement** (aucune carte bancaire requise, aucun abonnement payant, aucun achat de domaine sans autorisation explicite).
- **Stack validée pour le MVP :**
  - **Frontend :** Astro (génération statique SSG).
  - **CMS :** Sanity (plan Free : 20 sièges, 2 rôles, 10 000 documents, **2 webhooks GROQ max par projet**).
  - **Hébergement :** Cloudflare Pages (plan Free : 500 builds/mois, 1 build simultané, durée max 20 min).
  - **Recherche documentaire :** Pagefind (index statique embarqué, 0 €).
  - **Images :** Sanity Assets (100 Go stockage + 100 Go/mois bande passante gratuits, compression WebP/AVIF).
  - **Vidéos :** YouTube (intégration `youtube-nocookie.com` en façade).
  - **Actualisation automatique :** **un seul webhook Sanity principal** couvrant les deux catégories de contenus (Groupe A : transition vers/depuis `editorialStatus == "publie"` ; Groupe B : création/modification/suppression sur document publié) → Deploy Hook Cloudflare Pages *(voir `docs/decisions-techniques-mvp.md`)*.
- **Gestion des reconstructions Cloudflare Pages :** La documentation officielle de Cloudflare Pages Deploy Hooks stipulant que *« chaque requête envoyée au Deploy Hook déclenche un nouveau build »*, le webhook est une **demande de reconstruction** et non une garantie de reconstruction unique. Aucune déduplication automatique n'est garantie sur Pages. La maîtrise du quota de 500 builds/mois repose sur la discipline éditoriale (préparation en brouillon, publication groupée) et le filtre GROQ strict, complétés si nécessaire en Phase 2 par un micro-Worker Cloudflare gratuit de temporisation (*debounce*).
- **Portabilité :** export complet des données Sanity en format standard NDJSON vers une future architecture auto-hébergée (Directus / Payload CMS / PostgreSQL) si les besoins ou quotas l'exigent.

---

## 13. SÉCURITÉ ET CONFIDENTIALITÉ (DISTINCTION ASTRO VS SANITY)

- **Distinction capitale de sécurité :** Le filtrage des contenus dans Astro (ex. `perspective: 'published'` et `editorialStatus == "publie"`) **ne constitue en aucun cas une protection de confidentialité dans Sanity**. Sur l'offre gratuite Sanity, le dataset `production` est entièrement public en lecture via API HTTP : toute donnée présente dans un document publié peut être lue directement par quiconque connaît l'identifiant du projet (`projectId`).
- **Règles absolues de non-stockage dans Sanity :** Sanity ne doit **JAMAIS** contenir :
  - les coordonnées privées des témoins, chercheurs ou informateurs (téléphones, emails personnels, adresses) ;
  - les formulaires de consentement nominatifs signés, contrats de droits ou pièces d'identité ;
  - tout document confidentiel ou note éditoriale interne non destinée à être rendue publique ;
  - les témoignages bruts et brouillons portant sur des rites sacrés ou sujets culturellement sensibles non encore formellement validés par les aînés.
- **Stockage sécurisé des éléments privés :** conservation impérative **hors ligne ou dans un espace documentaire privé chiffré**, avec un simple identifiant de référence interne non nominatif dans Sanity (ex. `REF-CONSENT-2026-018`).
- **Protection de l'URL secrète du Deploy Hook Cloudflare Pages :** L'URL générée par Cloudflare ne requiert aucune authentification pour déclencher un build. Elle doit être protégée comme un secret applicatif, stockée exclusivement dans la configuration privée du webhook Sanity, jamais dans le dépôt Git ni dans le code client, et régénérée immédiatement en cas de fuite suspectée.
- **Protections techniques supplémentaires :** authentification Sanity Studio stricte pour l'administrateur, requêtes Astro exécutées exclusivement avec `perspective: 'published'`, aucun jeton d'écriture ou de lecture de brouillon exposé côté client, HTTPS natif, protection anti-spam sur le formulaire de contact, et sauvegardes régulières par export NDJSON.

---

## 14. RÉFÉRENCEMENT ET VISIBILITÉ

- URLs lisibles, balises `<title>` et `<meta description>`, `sitemap.xml`, `robots.txt`, Open Graph (partage optimisé Facebook/WhatsApp), données structurées JSON-LD (`Article`, `VideoObject`, `Person`, `DefinedTerm`, `Place`), maillage interne entre actualités et fiches documentaires, liens visibles vers YouTube, Facebook et TikTok sans scripts tiers lourds.

---

## 15. SOURCES OFFICIELLES

- **Facebook :** `https://www.facebook.com/share/18fE9SxRk3/?mibextid=wwXIfr`
- **TikTok :** `https://www.tiktok.com/@carrefour.du.kout?_r=1&_t=ZS-9BLOnwiG873`
- **YouTube :** `https://youtube.com/@carrefourdukoutammakou-lz3cq?si=kPavwIr4zovoEeoL`

---

## 16. VALIDATION CULTURELLE ET FIABILITÉ DOCUMENTAIRE

1. Identifier les sources de chaque information importante.
2. Distinguer les faits documentés des interprétations.
3. Respecter les témoignages et les souhaits d'anonymat.
4. Obtenir les autorisations nécessaires (conservées hors du dataset public Sanity).
5. Vérifier les noms, fonctions et appartenances claniques des intervenants.
6. Faire relire les contenus sensibles par des personnes compétentes avant saisie pour publication.
7. Respecter les variantes linguistiques et traditions locales.
8. Employer avec précision et distinction les termes *Koutammakou, Kotamagou, Otamari, Batammariba, Tata, Takienta, Tamberma, Somba et Ditammari*.
9. L'IA assiste uniquement la préparation (transcription, résumé, classement) sous validation humaine obligatoire.

---

## 17. MODÈLE ÉCONOMIQUE FUTUR

Accès public gratuit au lancement. Pistes ultérieures sans compromettre l'indépendance éditoriale : partenariats institutionnels, projets patrimoniaux financés, sponsoring clairement identifié, productions documentaires, prestations audiovisuelles, soutien volontaire.

---

## 18. PHASAGE DU PROJET

- **Phase 0 — Préparation documentaire :** réalisée (`docs/phase-0/`).
- **Phase 1 — Construction du MVP :** validation des 20 vidéos candidates → choix des 10–15 vidéos de lancement + collecte des photos autorisées → mise en place d'Astro + Sanity Free + Pagefind + Cloudflare Pages sur `carrefour-du-kotamagou.pages.dev` *(en attente de votre feu vert explicite pour démarrer)*.
- **Phase 2 — Enrichissement documentaire :** ajout progressif d'autres vidéos, transcriptions vérifiées, glossaire Ditammari de 30 à 50 termes, fiches approfondies personnalités/territoires/clans, carte du territoire, recherche enrichie.
- **Phase 3 — Développement éditorial :** nouveaux formats, correspondants, rôles multiples, version anglaise, contributions encadrées.
- **Phase 4 — Développement à long terme :** services chercheurs/institutions, recherche avancée, partenariats durables, éventuelle application mobile.

---

## 19. CRITÈRES DE VALIDATION DU MVP

Le MVP sera validé uniquement lorsque :
- Toutes les pages listées en section 5 sont en ligne, fonctionnelles et non vides ;
- La navigation, la recherche Pagefind, le lecteur YouTube en façade et l'affichage mobile Android sont fluides ;
- L'administrateur maîtrise la création/modification/publication/archivage dans Sanity Studio et le redéploiement automatique fonctionne ;
- Aucune donnée privée ou secrète n'est exposée dans le dataset public ou le code ;
- Les 10–15 contenus de lancement et leurs photographies ont passé la vérification des droits et la validation culturelle.

---

## 20. CONDITIONS PRÉALABLES AVANT L'INITIALISATION TECHNIQUE

Le démarrage du code (Phase 1) reste suspendu jusqu'à validation explicite de votre part sur :
1. La sélection finale des **10 à 15 vidéos de lancement** parmi les **20 candidates** présentées ;
2. Le **fonds photographique réel** et les attestations de droits disponibles pour illustrer le MVP ;
3. La confirmation finale du lancement technique d'Astro + Sanity + Cloudflare Pages (`carrefour-du-kotamagou.pages.dev`).

---

## 21. RÉFÉRENCES OFFICIELLES ET STATUT DE VÉRIFICATION

### 21.1. Confirmé par la documentation officielle
- **Sanity Free — Quota de webhooks :** strictement 2 webhooks GROQ maximum par projet (`https://www.sanity.io/pricing`).
- **Sanity Webhooks — Déclencheurs & Delta-GROQ :** support de `create`, `update`, `delete` (unpublish = suppression de la version publiée / événement `delete`), exclusion automatique par défaut des documents `drafts.**` et `versions.**`, fonctions `delta::operation()`, `before()`, `after()`, timeout 30 s et 2 retries espacés de 30 s sur HTTP 429/5xx (`https://www.sanity.io/docs/content-lake/webhooks` et `https://www.sanity.io/docs/developer-guides/filters-in-groq-powered-webhooks`).
- **Cloudflare Pages Free — Limites & Deploy Hooks :** 500 builds/mois, 1 build simultané, timeout 20 min/build ; déclenchement d'un build par requête HTTP POST sur le Deploy Hook ; absence d'authentification sur l'URL du Deploy Hook (`https://developers.cloudflare.com/pages/configuration/deploy-hooks/` et `https://developers.cloudflare.com/pages/platform/limits/`).
- **Fonds du projet :** 122 vidéos et Shorts publics recensés sur YouTube ; 0 photographie originale présente dans l'espace de travail local au 12/11/2026.

### 21.2. Déduit techniquement
- **Architecture à 1 seul webhook principal :** imposée par le plafond de 2 webhooks sur Sanity Free pour couvrir tous les schémas en conservant 1 slot de réserve.
- **Séparation des logiques éditoriales :** Groupe A (contenus éditoriaux soumis au cycle à 5 statuts via `editorialStatus`) et Groupe B (entités documentaires et taxonomies gérées en publication native Sanity sans champ d'état complexe).
- **Absence de déduplication automatique sur Cloudflare Pages Deploy Hooks :** déduite de la formulation littérale de la documentation officielle de Pages et de l'absence de toute garantie de déduplication sur ce produit (contrairement à Workers Builds).

### 21.3. À vérifier lors de la création réelle du projet (Phase 1)
- Temps de réponse et d'acquittement HTTP du Deploy Hook Cloudflare Pages (< 30 secondes).
- Disponibilité effective du sous-domaine `carrefour-du-kotamagou.pages.dev`.
- Comportement réel de la file d'attente Cloudflare Pages sur deux POST consécutifs.

### 21.4. Non testé (en attente de création des services)
- Exécution du filtre GROQ combiné sur une instance Sanity réelle active avec des documents des deux groupes (aucun compte ni service n'ayant été créé à ce stade).
- Durée réelle d'un cycle complet de build et déploiement du site en conditions de production.
