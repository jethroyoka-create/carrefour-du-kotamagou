# 10 — Stratégie SEO et référencement documentaire

## 1. Diagnostic SEO initial

- **Atout majeur `[FAIT VÉRIFIÉ]` :** La plateforme dispose déjà de **122 vidéos uniques de terrain** couvrant des sujets extrêmement peu documentés en ligne en français structuré (ex. clans *Bèssoribè*, *Banacoba*, *Ossonou*, *Tadoni-kpaba*, rites *Tipaanti*, *Difonni*, *Dikountri*, *Tibénti*, *Dikou*).
- **Handicap actuel `[FAIT VÉRIFIÉ]` :** Sur YouTube, ces vidéos n'ont pas de descriptions écrites détaillées. Google ne peut donc pas indexer leur richesse sémantique, et l'audience chercheuse est captée par des sites généralistes tiers ou des blogs touristiques souvent approximatifs.

> **Principe réaliste :** Le SEO ne promet aucune « position n°1 garantie », mais vise une **autorité thématique durable** bâtie sur l'originalité des sources primaires, la précision terminologique et la régularité éditoriale.

---

## 2. Architecture d'URLs et grappes sémantiques (*Topic Clusters*)

Chaque URL doit être lisible, stable dans le temps (sans date obligatoire pour les fiches documentaires pérennes) et porteuse de sens :

- **Pages piliers (Dossiers de référence) :**
  - `/dossiers/koutammakou-patrimoine-unesco-benin-togo`
  - `/dossiers/architecture-takienta-tata-somba`
  - `/dossiers/tipaanti-art-divinatoire-batammariba`
  - `/dossiers/rites-tibenti-dikou-ancestralisation`
- **Pages satellites encyclopédiques reliées :**
  - `/clans/[slug]` (ex. `/clans/banacoba`, `/clans/bessoribe`, `/clans/ossonou`)
  - `/territoires/[slug]` (ex. `/territoires/boukoumbe`, `/territoires/koussocoingou`, `/territoires/nadoba`)
  - `/personnes-ressources/[slug]` (ex. `/personnes-ressources/rigobert-kpanipa-kouagou`)
  - `/glossaire/[terme]` (ex. `/glossaire/takienta`, `/glossaire/ditammari`, `/glossaire/batammariba`)
- **Actualités datées :** `/actualites/aaaa/mm/[slug]` ou `/actualites/[slug]` avec métadonnée de publication claire.

---

## 3. Stratégie sémantique sur les appellations (Pont *Kotamagou ↔ Koutammakou*)

Les internautes recherchent le sujet sous des requêtes très variées : *« Koutammakou »*, *« Kotamagou »*, *« Tata Somba »*, *« Takienta »*, *« Tamberma »*, *« peuple Batammariba »*, *« peuple Otamari »*, *« langue Ditammari »*, *« Boukombé »*.

**Règle SEO + Rigueur culturelle :**
1. Ne jamais faire de bourrage de mots-clés ni prétendre que ces termes sont synonymes.
2. Créer une **page de référence dédiée** (ex. `/documentation/comprendre-les-noms-koutammakou-batammariba-takienta`) expliquant clairement chaque terme, son origine et son contexte (Bénin vs Togo).
3. Sur la page d'accueil et dans les balises `<title>` / `meta description`, associer naturellement la marque **Carrefour du Kotamagou** aux termes descriptifs exacts (*« Carrefour du Kotamagou — Média & Archives du Koutammakou (Batammariba, Bénin & Togo) »*).

---

## 4. Levier n°1 : Transformer chaque grande vidéo en fiche écrite indexable

Toute vidéo intégrée sur la plateforme doit comporter au minimum :
- Un **titre éditorial clair** en `<h1>` ;
- Un **chapô synthétique** (120–160 mots) répondant directement à la question posée ;
- Un **résumé structuré ou une transcription vérifiée** (600 à 1 800 mots pour les entretiens de 20–37 min) ;
- Un **chapitrage horodaté** (`00:00`, `05:30`, etc.) ;
- L'identification explicite des **personnes-ressources, lieux et termes *Ditammari*** en liens internes.

---

## 5. Données structurées (`Schema.org` JSON-LD) et optimisation technique

| Type de contenu | Schémas JSON-LD à implémenter | Bénéfice d'indexation |
| :--- | :--- | :--- |
| **Articles & Reportages** | `NewsArticle` / `Article` + `BreadcrumbList` | Compréhension de l'auteur, date de publication/mise à jour, rubrique. |
| **Fiches Vidéos** | `VideoObject` (`name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`, `embedUrl`, `inLanguage`) | Éligibilité aux extraits vidéo Google (y compris pour les vidéos en `dit` / `fr`). |
| **Glossaire Ditammari** | `DefinedTermSet` et `DefinedTerm` | Positionnement sur les requêtes définitionnelles (« c'est quoi une Takienta », « signification Tibénti »). |
| **Personnes-ressources** | `Person` (`name`, `jobTitle`, `affiliation`, `knowsAbout`) | Renforcement des signaux **E-E-A-T** (Expérience, Expertise, Autorité, Fiabilité). |
| **Villages & Territoires** | `Place` / `AdministrativeArea` (`geo`, `containedInPlace`) | Ancrage SEO local Bénin (Atacora / Boukombé) et Togo (Kara / Kéran). |

### Optimisation images & performances mobiles (Core Web Vitals)
- Formats **AVIF / WebP** servis en tailles adaptatives (`srcset`), dimensions `width`/`height` explicites (zéro décalage de mise en page CLS), attribut `loading="lazy"` hors image principale LCP.
- Attributs `alt` descriptifs et authentiques (mentionnant le sujet réel, ex. *« Façade d'une Takienta à Koussocoingou dans l'Atacora »*).

---

## 6. Référencement local, international et stratégie multilingue progressive

- **Phase 1 (Français + termes *Ditammari* balisés) :** Balise `<html lang="fr">`, avec attribut `lang="dtp"` / code ISO langue approprié à vérifier (`tbz` = *Ditammari* dans ISO 639-3 — **à confirmer avec linguistes/CNLD avant implémentation**) sur les citations vernaculaires.
- **Phase 2–3 (Ouverture anglaise sélective) :** Traduction prioritaire des **grands dossiers UNESCO**, de l'architecture *Takienta* et du glossaire pour capter les recherches universitaires et patrimoniales internationales (`/fr/...` et `/en/...` avec balises `hreflang` propres).
- **Stratégie de liens entrants (*Backlinks*) organiques :** Le bloc « Citer cette ressource » + la qualité des transcriptions attireront naturellement des citations depuis des mémoires universitaires, articles Wikipédia, ONG patrimoniales et médias béninois/togolais.
