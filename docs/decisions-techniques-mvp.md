# Décisions Techniques du MVP — Carrefour du Kotamagou

**Version :** 1.2 (Clarification des logiques de publication, séparation des 8 schémas et sécurité Sanity)  
**Date :** 12 novembre 2026  
**Statut :** Document de référence technique consolidé — **aucun code initialisé, aucun compte créé**

---

## 1. Architecture technique retenue

| Composant | Technologie validée | Rôle exact dans le MVP | Coût au lancement |
| :--- | :--- | :--- | :---: |
| **Frontend** | **Astro** (mode statique SSG) | Génération de pages HTML/CSS ultra-légères (quasi 0 Ko JS hors composants interactifs) pour smartphones Android et connexions limitées. | **0 €** |
| **CMS Headless** | **Sanity** (formule *Free*) | Back-office éditorial (`Sanity Studio`) en français pour 1 administrateur principal ; stockage structuré des 8 schémas documentaires. | **0 €** |
| **Images** | **Sanity Assets** | Stockage des photographies originales autorisées (dès collecte) et redimensionnement/compression CDN (WebP/AVIF). | **0 €** |
| **Hébergement** | **Cloudflare Pages** (formule *Free*) | Diffusion statique mondiale sur CDN, certificat SSL HTTPS automatique ; sous-domaine envisagé `carrefour-du-kotamagou.pages.dev` *(disponibilité à vérifier lors de la configuration)*. | **0 €** |
| **Recherche** | **Pagefind** | Indexation statique générée à chaque build Astro ; recherche instantanée côté navigateur sans serveur ni API externe. | **0 €** |
| **Vidéos** | **YouTube** (`youtube-nocookie.com`) | Hébergement/streaming vidéo délégué à YouTube, intégré via composant « façade » (vignette légère + chargement iframe au clic uniquement). | **0 €** |
| **Actualisation** | **1 Webhook Sanity principal → Cloudflare Pages Deploy Hook** | Redéploiement automatique du site statique lors de mutations sur les contenus publics validés ou référentiels documentaires *(dans la limite stricte du quota gratuit)*. | **0 €** |

---

## 2. Limites vérifiées des offres gratuites

> *Ces données proviennent des documentations et grilles tarifaires officielles consultées le 12 novembre 2026 (voir section 9). Elles devront être re-vérifiées au moment de l'ouverture des comptes.*

### 2.1. Sanity Free (`sanity.io/pricing` et `sanity.io/docs`)
- **Utilisateurs :** 20 sièges gratuits maximum, limités à **2 rôles** (*Administrator* et *Viewer* — pas de rôles granulaires *Editor/Contributor* gratuits).
- **Datasets :** 2 datasets maximum (`production` et `staging`), **obligatoirement publics en lecture**.
- **Webhooks GROQ :** **plafond strict de 2 webhooks GROQ par projet** (*2 GROQ-powered webhooks* sur le plan Free). Conséquence d'architecture : **un seul webhook principal** est dédié aux reconstructions du site (1 slot utilisé, 1 slot conservé en réserve). Il est strictement exclu de créer un webhook distinct par type de contenu.
- **Documents :** plafond dur de **10 000 documents** par dataset.
- **Quotas mensuels :** **1 000 000 requêtes API CDN/mois**, **250 000 requêtes API non-cachées/mois**, **100 Go** de stockage d'actifs, **100 Go/mois** de bande passante d'actifs.
- **Dépassement :** pas de facturation automatique (*no pay-as-you-go overages*), mais blocage/limitation en cas de dépassement ou passage requis au plan payant.
- **Fonctionnalités absentes du plan gratuit :** datasets privés, *Scheduled Publishing* (programmation native), commentaires/tâches collaboratives avancées, RBAC personnalisé.

### 2.2. Cloudflare Pages Free (`developers.cloudflare.com/pages/platform/limits/`)
- **Bande passante statique :** illimitée (sous réserve des conditions d'utilisation Cloudflare : site web, sans hébergement massif de fichiers binaires/vidéo).
- **Builds :** **500 builds/mois**, **1 build simultané** (*1 build at a time*), timeout **20 minutes/build**, max **20 000 fichiers** et **25 MiB/fichier**.
- **Deploy Hooks :** l'envoi d'une requête `HTTP POST` vers l'URL secrète du Deploy Hook déclenche un nouveau build *(aucune déduplication automatique n'est documentée pour Cloudflare Pages Deploy Hooks ; voir section 4.5)*.
- **Fonctions dynamiques (si nécessaires ultérieurement) :** quota Workers Free distinct de **100 000 requêtes/jour**. En **SSG pur + Pagefind**, le site public ne consomme aucun quota dynamique.
- **Usage commercial :** autorisé sur l'offre gratuite Cloudflare Pages.

### 2.3. Pagefind
- Fonctionne 100 % côté client à partir des fragments d'index statiques générés pendant le `npm run build` d'Astro.
- **Limite pratique :** l'index ne se met à jour qu'après un build Cloudflare Pages (pas de mise à jour temps réel sans rebuild) ; performant jusqu'à plusieurs milliers de pages.

---

## 3. Sécurité essentielle : Distinction entre Filtrage Astro et Permissions Sanity

Il est impératif d'établir une distinction nette et sans équivoque entre la **couche de présentation Astro** et la **couche de données Sanity**.

### 3.1. Le filtrage dans Astro n'est PAS une protection de confidentialité
1. **Rôle d'Astro (Couche de rendu statique) :**
   - Lors de la génération statique (`astro build`), Astro interroge le dataset Sanity et filtre les documents (par exemple `editorialStatus == "publie"`).
   - Ce filtre garantit uniquement que les documents non publiés ou archivés ne génèrent pas de page HTML publique et n'entrent pas dans l'index Pagefind.
   - **En aucun cas ce filtre n'empêche l'accès direct aux données stockées dans Sanity.**
