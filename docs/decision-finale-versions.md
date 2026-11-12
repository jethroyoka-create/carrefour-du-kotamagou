# DÉCISION FINALE DES VERSIONS ET VALIDATION TECHNIQUE AVANT FUSION
## Projet : Carrefour du Kotamagou
**Date :** Novembre 2026  
**Branche d'évaluation :** `validation-finale-versions`  
**Branche principale préservée :** `main` (commit `1ed01c3`)  
**Branches d'audit préservées :** `modernisation-tech` (`7aca39e`), `audit-technique-approfondi` (`7562d17`)

---

# 1. CONTEXTE ET OBJECTIFS DE LA MISSION

Suite à l'audit technique approfondi (`docs/audit-fondations-techniques.md`), deux interrogations majeures subsistaient avant d'autoriser la fusion vers `main` :
1. **La viabilité d'Astro 7 avec Tailwind CSS 3.4 sans l'intégration dépréciée `@astrojs/tailwind`** : déterminer si l'abandon de `@astrojs/tailwind` impose de rester sur Astro 5 ou si une intégration native Vite/PostCSS permet d'adopter directement Astro 7 (la version majeure activement maintenue) sans migrer vers Tailwind 4 et sans toucher à la charte graphique.
2. **La pertinence de Sanity Studio v4 par rapport à v3 et v5/v6** : évaluer si Sanity v4 offre le compromis optimal de modernité, de compatibilité Node 24 et de stabilité avec React 18, tout en élucidant les causes racines exactes des conflits rencontrés avec Sanity v5/v6 sous React 19.

Cette mission a été exécutée dans un environnement strictement isolé, sans frais (0 €), sans création de projet distant, sans compte externe et sans altérer les branches de référence.

---

# 2. ANALYSE COMPARATIVE DE DURABILITÉ

### 2.1. Astro : Comparatif des versions (v4 vs v5 vs v7)

