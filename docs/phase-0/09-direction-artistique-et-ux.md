# 09 — Proposition de direction artistique et d'expérience utilisateur

*Document fondé sur les directives des skills vérifiés : `frontend-design`, `ui-ux-pro-max`, `design-system`, `brand` et `banner-design`.*

---

## 1. Concept directeur : « Journalisme de terre et de mémoire »

L'identité visuelle de **Carrefour du Kotamagou** doit immédiatement signifier au visiteur qu'il entre dans **un grand média documentaire contemporain**, à la hauteur de *The Guardian* (rigueur éditoriale, hiérarchie nette par filets), de *National Geographic* (souveraineté de la photographie et du reportage long) et d'*Africanews* (ancrage continental lucide et actuel) — **sans copier aucun d'eux**.

### Ce que l'on refuse explicitement
- Les interfaces « template IA » génériques (grilles uniformes de cartes blanches à coins arrondis et ombres portées identiques, badges ALL-CAPS systématiques au-dessus de chaque titre, dégradés décoratifs ou glassmorphism gratuit).
- Les stéréotypes visuels pseudo-folkloriques (motifs géométriques criards en fond de page, textures parchemin artificielles nuisant à la lisibilité).
- La palette générique par défaut retournée par `ui-ux-pro-max` pour les blogs (`#EC4899` rose vif), totalement hors sujet ici.

---

## 2. Système de couleurs (Tokens primitifs et sémantiques)

Une palette inspirée par la matière première des Batammariba (« ceux qui façonnent la terre ») et les paysages de l'Atakora, conçue pour une lecture longue sans fatigue oculaire et un **contraste WCAG AA (≥ 4.5:1) garanti** :

| Token sémantique | Nom | Code Hex | Contraste sur `#FAF8F4` | Usage précis |
| :--- | :--- | :---: | :---: | :--- |
| `--color-bg` | **Papier Kaolin** | `#FAF8F4` | — | Fond de lecture principal (chaleureux et lumineux, distinct du blanc pur éblouissant). |
| `--color-surface` | **Sable Sec** | `#F1ECE2` | — | Encadrés documentaires (*Repères*, *Glossaire*, *Citer cette archive*). |
| `--color-ink` | **Charbon** | `#161412` | **~16.9 : 1** | Titres principaux et corps de texte. |
| `--color-ink-muted` | **Terre d'Ombre** | `#575049` | **~7.1 : 1** | Légendes photo, dates, durées, métadonnées. |
| `--color-primary` | **Ocre de Latérite** | `#8C3B22` | **~6.6 : 1** | Identité principale, liens actifs, filets d'accent de rubrique, CTA majeurs. |
| `--color-secondary` | **Vert Atakora** | `#234738` | **~9.8 : 1** | Ancrage territorial, rubriques *Clans & Territoires*, badges de validation culturelle. |
| `--color-accent` | **Or de Savane** | `#A86D13` | **~4.6 : 1** *(usage grand texte/icône/bordure)* | Repères discrets (barre de progression de lecture, élément actif, focus visible). |
| `--color-border` | **Argile Claire** | `#DDD4C7` | — | Filets éditoriaux `1px` structurant les colonnes façon presse écrite. |
| `--color-media-bg` | **Nuit d'Atakora** | `#141210` | `#F3EFE8` (**~15.5 : 1**) | Mode sombre réservé aux écrans immersifs *Médiathèque vidéo* et galeries photo. |

---

## 3. Système typographique (Vérifié via `ui-ux-pro-max`)

Les trois familles envisagées ont été vérifiées dans le catalogue `google-fonts` de `ui-ux-pro-max` ; toutes disposent d'axes variables complets et du sous-ensemble **`latin-ext`** (essentiel pour le français et une grande partie des diacritiques, à compléter par un test rigoureux des caractères spécifiques du *Ditammari* comme `ɛ`, `ɔ` ou tons nasalisés avant la Phase 1) :