2. **Réalité du dataset public Sanity Free (Couche de données Content Lake) :**
   - Sur l'offre gratuite de Sanity, le dataset `production` est **entièrement public en lecture** (*public dataset*).
   - Toute personne ou script disposant de l'identifiant du projet (`projectId`) — qui est visible publiquement dans les requêtes réseau du site — peut interroger directement l'API HTTP de Sanity via l'URL publique :
     `https://<projectId>.api.sanity.io/v2021-10-04/data/query/production?query=*`
   - **Tout document ou champ présent dans le dataset publié peut être extrait directement via l'API, même s'il n'est jamais affiché sur le site web Astro.**

### 3.2. Règles absolues de confidentialité des données
En conséquence directe de cette architecture :

- **INTERDICTION FORMELLE ET PERMANENTE de stocker dans Sanity :**
  - Les coordonnées privées des personnes ressources, témoins, informateurs ou chercheurs (numéros de téléphone personnels, adresses électroniques privées, adresses physiques).
  - Les formulaires de consentement nominatifs signés, contrats de cession de droits ou pièces d'identité.
  - Tout document interne confidentiel, note éditoriale non publique ou arbitrage contesté.
  - Tout témoignage brut culturellement sensible ou récit initiatique non encore formellement validé pour publication par les aînés et les personnes concernées.
- **Stockage des éléments confidentiels :**
  - Ces documents doivent être conservés **exclusivement hors ligne ou dans un espace privé chiffré indépendant** géré par la direction du média.
  - Dans Sanity, un document public ne peut faire référence à ces éléments que par un **identifiant interne opaque non nominatif** (ex. `REF-CONSENT-2026-018`).
- **Protection de l'URL secrète du Deploy Hook Cloudflare Pages :**
  - L'URL de Deploy Hook fournie par Cloudflare **ne requiert aucune authentification supplémentaire**. Toute personne connaissant cette URL peut envoyer une requête POST et déclencher une reconstruction (risque d'épuisement des 500 builds/mois).
  - Cette URL doit rester strictement confidentielle, configurée uniquement dans les paramètres privés du webhook Sanity, jamais commitée dans le dépôt Git, ni exposée dans le frontend. En cas de suspicion de fuite, elle doit être révoquée et régénérée immédiatement.
- **Configuration stricte d'Astro :**
  - Build configuré exclusivement avec `perspective: 'published'` pour éviter la lecture accidentelle de brouillons (`drafts.**`).
  - Aucun jeton (*token*) d'écriture ni jeton de lecture avec accès aux brouillons ne doit être inclus dans le code source déployé.
- **Formulaire de contact :**
  - Aucun enregistrement direct des messages des visiteurs dans le dataset public Sanity. Utiliser un lien `mailto:` structuré ou un relais tiers sécurisé sans exposition de secrets.

---

## 4. Logiques de publication et actualisation automatique (1 Webhook Sanity → Cloudflare Pages)

### 4.1. Contrainte de quota : un seul webhook principal
Le plan Sanity Free étant limité à **2 webhooks GROQ au total par projet**, l'architecture du site utilise **un seul webhook principal** couvrant l'ensemble des contenus sur le dataset `production`. Le second webhook reste en réserve.

Il ne faut surtout pas supposer que tous les schémas possèdent un champ `editorialStatus`. Nous distinguons formellement deux catégories de contenus.

### 4.2. Séparation des deux catégories éditoriales

#### Catégorie A — Contenus éditoriaux (`article`, `video`)
Ce sont des publications journalistiques et documentaires soumises à un cycle de validation rigoureux :
- Ils possèdent obligatoirement le champ **`editorialStatus`** avec les 5 statuts validés : `brouillon`, `a_verifier`, `pret_a_publier`, `publie`, `archive`.
- Ils possèdent des champs de contrôle culturel et de droits : `culturalValidation` (booléen), `sensitivityLevel` (`standard`, `sensible`, `sacre`), `rightsVerified` (booléen).
- **Règle de reconstruction :** Ils ne doivent déclencher une reconstruction que si un document passe au statut `publie`, est modifié alors qu'il est `publie`, ou quitte le statut `publie` (passage à `archive`, dépublication ou suppression). Toute modification effectuée sur un document resté en `brouillon`, `a_verifier` ou `pret_a_publier` ne doit **jamais** déclencher de reconstruction.

#### Catégorie B — Entités documentaires et taxonomies (`person`, `territory`, `clan`, `category`, `ditammariTerm`, `source`, `siteSettings`)
Ce sont des éléments référentiels partagés ou des taxonomies :
- **Ils ne possèdent PAS de champ `editorialStatus`.** Y plaquer artificiellement un cycle à 5 statuts serait inutilement lourd et conceptuellement inadapté pour un lieu, un clan ou une catégorie.
- Leur cycle de vie repose sur le **mécanisme natif de publication de Sanity** : ils sont soit en cours de rédaction dans l'espace brouillon (`drafts.<id>`), soit publiés (`Publish` dans Studio).
- **Règle de reconstruction :** Dès lors qu'une de ces entités est **publiée, modifiée après publication, dépubliée ou supprimée**, elle impacte potentiellement la navigation, les filtres, les fiches documentaires ou les pages de recherche. Elle doit donc déclencher une reconstruction du site statique. En revanche, tant qu'elle reste dans l'espace brouillon (`drafts.**`), elle ne déclenche rien.

---

### 4.3. Examen individuel détaillé des huit schémas Sanity

