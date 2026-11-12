# 08 — Comparatif des solutions techniques

Conformément aux principes de **`senior-backend-dev`** (*« Boring technology wins »*, pas de sur-ingénierie) et de **`saas-factory`**, ce document compare objectivement les options adaptées à un lancement à budget minimal tout en garantissant d'excellentes performances sur **smartphones Android d'entrée/milieu de gamme et connexions limitées**.

> **Attention sur la tarification :** Aucune gratuité « à vie » n'est supposée. Les offres gratuites mentionnées ci-dessous comportent des plafonds (bande passante, utilisateurs, requêtes API ou ressources serveur) susceptibles d'évoluer avec la croissance du trafic.

---

## 1. Comparatif des frameworks Frontend

| Critère | **Next.js (App Router + TypeScript)** | **Astro** |
| :--- | :--- | :--- |
| **Approche technique** | Framework React hybride (SSG + SSR + ISR + API routes intégrées). | Framework orienté contenu (*Content-first*), génère du HTML pur avec « îlots » JS uniquement là où c'est interactif. |
| **Performance Android / bas débit** | Très bonne si bien configuré (`next/image`, Server Components), mais envoie davantage de JavaScript client (runtime React) qu'Astro sur les pages interactives. | **Exceptionnelle** : quasiment 0 Ko de JS sur les pages de lecture pure (articles, dossiers, fiches clans). Idéal sur 3G/Android modeste. |
| **SEO & Données structurées** | Excellent (SSR/ISR natif, génération dynamique de `sitemap.xml`, balises OG et JSON-LD). | Excellent (HTML statique pré-rendu ultra-rapide, ou mode SSR hybride avec adaptateur). |
| **Complexité d'évolution (Phase 2–3)** | **Atout majeur** si la plateforme intègre plus tard des espaces contributeurs authentifiés, des workflows dynamiques ou une application interactive riche (ex. Payload CMS v3 tourne directement *dans* Next.js). | Parfait pour le site public ; si des fonctionnalités SaaS/communautaires complexes arrivent en Phase 3, nécessite un backend/API séparé (Directus, Supabase, etc.). |
| **Coût d'hébergement** | Gratuit au lancement sur **Vercel Hobby** *(strictement usage non commercial selon conditions Vercel — à vérifier si sponsoring/prestations médias en Phase 2 !)* ou **~5–10 €/mois** sur VPS (Coolify/Docker). | **0 €** même pour des sites à fort trafic statique sur **Cloudflare Pages** ou Netlify (avec adaptateur hybride si besoin). |

---

## 2. Comparatif des CMS et bases de données

Le cœur du projet nécessite **des relations complexes** (`Dossier ↔ Vidéos ↔ Intervenants ↔ Clans ↔ Villages ↔ Glossaire`) et **un workflow à 7 statuts**. WordPress pur est écarté comme solution principale car il vieillit mal sur la modélisation relationnelle lourde sans multiplier les plugins payants/fragiles.

| Solution | Nature & Stockage | Avantages | Inconvénients / Limites | Coût potentiel & Dépendances | Complexité admin / maintenance |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sanity.io** | CMS Headless Cloud (SaaS) + Sanity Studio personnalisable en français. | Interface éditoriale ultra-flexible (prévisualisation en direct, workflows configurables, relations propres) ; **zéro serveur à maintenir**. | Dépendance à un SaaS propriétaire ; l'offre gratuite plafonne le nombre d'utilisateurs (env. 10–20 selon plan), le trafic API/CDN et ne permet pas nativement tous les workflows avancés sans plan payant (*Growth* payant par siège). | **0 € au lancement** (Free tier), mais passage à **15 $/utilisateur/mois+** possible si l'équipe s'agrandit ou si le trafic explose. | Admin : **Très simple**. <br>Maintenance infra : **Nulle**. |
| **Directus** | CMS Headless / Data Studio open-source au-dessus d'une vraie base **PostgreSQL**. | Interface d'administration moderne (traductible en français), workflows de validation intégrés, gestion native des rôles/droits, **données 100 % propriétaires dans PostgreSQL**, API REST + GraphQL auto-générées. | Nécessite un hébergement Docker/Node + PostgreSQL (ou Directus Cloud payant) ; le code source est sous licence BSL (gratuit pour usage interne/média standard, à vérifier si revente SaaS — non concerné ici). | **0 € de licence**. Nécessite un VPS (~5–10 €/mois chez Hetzner/OVH/Contabo) + Postgres géré ou local. | Admin : **Simple et visuelle**. <br>Maintenance : **Moyenne** (mises à jour Docker + sauvegardes Postgres). |
| **Payload CMS v3** | CMS Headless open-source (MIT) intégré nativement dans **Next.js + PostgreSQL**. | **Un seul projet unifié** (Frontend + Admin + API), 100 % open-source (MIT, zéro lock-in), relations documentaires typées en TypeScript, versions/brouillons/statuts natifs, très économique en hébergement. | Pas de « no-code » pour modifier le schéma : toute évolution des types de contenus passe par un développeur. Interface admin en anglais par défaut (traduction FR intégrable). | **0 € de licence**. Hébergement unique sur VPS (~5–10 €/mois) ou Vercel + Postgres gratuit limité (Neon/Supabase Free, puis ~15–25 €/mois si dépassement). | Admin : **Simple pour l'éditeur**. <br>Maintenance : **Technique unifiée** (1 seul repo à maintenir). |
| **PostgreSQL (seul, sans CMS prêt)** | Base relationnelle de référence. | Fiabilité totale, recherche full-text intégrée (`tsvector` + `pg_trgm`), intégrité des relations. | Imposerait de coder tout le back-office éditorial de zéro (coût de développement Phase 1 multiplié par 2 ou 3). | **0 € à 15 €/mois** (Neon/Supabase free tier limités en stockage/mise en veille vs VPS). | Déconseillé *sans* CMS (Directus ou Payload) au-dessus. |