| Critère | Astro 4 (`4.16.19`) | Astro 5 (`5.18.2`) | Astro 7 (`7.4.11`) **[Retenu]** |
| :--- | :--- | :--- | :--- |
| **Statut de maintenance officiel** | **Obsolète / Non maintenu** (Documentation classée en archive legacy par l'équipe Astro). | **Transitoire** (Remplacé par Astro 6 puis Astro 7 ; maintenance limitée aux correctifs critiques). | **Activement maintenu** (Dernière version majeure stable officielle du framework). |
| **Support de sécurité** | Aucun correctif de sécurité officiel. Risque de CVE non corrigées dans le moteur. | Maintenance de sécurité réduite (cycle de vie centré sur la branche majeure courante). | Support de sécurité actif, réactivité immédiate de l'équipe de développement. |
| **Compatibilité Node.js 24** | Partielle / Non garantie officiellement (moteur Vite 5 legacy). | Compatible Node 24 sous conditions d'options strictes. | **Pleine compatibilité native avec Node.js 24 LTS** (moteur Vite 6 moderne). |
| **Dépendance Tailwind** | Dépendait de `@astrojs/tailwind` (désormais déprécié). | Dépendait de `@astrojs/tailwind` (bloqué à `astro <= 5`). | **Indépendant** via le pipeline standard PostCSS / Vite (`postcss.config.mjs`). |
| **Risque technique à 12-24 mois** | **Critique** : Dette technique immédiate, blocage des évolutions futures. | **Moyen à élevé** : Nécessitera une migration majeure obligatoire à court terme. | **Nul à très faible** : Socle moderne pérenne pour tout le cycle de vie du MVP. |
| **Recommandation** | Rejet formel. | Option de repli temporaire uniquement. | **Recommandé pour la fusion.** |

---

### 2.2. Intégration Tailwind CSS : `@astrojs/tailwind` vs PostCSS / Vite

| Critère | `@astrojs/tailwind` (Intégration Astro) | PostCSS / Vite (`postcss.config.mjs`) **[Retenu]** |
| :--- | :--- | :--- |
| **Statut officiel** | **Officiellement déprécié** par l'équipe centrale Astro. | **Recommandation officielle standard** pour Tailwind CSS v3 dans l'écosystème Vite/Astro. |
| **Contrainte de version (`peerDependencies`)** | Verrouillé à `astro: "^3.0.0 \|\| ^4.0.0 \|\| ^5.0.0"`. Bloque l'installation d'Astro 6 et 7. | **Découplé** : aucune dépendance de version avec le framework hôte. |
| **Impact sur le code source** | Nécessitait une configuration spécifique dans `astro.config.mjs`. | Standard web universel : fichier `postcss.config.mjs` + directives `@tailwind` dans `global.css`. |
| **Modification de la charte graphique** | Aucune. | **Aucune réécriture requise** : conservation intégrale de `tailwind.config.mjs` et de toute la palette. |
| **Risque technique à 12-24 mois** | **Blocage strict** dès la moindre mise à jour du framework. | **Pérennité totale** : standard industriel supporté par l'ensemble de l'outillage web. |
| **Recommandation** | Suppression définitive. | **Recommandé et validé en conditions réelles.** |

---

### 2.3. Sanity Studio : Comparatif des versions (v3 vs v4 vs v5/v6)

| Critère | Sanity Studio v3 (`3.99.0`) | Sanity Studio v4 (`4.22.1`) **[Retenu]** | Sanity Studio v5 / v6 (`5.31.2` / `6.15.0`) |
| :--- | :--- | :--- | :--- |
| **Statut de maintenance officiel** | Mode maintenance / Fin de cycle progressif. | **Version activement supportée** avec passerelle vers le futur écosystème. | Version la plus récente, mais instable au sein de l'écosystème étendu. |
| **Contrainte React (`peerDependencies`)** | `react: "^18 \|\| ^19"` | `react: "^18 \|\| ^19"` | `react: "^19.2.2"` strict (interdit formellement React 18). |
| **Installation propre (sans flags)** | Propre avec React 18.2 / 18.3. | **100 % propre avec React 18.3.1** (0 flag, 0 conflit). | **Échoue en résolution npm standard** : impose des avertissements `ERESOLVE overriding peer dependency`. |
| **Compatibilité Node.js 24** | Compatible. | **Pleine compatibilité native Node 24** (`engines: >=20.19 <22 \|\| >=22.12`). | Requiert Node `>=22.12` strict. |
| **Build de production (`sanity build`)** | Fonctionnel. | **Validé avec succès** (compilation statique complète en 102s). | Risques de rupture de build avec certains sous-paquets dnd et media. |
| **Schémas éditoriaux (8 types)** | 100 % compatibles. | **100 % compatibles sans modification de code**. | Nécessite des refactorisations de types TypeScript. |
| **Risque technique à 12-24 mois** | Moyen (obsolescence prévisible). | **Très faible** : architecture modernisée, support stable éprouvé. | Élevé à court terme (dette d'incompatibilité React 19). |
| **Recommandation** | Acceptable en repli. | **Recommandé pour la fusion.** | Rejeté pour le lancement immédiat. |

---

# 3. ANALYSE TECHNIQUE DE LA RUPTURE SANITY V5/V6 AVEC REACT 19

L'évaluation approfondie menée en environnement isolé a permis d'isoler précisément les causes racines des conflits de Sanity v5 et v6, réfutant toute supposition vague :

1. **Verrouillage strict des `peerDependencies` sur React 19.2.2** :
   Contrairement à Sanity v3 et v4 qui acceptent la plage `^18 || ^19`, les versions `sanity@5.31.2` et `sanity@6.15.0` déclarent explicitement :
   ```json
   {
     "react": "^19.2.2",
     "react-dom": "^19.2.2",
     "styled-components": "^6.1.15"
   }
   ```
   Toute tentative d'installation avec React 18 échoue immédiatement avec l'erreur `ERESOLVE unable to resolve dependency tree`.

2. **Incompatibilités en cascade au sein de l'arbre de dépendances** :
   Lorsqu'on tente de satisfaire cette contrainte avec `react@19.2.2`, le gestionnaire npm signale immédiatement :
   `npm warn ERESOLVE overriding peer dependency`
   Ce conflit provient de sous-paquets critiques intégrés ou adjacents à Sanity Studio, notamment :
   - `@mux/mux-player-react@3.14.1` (dont les `peerDependencies` attendent `react: "^18 || ^17"`).
   - `@dnd-kit/core@6.3.1` et `@dnd-kit/sortable@10.0.0` (utilisés pour les ordonnancements de listes et tableaux dans le Studio).
   - `@rexxars/react-json-inspector@9.0.1`.
   - Certaines définitions `@types/react@19` incompatibles avec les signatures de composants tiers (suppression de `defaultProps`, refonte des types de `ReactNode` et gestion des refs).

3. **Conclusion sur le choix de Sanity v4** :
   Sanity Studio v4 (`4.22.1`) représente le point d'équilibre parfait : il apporte le moteur CLI moderne, la compatibilité Node 24, supporte nativement React 18.3.1 sans aucun conflit d'arbre (`ERESOLVE`), compile le Studio statique sans erreur et préserve l'intégrité absolue des 8 schémas éditoriaux créés pour le projet.

---

# 4. TABLEAU DES VERSIONS RECOMMANDÉES POUR LA FUSION

| Composant | Version retenue | Justification technique et rôle dans le projet |
| :--- | :--- | :--- |
| **Node.js** | **24.22.3 LTS** | Version LTS active à long terme. Alignée dans `.nvmrc`, `package.json` et `.env.example` pour Cloudflare Pages. |
| **Astro** | **7.4.11** | Dernière version majeure stable. Moteur Vite 6 ultra-rapide, 0 avertissement, maintenance active de long terme. |
| **Intégration CSS** | **PostCSS 8 + Autoprefixer 10** | Remplacement officiel et propre de `@astrojs/tailwind`. Découplage complet entre Astro et les outils de style. |
| **Tailwind CSS** | **3.4.19** | Stabilité totale. Conservation exacte des classes, des tokens éditoriaux (`kaolin`, `charbon`, `ocre`, `vert`, `sable`) et de la charte visuelle. |
| **Sanity Studio** | **4.22.1** | Moteur de back-office pérenne, support natif de Node 24, 0 conflit de dépendances, 100 % compatible avec les 8 schémas. |
| **React / React DOM** | **18.3.1** | Version de référence pour le back-office Sanity. Zéro avertissement d'installation, build statique validé en 102s. |
| **Client Sanity** | **@sanity/client 6.28.2** | Client universel ESM pour Astro SSG, requêtes GROQ sécurisées en lecture seule. |
| **Pagefind** | **1.6.0 (Extended)** | Moteur de recherche statique binaire ultra-rapide (Rust), 17 pages indexées en 0,17s, 0 rupture. |
| **TypeScript** | **5.7.3 (Frontend) / 5.4.0 (Studio)** | Typage strict de l'ensemble du projet sans aucune erreur de compilation (`tsc --noEmit`). |

---

# 5. RÉSULTATS DES TESTS RÉELS EXÉCUTÉS

Les tests suivants ont été exécutés avec succès sous Node.js 24.22.3 et documentés avec preuves d'exécution :

### Test 1 : Installation des dépendances (0 flag, 0 contournement)
- **Frontend** : `npm install` exécuté proprement avec Astro 7.4.11, Tailwind 3.4.19, Autoprefixer et PostCSS.
  * *Résultat* : 0 vulnérabilité, 0 conflit d'arbre `ERESOLVE`.
- **Studio Sanity** : `npm install` exécuté proprement dans `studio/` avec `sanity@4.22.1`, `react@18.3.1` et `styled-components@^6.1.15`.
  * *Résultat* : `added 113 packages, removed 147 packages, changed 108 packages, and audited 1077 packages in 6m` sans `--force` ni `--legacy-peer-deps`.

### Test 2 : Diagnostics TypeScript (`astro check` & `tsc --noEmit`)
- **Frontend** : `npx astro check`
  * *Résultat* : `Result (31 files): 0 errors, 0 warnings, 0 hints`.
- **Studio** : `npm run type-check` (`tsc --noEmit`)
  * *Résultat* : Sortie avec code 0, 0 erreur de typage sur l'ensemble des schémas et de la structure de bureau.

### Test 3 : Build de production et compilation des styles
- **Frontend** : `npm run build`
  * *Résultat* : 19 pages statiques compilées avec succès en 9,78s (14,60s au total).
  * *Contrôle CSS* : Les classes personnalisées (`bg-ocre`, `text-charbon`, `bg-kaolin`, `#8C3B22`, `#234738`) sont présentes et appliquées dans les fichiers générés `dist/_astro/*.css` et `dist/index.html`.
- **Studio** : `npm run build` (`sanity build`)
  * *Résultat* : `✓ Clean output folder (8ms)`, `✓ Build Sanity Studio (102295ms)`. Sortie statique générée avec succès dans `studio/dist/` (`index.html`, `favicon.ico`, `static/`).

### Test 4 : Indexation et recherche Pagefind
- **Exécution** : `pagefind --site dist`
  * *Résultat* : 19 fichiers HTML analysés, 1 langue détectée (fr), 17 pages indexées (pages 404 et recherche exclues par `data-pagefind-ignore`), 1158 mots indexés en 0,171 seconde.

### Test 5 : Audit des liens internes
- **Exécution** : `python3 scratch/audit_links.py`
  * *Résultat* : 19 fichiers HTML vérifiés, 37 routes internes recensées, **0 lien brisé détecté**.

---

# 6. PROCÉDURE EXACTE DE VALIDATION ET DE REPRODUCTION

Pour reproduire l'intégralité des vérifications sur une machine configurée :

```bash
# 1. Activation de Node.js 24
source "$HOME/.nvm/nvm.sh"
nvm use 24

# 2. Vérification et build du frontend Astro
npm run build

# 3. Vérification des liens internes
python3 -c "
import os, glob, re
dist = 'dist'
html_files = glob.glob(os.path.join(dist, '**/*.html'), recursive=True)
routes = set()
for f in html_files:
    rel = os.path.relpath(f, dist)
    if rel == 'index.html': routes.add('/')
    elif rel.endswith('/index.html'): routes.add('/' + rel[:-10] + '/')
    elif rel == '404.html': routes.add('/404.html')
    else: routes.add('/' + rel)
broken = []
for f in html_files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    for link in re.findall(r'href=[\"\\\'](/[^\"\\\'#?]*)[^\"\\\']*[\"\\\']', content):
        if link not in routes and link != '/' and link + '/' not in routes:
            broken.append((f, link))
assert len(broken) == 0, f'Liens brisés détectés : {broken}'
print(f'Validation réussie : {len(html_files)} fichiers HTML, 0 lien brisé.')
"

# 4. Vérification et build du back-office Sanity Studio
cd studio
npm run type-check
npm run build
cd ..
```

---

# 7. DÉCISION FINALE D'INTÉGRATION

### Décision explicite : **FUSION AUTORISÉE**

L'alternative d'intégration PostCSS pour Tailwind CSS 3.4 résout définitivement l'incompatibilité avec Astro 7 tout en éliminant la dépendance dépréciée `@astrojs/tailwind`. De son côté, Sanity Studio v4 garantit un back-office moderne, sans conflit d'arbre de dépendances, parfaitement stable sous Node 24 et React 18.3.1.

Cette configuration élimine toute dette technique immédiate, assure un support actif de 12 à 24 mois sans rupture, et conserve à 100 % la charte éditoriale, l'accessibilité et les 8 schémas documentaires du projet.

- **Branche source validée :** `validation-finale-versions`
- **Branche cible de destination :** `main`
- **Statut budgétaire :** 0,00 € engagé (conformité stricte aux règles de démarrage).
- **Prochaine étape autorisée après accord :** Fusion propre (`git merge --ff-only` ou commit de merge explicite) de `validation-finale-versions` dans `main`, avant la préparation de la Phase 2.