| # | Schéma | Catégorie | Possède `editorialStatus` ? | Mécanisme de visibilité / publication | Déclenchement de reconstruction (Webhook) | Conditions d'apparition publique sur le site |
| :-: | :--- | :---: | :---: | :--- | :--- | :--- |
| **1** | **Article** (`article`) | A — Éditorial | **OUI** (`brouillon`, `a_verifier`, `pret_a_publier`, `publie`, `archive`) | Cycle éditorial complet à 5 statuts + validation culturelle/droits pour sujets sensibles. | **OUI si concerné par le statut public :**<br>• Première publication avec `editorialStatus == "publie"` (`create`).<br>• Modification d'un article en ligne (`update` avec `before` ou `after` = `"publie"`).<br>• Retrait vers archive ou dépublication/suppression (`delete`).<br>❌ **NON** pour les brouillons (`drafts.**`) ou documents au statut interne (`brouillon`, `a_verifier`, `pret_a_publier`). | 1. Publié dans Sanity (`!(_id in path("drafts.**"))`).<br>2. `editorialStatus == "publie"`.<br>3. Si sensible/sacré : validation culturelle et droits obligatoires.<br>4. Requis au build Astro via `perspective: 'published'`. |
| **2** | **Video** (`video`) | A — Éditorial | **OUI** (`brouillon`, `a_verifier`, `pret_a_publier`, `publie`, `archive`) | Cycle éditorial complet à 5 statuts + validation des droits de diffusion et du caractère publiable des rites/pratiques spirituelles. | **OUI si concerné par le statut public :**<br>• Publication initiale au statut `"publie"`.<br>• Modification d'une vidéo en ligne (titre, résumé, personnes liées, chapitres, transcription).<br>• Retrait (archivage, dépublication, suppression).<br>❌ **NON** pour les brouillons et vidéos aux statuts internes. | 1. Publiée dans Sanity.<br>2. `editorialStatus == "publie"`.<br>3. Identifiant YouTube public vérifié.<br>4. Validation culturelle renforcée si sujet sacré.<br>5. Requis au build Astro via `perspective: 'published'`. |
| **3** | **Person** (`person`) | B — Référentiel | **NON** | Publication native Sanity (`Publish` dans Studio). Optionnellement, champ booléen de désactivation simple (`actif: boolean`, défaut `true`). | **OUI pour toute mutation sur le document publié :**<br>• Première publication d'une notice biographique (`create`).<br>• Modification d'une notice publiée (nom, expertise, présentation) (`update`).<br>• Dépublication ou suppression (`delete`).<br>❌ **NON** tant que la fiche reste en brouillon (`drafts.**`). | 1. Publiée dans Sanity (`!(_id in path("drafts.**"))`).<br>2. Zéro donnée privée (aucun contact, email, téléphone privé).<br>3. Liée à au moins un contenu éditorial publié ou affichée dans l'annuaire des chercheurs/personnes ressources. |
| **4** | **Territory** (`territory`) | B — Référentiel | **NON** | Publication native Sanity (`Publish` dans Studio). | **OUI pour toute mutation sur le document publié :**<br>• Publication, modification (nom, pays Bénin/Togo, repères toponymiques) ou suppression d'un territoire publié.<br>❌ **NON** tant que la fiche est en brouillon. | 1. Publié dans Sanity.<br>2. Toponyme et pays validés.<br>3. Visible dans les fiches territoires, cartes schématiques et filtres des contenus publiés associés. |
| **5** | **Clan** (`clan`) | B — Référentiel | **NON** | Publication native Sanity (`Publish` dans Studio). Optionnellement, mention de validation par les aînés du clan (`validatedByElders: boolean`). | **OUI pour toute mutation sur le document publié :**<br>• Publication, modification (histoire orale, territoires d'implantation, patronymes) ou suppression d'un clan publié.<br>❌ **NON** tant que la notice reste en brouillon. | 1. Publié dans Sanity.<br>2. Récit de tradition orale vérifié et attribué à sa source.<br>3. Visible dans les fiches clans et les contenus éditoriaux publiés associés. |
| **6** | **Category** (`category`) | B — Taxonomie | **NON** | Publication native Sanity (`Publish` dans Studio). | **OUI pour toute mutation sur le document publié :**<br>• Publication, modification (intitulé, slug, description, pilier Média/Doc) ou suppression d'une catégorie.<br>❌ **NON** pour les brouillons non publiés. | 1. Publiée dans Sanity.<br>2. Rattachée à un pilier éditorial.<br>3. Visible dans les menus de navigation et filtres de recherche dès qu'elle contient des contenus publiés. |
| **7** | **Ditammari Term** (`ditammariTerm`) | B — Référentiel | **NON** *(possède un champ de validation linguistique `linguisticValidation: "valide" \| "en_attente"`)* | Publication native Sanity (`Publish` dans Studio) conditionnée à la conformité orthographique. | **OUI pour toute mutation sur le document publié :**<br>• Publication, modification (graphie Ditammari, traduction française, explication phonétique/grammaticale) ou suppression d'un terme publié.<br>❌ **NON** tant que le terme reste en brouillon. | 1. Publié dans Sanity.<br>2. Orthographe validée selon les normes linguistiques en vigueur (CNLD).<br>3. Visible dans le glossaire public et les définitions intégrées aux articles. |
| **8** | **Source** (`source`) | B — Référence | **NON** | Publication native Sanity (`Publish` dans Studio). | **OUI pour toute mutation sur le document publié :**<br>• Publication, modification (référence bibliographique, auteur, revue/ouvrage, lien public) ou suppression d'une source publiée.<br>❌ **NON** tant que la source reste en brouillon. | 1. Publiée dans Sanity.<br>2. Référence documentaire publique vérifiable.<br>3. Liée à au moins un article, une vidéo ou une fiche patrimoniale publiée. |
| *—* | **Site Settings** (`siteSettings`) | B — Singleton config | **NON** | Publication native Sanity (`Publish` dans Studio). | **OUI pour toute modification sur le document publié :**<br>• Mise à jour du titre du site, des métadonnées SEO globales ou des liens réseaux sociaux officiels.<br>❌ **NON** pour les brouillons non publiés. | 1. Publié dans Sanity.<br>2. Définit les éléments globaux du site (en-tête, pied de page, balises SEO par défaut). |

---

### 4.4. Filtre GROQ adapté et unifié (Webhook unique Sanity)

En appliquant rigoureusement la séparation entre les deux catégories, le filtre GROQ du webhook unique s'écrit :

```groq
!(_id in path("drafts.**"))
&& !(_id in path("versions.**"))
&& (
  // -------------------------------------------------------------
  // GROUPE A : Contenus éditoriaux soumis au cycle à 5 statuts
  // -------------------------------------------------------------
  (
    _type in ["article", "video"]
    && (
      // 1. Première publication directe avec le statut public "publie"
      (delta::operation() == "create" && after().editorialStatus == "publie")
      // 2. Mise à jour : le contenu est public, devient public, ou quitte le statut public (ex. archivage)
      || (delta::operation() == "update" && (after().editorialStatus == "publie" || before().editorialStatus == "publie"))
      // 3. Dépublication ("Unpublish") ou suppression d'un contenu qui était au statut public "publie"
      || (delta::operation() == "delete" && before().editorialStatus == "publie")
    )
  )
  // -------------------------------------------------------------
  // GROUPE B : Entités documentaires, taxonomies et configuration
  // (Pas de champ editorialStatus : toute mutation sur document publié déclenche un rebuild)
  // -------------------------------------------------------------
  || _type in ["person", "territory", "clan", "category", "ditammariTerm", "source", "siteSettings"]
)
```

#### Analyse rigoureuse du fonctionnement :
1. **Traitement des brouillons et versions :**
   - Par défaut, Sanity Webhooks ignore les espaces `drafts.**` et `versions.**` lorsque l'option *Include drafts* est désactivée (`OFF`).
   - Le filtre commence par une double clause de garde `!(_id in path("drafts.**")) && !(_id in path("versions.**"))` pour garantir une exclusion formelle même en cas de mauvaise manipulation dans la console.
   - **Toute frappe ou sauvegarde automatique dans Sanity Studio sur un brouillon est donc strictement ignorée.**
2. **Pour le Groupe A (`article`, `video`) :**
   - Un article en cours de relecture publié par erreur avec le statut `a_verifier` ou `pret_a_publier` : `after().editorialStatus != "publie"` → **aucun rebuild déclenché**.
   - Le passage d'un article au statut `publie` : `after().editorialStatus == "publie"` → **reconstruction déclenchée**.
   - La modification d'un article en ligne : `after().editorialStatus == "publie"` → **reconstruction déclenchée**.
   - Le passage d'un article de `publie` à `archive` : `before().editorialStatus == "publie"` → **reconstruction déclenchée** (retire l'article du site).
   - Une modification mineure sur un article déjà `archive` : ni `before` ni `after` ne vaut `"publie"` → **aucun rebuild déclenché**.
   - L'action « Unpublish » (dépublication) d'un article en ligne : Sanity supprime le document publié (`delta::operation() == "delete"`), `before().editorialStatus == "publie"` → **reconstruction déclenchée** (la page est retirée du site).