---

## 3. Recherche documentaire, médias et vidéo

### A. Solutions de recherche documentaire
1. **PostgreSQL Full-Text Search + `pg_trgm` (Recommandé si Payload/Directus) :**
   - *Avantages :* **0 € supplémentaire**, zéro synchronisation externe, support natif de la langue française (racinisation) + recherche floue par trigrammes pour tolérer *Kotamagou / Koutammakou* ou *Takyènta / Takienta*.
   - *Inconvénient :* Moins instantané à la frappe que Meilisearch à très grande échelle (au-delà de dizaines de milliers d'articles, seuil loin d'être atteint avant plusieurs années).
2. **Pagefind (si site Astro statique) :**
   - *Avantages :* Index statique découpé en petits paquets, **0 € de serveur**, ultra-rapide même hors-ligne partiel.
   - *Inconvénient :* Nécessite un rebuild du site à chaque publication pour mettre à jour l'index.
3. **Meilisearch (Auto-hébergé) / Algolia (SaaS) :**
   - *Verdict :* Pertinent en Phase 2/3 si l'index dépasse plusieurs milliers de fiches ; inutilement coûteux ou complexe au lancement (Algolia devient vite payant hors seuil gratuit).

### B. Hébergement des images et photographies documentaires
- **Recommandation :** **Cloudflare R2** (stockage objet compatible S3) couplé à l'optimiseur d'images du framework (`next/image` ou `@astrojs/image` / Sharp) ou **Cloudinary** au tout début.
- *Analyse coût/limites :*
  - **Cloudflare R2 :** offre gratuite incluant **10 Go de stockage/mois et zéro frais de bande passante sortante (egress)** — avantage décisif pour un média riche en photographies documentaires (nécessite une carte bancaire pour activer le compte Cloudflare même à 0 €).
  - **Cloudinary :** plan gratuit généreux en transformations automatiques (WebP/AVIF, recadrage intelligent), mais plafonné en crédits mensuels (25 crédits/mois — vite atteints si fort trafic photo).

### C. Hébergement et intégration des vidéos (YouTube, TikTok, Facebook)
- **Stratégie impérative pour budget limité :** **Ne jamais héberger ni transcoder les fichiers vidéo en direct sur le serveur du site** au lancement (les vidéos de 20 à 45 minutes détruiraient le budget bande passante et satureraient la connexion des utilisateurs).
- **Intégration YouTube « Façade » (`lite-youtube-embed` / composant maison) :**
  - Au chargement de la page, seule une **vignette WebP (~30–60 Ko)** et un bouton Lecture s'affichent.
  - Le script lourd de YouTube (~500 Ko–1 Mo) n'est chargé **que lorsque l'utilisateur clique pour lire**.
  - Usage du domaine `https://www.youtube-nocookie.com/embed/...` pour limiter les cookies tiers.
- **Cas TikTok / Facebook :** En Phase 1, préférer des liens contextuels propres ou des reprises éditoriales ré-hébergées sur YouTube plutôt que des widgets officiels Facebook/TikTok très lourds en JavaScript (souvent bloquants sur téléphone Android d'entrée de gamme).

---

## 4. Synthèse comparative de deux architectures réalistes pour la Phase 1

| Architecture | Composition | Coût mensuel lancement | Points forts | Points de vigilance |
| :--- | :--- | :---: | :--- | :--- |
| **Scénario 1 — « Tout-en-un souverain & économique »** | **Next.js + Payload CMS v3 + PostgreSQL + Cloudflare R2** (sur VPS Docker/Coolify ou Vercel+Neon) | **0 € à ~10 €/mois** | Zéro dépendance SaaS payante par utilisateur ; 100 % open-source ; workflow sur mesure natif ; recherche Postgres intégrée. | Nécessite un développeur pour évoluer le modèle de données ; bien calibrer le cache ISR/CDN pour les smartphones Android. |
| **Scénario 2 — « Ultra-rapide en lecture & CMS visuel »** | **Astro (statique/hybride) + Directus (VPS) ou Sanity (Cloud)** + **Cloudflare Pages** | **0 € (Sanity+CF) à ~10 €/mois (Directus VPS)** | **Performances mobiles inégalées** (quasi 0 JS côté lecteur) ; Directus offre une interface très visuelle pour un non-développeur. | Deux briques séparées à déployer et synchroniser (webhooks de rebuild lors d'une publication). |