1. **Titres éditoriaux & « Une » — `Newsreader`** (Google Fonts, axe optique `opsz: 6..72`, graisses `500–700`) :
   - Confère une autorité journalistique immédiate, chaleureuse et précise, sans rigidité académique froide.
2. **Corps de texte long-read (Dossiers & Interviews) — `Source Serif 4`** (`opsz: 8..60`, graisses `400–600`) :
   - Taille recommandée : `18px–19px` sur desktop (`17px` sur mobile), interlignage `1.65`, largeur de colonne plafonnée à **65–72 caractères** (`max-w-[65ch]`) pour une lecture sans effort.
3. **Interface, navigation, filtres & métadonnées — `Public Sans`** (`wght: 400–700`) :
   - Dessinée à l'origine pour l'accessibilité des services publics : extrêmement lisible en petite taille sur écrans Android modestes, sans fioritures.
4. **Données archivistiques ponctuelles (durées vidéo, codes archives, dates ISO) :** chiffres tabulaires (`font-variant-numeric: tabular-nums`) en `Public Sans` ou monospace sobre (`JetBrains Mono`) uniquement pour les index d'archives.

---

## 4. Principes de mise en page et expérience utilisateur

### 4.1 La « Une » éditoriale (Asymétrie maîtrisée, inspiration presse)
Au lieu d'un bandeau plein de statistiques ou de 12 cartes identiques :
- **Zone 1 — Ouverture souveraine :** Une grande photographie documentaire authentique (ratio 16:9 ou 3:2) accompagnée à côté ou en superposition maîtrisée (avec voile sombre lisible ≥ 4.5:1) d'un **seul grand sujet documentaire** (badge rubrique sobre + titre fort en *Newsreader* + chapeau de 2 lignes).
- **Zone 2 — Bandeau « Actualités & Terrain » (3 colonnes asymétriques séparées par de fins filets `1px`) :** 1 reportage illustré + 2 brèves datées + accès direct aux dernières vidéos.
- **Zone 3 — Bande « Dossiers de référence » :** Mise en scène de 2 ou 3 grands dossiers (ex. *Tipaanti*, *Clans du Koutammakou*, *Takienta*) avec indication du nombre d'archives liées.
- **Zone 4 — L'encadré pédagogique « Repères » :** Accès rapide au *Glossaire Ditammari* (« Mot du jour / Notion clé : *Batammariba*, *Takienta*, *Tibénti*… ») et à la *Carte du Koutammakou*.

### 4.2 Expérience de lecture et d'écoute (Dossier & Fiche vidéo)
- **Mise en page « Livre / Revue » :** Colonne centrale confortable (`65ch`), notes et définitions *Ditammari* affichables en marge sur grand écran ou en tiroir léger sur mobile.
- **Photographies légendées :** Jamais d'image décorative sans sens ; toute photo affiche lieu, contexte et crédit photographe.
- **Accessibilité (RGAA / WCAG AA) :**
  - Lien « Aller au contenu principal » (`skip link`) ;
  - Hiérarchie de titres stricte `h1 → h2 → h3` ;
  - Zones tactiles d'au moins **44×44 px** sur mobile ;
  - Respect strict de `prefers-reduced-motion` (animations utilitaires `150–250ms` sur tiroirs/filtres uniquement).

### 4.3 Cohérence graphique sur les réseaux sociaux (`banner-design` & `brand`)
Prévoir dès le kit de marque des gabarits déclinés pour harmoniser les comptes actuels avec le futur site :
- **Bannière YouTube (`2560×1440`, zone sûre `1546×423`)** et **Couverture Facebook (`820×312` / `640×360`)** reprenant le triptyque *Papier Kaolin / Charbon / Ocre de Latérite* et le sous-titre explicite : *« Carrefour du Kotamagou — Koutammakou & Patrimoine Batammariba »*.
- **Gabarit de vignettes vidéo par code couleur discret** : liseré *Ocre de Latérite* (Clans & Histoire), *Vert Atakora* (Territoires & Rites), *Charbon/Or* (Grands Entretiens).