3. **Pour le Groupe B (`person`, `territory`, etc.) :**
   - Ne possédant pas `editorialStatus`, leur publication effective via le bouton « Publish » de Sanity représente une validation documentaire.
   - Dès qu'un changement intervient sur un document publié (renommage d'une catégorie, ajout d'une personne ressource, correction d'un terme Ditammari), la condition `_type in [...]` est vraie → **reconstruction déclenchée**.
   - Tant que le rédacteur travaille en brouillon, aucune reconstruction n'est déclenchée.

> **Statut de certitude :** Cette syntaxe utilise les fonctions documentées par Sanity (`delta::operation()`, `before()`, `after()`). Elle est déduite techniquement et devra faire l'objet d'un **test unitaire d'exécution en conditions réelles lors de la Phase 1** (via `webhook.site`) pour vérifier l'évaluation exacte des expressions sur une instance Sanity réelle.

---

### 4.5. Comportement réel des Cloudflare Pages Deploy Hooks (sans extrapolation)

D'après la documentation officielle spécifique à Cloudflare Pages (`developers.cloudflare.com/pages/configuration/deploy-hooks/` et `pages/platform/limits/`) :
- **Le Deploy Hook est une demande de reconstruction, et NON une garantie de reconstruction unique :**
  - La documentation indique textuellement : *« Every time a request is sent to your Deploy Hook, a new build will be triggered. »*
  - **Aucun mécanisme de déduplication automatique n'est documenté ni garanti pour Cloudflare Pages Deploy Hooks** (la déduplication documentée par Cloudflare concerne exclusivement un autre produit, *Workers Builds*).
  - Par conséquent, si deux requêtes POST sont envoyées à quelques secondes d'intervalle, Cloudflare Pages les placera en file d'attente et exécutera **deux builds consécutifs** (le plan Free autorisant 1 build à la fois).
- **Limites de build du plan Free :**
  - **500 builds par mois**, **1 build simultané** (*1 at a time*), durée maximale de 20 minutes par build.
  - Deux publications rapprochées consomment 2 builds sur le quota mensuel.
- **Politique de retries et gestion des erreurs de Sanity (`sanity.io/docs/content-lake/webhooks`) :**
  - Sanity n'envoie qu'**une seule requête concurrente par webhook**, avec un **timeout de 30 secondes**.
  - Si Cloudflare répond par un statut `200 OK` (ce que fait le Deploy Hook dès qu'il a pris en charge la demande), Sanity considère la livraison comme réussie et n'effectue aucun retry.
  - Si l'appel échoue (erreur réseau ou statut HTTP `429` ou `5xx`), Sanity effectue **2 nouvelles tentatives espacées de 30 secondes**, puis marque le webhook en échec (*failed*). Les erreurs de la série `4xx` (hors `429`) ne sont jamais retentées.
- **Solutions à 0 € pour éviter le gaspillage de builds :**
  1. *Discipline éditoriale de publication groupée (coût 0 €)* : effectuer toutes les préparations, relectures et corrections sous forme de brouillons (dans Studio), puis regrouper les passages à l'état publié par sessions éditoriales.
  2. *Filtre GROQ ciblé (coût 0 €)* : exclut tous les brouillons et modifications de contenus non publics.
  3. *Debounce technique par Cloudflare Worker gratuit (option Phase 2 à 0 € si nécessaire)* : si les publications devenaient trop fractionnées, un micro-Worker Cloudflare gratuit (100 000 req/jour gratuites) pourrait être intercalé entre Sanity et le Deploy Hook pour temporiser 2 à 3 minutes après la dernière mutation avant de déclencher un unique build.
- **Procédure de relance manuelle en cas d'échec :**
  - Si un webhook a échoué (incident passager Sanity ou Cloudflare) :
    1. Vérifier l'erreur dans *Sanity Manage → API → Webhooks → Attempts log*.
    2. Ouvrir le tableau de bord Cloudflare → *Workers & Pages* → projet du média → onglet *Deployments*.
    3. Cliquer sur *Retry deployment* sur le dernier déploiement de production, ou déclencher un build manuel à 0 €.

---

## 5. Modèle de données relationnel prévu (8 schémas Phase 1)

```text
Category (B) ◄───────┐
                     ├──► Article (A) [editorialStatus: brouillon|a_verifier|pret_a_publier|publie|archive]
Territory (B) ◄──────┤       │
Clan (B) ◄───────────┼───────┤ (relations croisées manuelles validées)
Person (B) ◄─────────┼───────┤
DitammariTerm (B) ◄──┼───────┤
Source (B) ◄─────────┘       ▼
                           Video (A) [editorialStatus: brouillon|a_verifier|pret_a_publier|publie|archive]
```

- **Groupe A — Contenus éditoriaux (`Article`, `Video`) :**
  - Portent obligatoirement : `editorialStatus` (`brouillon`, `a_verifier`, `pret_a_publier`, `publie`, `archive`), `culturalValidation` (booléen), `sensitivityLevel` (`standard`, `sensible`, `sacre`), `rightsVerified` (booléen), `validationNote` (texte court non confidentiel).
- **Groupe B — Entités documentaires et taxonomies (`Person`, `Territory`, `Clan`, `Category`, `DitammariTerm`, `Source`) :**
  - **Ne portent pas `editorialStatus`.**
  - Portent leurs métadonnées patrimoniales propres (ex. `linguisticValidation` pour `DitammariTerm`, `validatedByElders` pour `Clan`).
  - Gérées par la publication native Sanity (`Publish`).
- **Règle absolue d'intégrité :** Aucune relation clanique, territoriale ou linguistique n'est inférée par script ou IA ; chaque lien est explicitement vérifié et posé par l'éditeur humain.

---

## 6. Risques identifiés et stratégie de migration (Réversibilité)

| Risque identifié | Probabilité / Impact | Mitigation immédiate | Plan de migration si plafond atteint |
| :--- | :--- | :--- | :--- |
| **Exposition accidentelle d'une donnée privée dans Sanity Free** | Moyen / **Critique** | Interdiction formelle de saisir contacts privés/consentements dans Sanity ; `perspective: 'published'` strict dans Astro. | Passage au plan Sanity *Growth* (dataset privé) ou migration vers Directus auto-hébergé. |
| **Dépassement des 10 000 documents Sanity ou 100 Go bande passante médias** | Faible en Phase 1 / Moyen en Phase 3 | Rester sur 10–15 vidéos + 30–50 fiches au MVP ; optimiser les images (WebP/AVIF). | Export intégral via `sanity dataset export` (NDJSON + archives assets) et réimportation dans **PostgreSQL + Directus** ou **Payload CMS v3** sur VPS (~5–10 €/mois). |
| **Épuisement des 500 builds/mois Cloudflare Pages** | Faible (1 éditeur) | Filtre GROQ strict hors brouillons ; pas de déduplication automatique supposée sur Pages ; discipline de publication groupée. | Ajout d'un Worker de *debounce* gratuit (100k req/j), ou passage au mode hybride SSR léger si nécessaire. |
| **Indisponibilité / changement de politique YouTube sur une vidéo clé** | Faible / Moyen | Conserver les masters vidéo originaux sur disques locaux de l'équipe média (sauvegarde hors ligne). | Remplacement progressif du lecteur sur les vidéos critiques si un hébergement dédié devient finançable en Phase 3–4. |
| **Indisponibilité / changement de politique YouTube sur une vidéo clé** | Faible / Moyen | Conserver les masters vidéo originaux sur disques locaux de l'équipe média (sauvegarde hors ligne). | Remplacement progressif du lecteur sur les vidéos critiques si un hébergement dédié devient finançable en Phase 3–4. |

---

## 7. Liste des 20 vidéos candidates pour le lancement (Grille d'aide à la décision éditoriale)

> **Règle de gouvernance :** Cette liste constitue une **sélection de travail indicative de 20 vidéos candidates**, extraite des 122 ressources publiques de la chaîne YouTube officielle (`@carrefourdukoutammakou-lz3cq`). **L'équipe technique ne sélectionne pas elle-même les 10 à 15 vidéos finales du lancement.** Le choix final appartient exclusivement au comité éditorial et aux responsables du média, en s'appuyant sur les indicateurs de vigilance ci-dessous.
>
> ⚠️ **Signalement des rites sacrés et pratiques spirituelles :** Les vidéos portant sur la divination (`DFQ2F9KmkJw`), les rituels funéraires/d'ancestralisation (`_RIExO1OP94`), l'initiation féminine `Dikountri` (`MhYN0QAEY-Y`) et masculine `Difonni` (`7YE3sRRQ950`) sont soumises à une **validation culturelle renforcée obligatoire** avant toute publication de synthèse écrite ou mise en avant sur le site public.

| # | ID YouTube | Titre exact vérifié | Durée | Thématique | Intervenant identifié | Données manquantes sur l'intervenant | Droits & autorisations à vérifier | Validation culturelle requise | Niveau de sensibilité | Priorité éditoriale proposée |
| :-: | :--- | :--- | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **1** | `pq-pTTrLmes` | Origine des batammariba. Entretien avec l'historien Noël Koumba KOUSSEY | 22:17 | Histoire & origines | Historien Noël Koumba Koussey | Aucune majeure (qualité académique explicite). | Accord pour citations et synthèse écrite sur le site. | Oui (repères historiographiques). | **Standard** | **Haute** (Socle historique du média). |
| **2** | `UMBuzQpXlAI` | Les grands mouvements de migrations des batammariba. Avec l'Archéologue Didier N'DAH. | 14:35 | Histoire & archéologie | Archéologue Pr Didier N'Dah | Aucune (universitaire reconnu). | Accord pour reproduction des thèses et synthèses textuelles. | Oui (itinéraires migratoires et clans). | **Standard** | **Haute** (Socle archéologique, suite en `zqDWgxe__Pg`). |
| **3** | `nb62kCbckiw` | «L’Atacora était peuplé déjà au 3è siècle d’après mes fouilles archéologiques» Dr Gérard K. TIDOUO | 37:11 | Archéologie & peuplement | Dr Gérard K. Tidouo | Aucune (chercheur identifié). | Accord de l'auteur sur les datations citées. | Oui (sites de fouilles et repères chronologiques). | **Standard** | **Haute** (Caution scientifique forte, 848 vues). |
| **4** | `c3C_9sWtHtQ` | Entretien avec le Professeur Didier N'DAH sur la valorisation de tacienta (tata somba) | 14:22 | Architecture traditionnelle | Pr Didier N'Dah | Aucune. | Accord sur les synthèses consacrées à la *Takienta*. | Oui (respect de la distinction terminologique *Takienta / Tata*). | **Standard** | **Haute** (Seule vidéo titrée sur l'architecture traditionnelle). |
| **5** | `nju9mBQAwFk` | Entretien avec Dr Justin NATTA sur le classement de Koutammakou au patrimoine mondial de l'UNESCO | 25:35 | Patrimoine UNESCO | Dr Justin Natta | Date exacte de captation non précisée dans le titre. | Accord sur la transcription des propos officiels. | Standard (contexte institutionnel). | **Standard** | **Haute** (Fondement du classement UNESCO 2004). |
| **6** | `dVtnj0lyeEA` | Entretien avec Roger T. M'PO sur le site Koutammakou du Togo, patrimoine mondial de l'UNESCO. | 26:30 | Territoire Togo & UNESCO | Roger Tanti M'Po | Titre ou fonction officielle exacte à préciser. | Accord de diffusion et de citation écrite. | Oui (toponymie et communautés côté Togo). | **Standard** | **Haute** (Indispensable pour ancrer la dimension transfrontalière Togo/Bénin). |
| **7** | `xlSqNmf37lI` | DE NOUVELLES PERSPECTIVES DE KOUTAMMAKOU GRÂCE À SON EXTENSION. INTERVIEW AVEC PROF DIDIER N'DAH | 30:31 | Extension UNESCO 2023 | Pr Didier N'Dah | Aucune. | Accord de diffusion des propos. | Standard (dossier patrimonial officiel). | **Standard** | **Haute** (Actualité de l'extension UNESCO côté Bénin). |
| **8** | `6GYCQzzVsA8` | Chronique sur l'appellation "somba" avec William Koussa-N'dor YOKA. | 05:10 | Terminologie & identité | William Koussa-N'dor Yoka | Qualité / profession exacte de l'auteur à expliciter. | Accord de l'auteur pour présentation de sa chronique en texte. | Oui (enjeu identitaire et terminologique sensible). | **Sensible** (Débat d'appellation). | **Haute** (Clé pour la page *À propos* et la clarification éditoriale). |
| **9** | `uJtxUvQi9oA` | Premier épisode de l'entretien avec le sociologue Rigobert Kpanipa KOUAGOU, sur l'identité Tammari | 19:15 | Sociologie & identité | Dr Rigobert Kpanipa Kouagou | Mention explicite de l'épisode 2 (`L-QhLeeg3bQ`) à lier. | Accord du sociologue pour exploitation écrite. | Oui (fondements sociologiques de l'identité). | **Standard** | **Haute** (Pose le socle sociologique du peuple Batammariba). |
| **10** | `rjTccpLfd60` | L’enfant Otammari : de la naissance au rite de passage. Avec Dr Rigobert Kpanipa KOUAGOU | 19:29 | Cycles de vie & rites | Dr Rigobert Kpanipa Kouagou | Aucune majeure. | Accord de l'intervenant pour la fiche détaillée. | **Renforcée** (Description des rituels de naissance et d'enfance). | **Sensible** (Rites de passage). | **Moyenne** (Attendre relecture culturelle préalable du texte). |
| **11** | `DFQ2F9KmkJw` | Exclusivité : Comprendre l’art divinatoire chez Batammariba - tipaanti. Entretien avec un devin | 37:36 | Spiritualité & divination | Devin (*opon*, anonyme / non nommé au titre) | **Identité, village et statut coutumier du devin absents du titre.** | **Consentement éclairé et accord formel de diffusion du devin à vérifier.** | **RENFORCÉE / CRITIQUE** (Pratique sacrée réservée). | **SACRÉ** (Divination *tipaanti*). | **Basse pour le MVP** (À différer en Phase 2 ou réserver aux initiés après cadrage éthique). |
| **12** | `_RIExO1OP94` | De Tibénti à Dikou : un ensemble de rituels d'ancestralisation chez Batammariba | 25:26 | Rites funéraires & ancêtres | Aucun intervenant nommé dans le titre | **Nom de la personne ressource et autorité coutumière à identifier à l'écoute.** | **Autorisation des familles et des officiants coutumiers à vérifier.** | **RENFORCÉE / CRITIQUE** (Rituels d'ancestralisation *Tibénti* et *Dikou*). | **SACRÉ** (Funérailles et culte des ancêtres). | **Basse pour le MVP** (Nécessite une validation communautaire rigoureuse). |
| **13** | `MhYN0QAEY-Y` | DIKOUNTRI, RITE DE PASSAGE DE LA JEUNE FILLE OTAMMARI. RACONTÉ PAR JOSEPH K. OSSORI, CHEF DE CULTE | 15:12 | Rites d'initiation féminins | Joseph K. Ossori (chef de culte) | Consentement et accord des jeunes filles visibles à l'image. | **Accord formel du chef de culte sur la part publiable à l'écrit.** | **RENFORCÉE** (Distinction stricte secret initiatique vs savoir public). | **SACRÉ** (Initiation féminine). | **Moyenne** (Ne retenir que si la synthèse écrite respecte les interdits coutumiers). |
| **14** | `7YE3sRRQ950` | Déroulement du rite de passage du jeune homme appelé "Difonni", du clan Ossori, par Joseph OSSORI | 26:10 | Rites d'initiation masculins | Joseph Ossori | Qualité coutumière exacte à préciser dans la fiche. | Accord de l'officiant sur la retranscription. | **RENFORCÉE** (Spécificité clanique du rite Ossori à ne pas généraliser). | **SACRÉ** (Initiation masculine). | **Moyenne** (916 vues, mais restriction explicite au clan Ossori). |
| **15** | `6r1pogjnRbs` | Histoire des clans : d’où viennent Banadoba ? | 21:11 | Histoire clanique | Aucun intervenant nommé dans le titre | **Nom, clan et légitimité de l'intervenant à identifier à l'écoute.** | Accord de diffusion de la tradition orale clanique. | Oui (tradition orale propre au clan Banadoba). | **Sensible** (Histoire orale clanique). | **Moyenne** (Amorce de la rubrique Clans après identification de la source). |
| **16** | `ybX-BRTwkN8` | HISTOIRE Sur les sentiers de nos origines : Entretien avec deux mémoires vivantes à Kouaba | 33:47 | Mémoire orale villageoise | Deux mémoires vivantes à Kouaba (non nommées au titre) | **Noms, lignages et souhaits d'anonymat des deux aînés non précisés.** | **Consentement éclairé et droits à l'image des anciens de Kouaba.** | Oui (mémoire historique et orale locale). | **Sensible** (Témoignages de personnes âgées). | **Moyenne** (Forte audience de 951 vues, identification nominative préalable requise). |
| **17** | `TaKVZXjLO1I` | Manifestations populaires à Koutammakou : KOUTCHATI - Ep1 avec Mathieu Kommou N’DAH | 09:06 | Fêtes populaires & reportage | Mathieu Kommou N’Dah | Date et localisation exacte de la fête à préciser. | Accord de l'intervenant et des organisateurs. | Standard (manifestation festive publique). | **Standard** | **Haute** (Format court et vivant de 9 min, idéal pour lancer la rubrique *Reportages*). |
| **18** | `ZVQ3Y-M0ae0` | LA FEMME OTAMMARI DANS LA SOCIÉTÉ D'HIER A AUJOURD'HUI. AVEC PHILOMÈNE GNAMOU EPSE SANSOUAMOU | 33:55 | Place des femmes & société | Philomène Gnamou épse Sansouamou | Fonction / engagement associatif ou professionnel exact. | Accord de l'intervenante sur les citations et la notice. | Oui (règles coutumières et statut social). | **Standard** | **Haute** (Voix féminine d'autorité, 964 vues, essentielle pour l'équilibre éditorial). |
| **19** | `sNqK528-lUs` | LE FONIO, L'OR BLANC DE KOUTAMMAKOU ? POTENTIEL ÉCONOMIQUE ET DÉFI DU FONIO. AVEC PROF ARMAND NATTA | 38:10 | Économie agricole & terroir | Pr Armand Natta | Spécialité universitaire exacte à renseigner. | Accord de diffusion des éléments d'analyse économique. | Standard (patrimoine vivrier et agricole). | **Standard** | **Haute** (Démontre la prise en compte des réalités économiques actuelles). |
| **20** | `DoO4pTRl8PI` | Entretien avec le professeur N'da Antoine N'DA sur l'alphabétisation en Ditammari | 18:13 | Langue Ditammari | Pr N'da Antoine N'Da | Aucune majeure. | Accord sur les préconisations linguistiques et orthographiques. | Oui (conformité avec les travaux de la CNLD et des linguistes). | **Standard** | **Haute** (Fonde le pilier linguistique *Ditammari* du média). |

---

## 8. État réel des ressources photographiques et stratégie visuelle du lancement

### 8.1. Constat objectif dans l'espace de travail
- **Absence totale de photographies originales :** le dossier local du projet ne contient **aucune photographie** (0 fichier image).
- **Miniatures YouTube et captures d'écran :** les seules images existantes sont les vignettes YouTube distantes et la photo de profil de la page Facebook du média. Ces fichiers sont en basse/moyenne résolution, conçus pour des plateformes tierces et ne possèdent pas les garanties d'autorisation nécessaires pour des visuels plein cadre de premier plan.
- **Interdiction formelle confirmée :** aucune image issue de banques d'images génériques ni aucune illustration générée par intelligence artificielle ne sera utilisée pour représenter le Koutammakou, son architecture ou les communautés Batammariba. Cela violerait la ligne éditoriale, la dignité culturelle et l'authenticité patrimoniale du média.

### 8.2. Stratégie visuelle de substitution pour le lancement du MVP (0 €)
Pour pallier temporairement l'absence de photographies originales sans dégrader l'exigence esthétique ni la crédibilité du média, le MVP appliquera les principes suivants :

1. **Design éditorial sobre axé sur la typographie et la mise en page (*Journalisme de terre et de mémoire*) :**
   - Mise en avant de titres forts, de chapô éditoriaux soignés, de citations en exergue (*pull quotes*) et d'une hiérarchie de lecture claire.
   - Utilisation de lettrines sobres et d'espaces blancs généreux qui confèrent au site une allure de revue de référence plutôt que de simple catalogue d'images.
2. **Palette chromatique sobre et identitaire :**
   - Fond papier chaleureux : **Kaolin** (`#FAF8F4`).
   - Textes de haute lisibilité : **Charbon de bois** (`#161412`).
   - Accent architectural et culturel : **Ocre latérite** (`#8C3B22`).
   - Accent végétal et paysager : **Vert Atakora** (`#234738`).
   - Surfaces de cartes et filets discrets : **Sable d'argile** (`#EFECE6` / `#D9D3C7`).
3. **Typographies éditoriales distinctives (libres et gratuites via Google Fonts / Fontsource) :**
   - Titres et intertitres : **Newsreader** (serif élégant et digne, évoquant la presse de référence et l'archive historique).
   - Textes courants et analyses : **Source Serif 4** (excellente lisibilité de lecture longue sur écrans mobiles).
   - Interface, navigation, métadonnées et boutons : **Public Sans** (sans-serif neutre, rigoureux et hautement lisible).
4. **Schémas et cartes vectorielles sobres (SVG légers) :**
   - Cartographie schématique sobre illustrant la répartition transfrontalière du Koutammakou (Bénin / Togo) et les grands repères territoriaux (Boukoumbé, Natitingou, Kandé, Warengo, etc.).
   - Schémas explicatifs vectoriels clairs (ex. coupe simplifiée d'une *Takienta*, diagramme des piliers du média) dessinés de façon sobre et documentée, sans artifice pseudo-traditionnel.
5. **Composants vidéos « façade » avec vignettes YouTube publiques :**
   - Pour les fiches vidéo validées, réutilisation de la vignette officielle YouTube dans un conteneur au ratio 16:9 respectant la palette du site, avec bouton de lecture sobre ne chargeant l'iframe qu'à l'action explicite du visiteur.
6. **Protocole d'intégration progressive des photographies réelles :**
   - Dès qu'un lot de photographies originales sera mis à disposition par l'équipe du média (lot cible de 15 à 30 clichés de terrain : paysages de l'Atacora, architectures *Takienta*, scènes agricoles du fonio, artisanat, portraits d'intervenants consentis), chaque photo sera enregistrée dans Sanity Assets avec sa **fiche de droits obligatoire** (auteur, date, lieu, personnes représentées, référence de consentement, texte alternatif descriptif en français).

---

## 9. Références officielles et statut de vérification

Afin de garantir une transparence totale et de respecter le principe de non-extrapolation, chaque élément technique est catégorisé selon son niveau de certitude exact :

### 9.1. Confirmé par la documentation officielle
1. **Sanity Free — Quota de webhooks :** strictement limité à **2 webhooks GROQ par projet** (*2 GROQ-powered webhooks*), vérifié sur la grille tarifaire officielle `https://www.sanity.io/pricing`.
2. **Sanity Webhooks — Déclencheurs, Delta-GROQ et brouillons :**
   - Événements supportés : `create`, `update`, `delete`.
   - `delta::operation()` retourne `"create"`, `"update"` ou `"delete"`.
   - Sur `create`, `before()` vaut `null`. Sur `delete`, `after()` vaut `null`.
   - L'action « Unpublish » (dépublication) dans Sanity Studio supprime le document du dataset publié et déclenche l'événement `delete` (*« Unpublishing a document fires the delete trigger »*).
   - Les documents sous `drafts.**` et `versions.**` sont **ignorés par défaut** tant que l'option *Include drafts* reste désactivée.
   - Limites techniques de Sanity : 1 requête concurrente par webhook, timeout de 30 secondes, 2 retries espacés de 30 secondes uniquement sur HTTP 429 et 5xx (codes 4xx permanents non retentés).
   - Sources officielles : `https://www.sanity.io/docs/content-lake/webhooks`, `https://www.sanity.io/docs/developer-guides/filters-in-groq-powered-webhooks`, `https://www.sanity.io/docs/content-lake/webhook-best-practices`, `https://www.sanity.io/docs/specifications/groq-functions`.
3. **Cloudflare Pages Free — Quotas et Deploy Hooks :**
   - Formule Free : **500 builds par mois**, **1 build simultané** (*1 at a time*), durée maximale de 20 minutes par build.
   - Comportement officiel du Deploy Hook : *« Every time a request is sent to your Deploy Hook, a new build will be triggered. »*
   - Sécurité : l'URL du Deploy Hook ne dispose d'aucune authentification supplémentaire ; elle doit être protégée comme un secret applicatif sous peine de déclenchements non sollicités.
   - Sources officielles : `https://developers.cloudflare.com/pages/configuration/deploy-hooks/`, `https://developers.cloudflare.com/pages/platform/limits/`.
4. **Ressources du projet :**
   - Dossier local du projet : 0 photographie originale présente au 12/11/2026.
   - Chaîne YouTube `@carrefourdukoutammakou-lz3cq` : 122 vidéos et Shorts publics inventoriés avec exactitude dans la Phase 0.

### 9.2. Déduit techniquement
1. **Architecture à 1 seul webhook principal :** déduite de la limite stricte de 2 webhooks Sanity Free. Un webhook unique couvrant tous les schémas permet de faire fonctionner l'ensemble de la plateforme tout en conservant 1 emplacement en réserve.
2. **Séparation des logiques éditoriales (Groupe A vs Groupe B) :** déduite de la nature des contenus. Les contenus éditoriaux (`article`, `video`) nécessitent un statut de validation (`editorialStatus`), tandis que les référentiels et taxonomies (`person`, `territory`, `clan`, `category`, `ditammariTerm`, `source`) sont gérés par publication native Sanity sans champ d'état complexe.
3. **Absence de déduplication automatique sur Cloudflare Pages Deploy Hooks :** déduite de la formulation littérale de la documentation officielle de Pages et de l'absence de toute mention de déduplication sur ce produit (contrairement à *Workers Builds*). Par sécurité budgétaire et technique, nous traitons le webhook comme une simple demande de reconstruction qui peut déclencher plusieurs builds successifs s'il est sollicité de façon rapprochée.

### 9.3. À vérifier lors de la création réelle du projet (Phase 1)
1. **Latence réelle d'acquittement du Deploy Hook Cloudflare Pages :** mesurer le délai de réponse HTTP du Deploy Hook lors du premier appel de test pour s'assurer qu'il répond `200 OK` en moins d'une seconde (largement en deçà du timeout Sanity de 30 secondes).
2. **Disponibilité effective du sous-domaine Cloudflare Pages :** vérifier lors de la création du projet Pages que l'identifiant `carrefour-du-kotamagou.pages.dev` est disponible.
3. **Comportement de la file d'attente Cloudflare Pages :** observer le comportement réel de la console Cloudflare lorsqu'un deuxième appel POST est envoyé pendant qu'un build est en cours.

### 9.4. Non testé (en attente de création des services)
1. **Exécution du filtre GROQ unifié sur une instance Sanity réelle :** aucun projet Sanity n'ayant été créé à ce stade (conformément aux interdictions absolues), le filtre GROQ unifié n'a **pas été exécuté en conditions réelles**. Il devra obligatoirement être testé et validé lors du setup en Phase 1 (via `webhook.site` ou les journaux de livraison Sanity) sur les 8 types de schémas.
2. **Délai global de mise en ligne :** le temps exact de build et de déploiement global du site (estimé entre 1 et 3 minutes pour Astro SSG + Pagefind) n'a pas pu être mesuré en conditions de production réelles.
