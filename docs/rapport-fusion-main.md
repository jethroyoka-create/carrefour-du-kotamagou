# RAPPORT DE FUSION VERS LA BRANCHE PRINCIPALE (MAIN)
## Projet : Carrefour du Kotamagou
**Date :** Novembre 2026  
**Opération :** Fusion de la modernisation technique validée (Astro 7 + Tailwind 3.4 via PostCSS + Sanity Studio v4)  
**Branche principale :** `main`  
**Branche source :** `validation-finale-versions`

---

# 1. RÉSUMÉ DE L'OPÉRATION DE FUSION

La fusion de la branche `validation-finale-versions` vers `main` a été réalisée avec succès en application stricte des autorisations et procédures requises.

| Paramètre | Valeur / Identifiant | Statut |
| :--- | :--- | :--- |
| **Commit `main` avant fusion** | `1ed01c3ec76254f5ec1ac8b228e6cd8d4c555568` (`1ed01c3`) | Conforme |
| **Commit source validé** | `3bfc5592d1f6e726d21ff4b40063ee12fccf7a89` (`3bfc559`) | Conforme (succède à `2928208` avec correction Vite 8) |
| **Nouveau commit `main`** | `ec3addf45e78e22de11bbfdebb85f642451aa22a` (`ec3addf`) | Validé |
| **Stratégie de fusion** | Explicite avec historique préservé (`git merge --no-ff`) | Appliquée |
| **Conflits de fusion** | **0 conflit** (résolution automatique 'ort') | 100 % Propre |
| **Préservation des branches** | `validation-finale-versions`, `audit-technique-approfondi`, `modernisation-tech` conservées intactes | Conforme |
| **Budget engagé** | **0,00 €** (aucun compte distant, aucun service payant activé) | Conforme |

---

# 2. DIFFÉRENTIEL DES FICHIERS FUSIONNÉS

La fusion a intégré un total de 21 fichiers modifiés, créés ou réorganisés :

```text
 .env.example                        |    5 +-
 .nvmrc                              |    1 +
 astro.config.mjs                    |   13 +-
 docs/audit-final-avant-fusion.md    |  304 +++
 docs/decision-finale-versions.md    |  196 ++
 package-lock.json                   | 5746 ++++++++++++++---------------------
 package.json                        |    8 +-
 postcss.config.mjs                  |    6 +
 public/sitemap.xml                  |   94 -
 src/components/SEO.astro            |    7 +
 src/layouts/Layout.astro            |    4 +-
 src/lib/sanity/fallback.ts          |    6 +
 src/lib/sanity/queries.ts           |  102 +-
 src/pages/404.astro                 |    3 +-
 src/pages/recherche/index.astro     |    2 +-
 src/pages/sitemap.xml.ts            |  106 +
 studio/package-lock.json            | 5170 ++++++++++++++++---------------
 studio/package.json                 |   14 +-
 studio/schemas/documents/article.ts |   11 +-
 studio/schemas/documents/video.ts   |   11 +-
 tsconfig.json                       |    9 +-
 21 files changed, 5558 insertions(+), 6260 deletions(-)
```

### Principaux apports intégrés à `main` :
1. **Passage à Astro 7.4.11** avec moteur **Vite 8** (`vite@8.3.8`).
2. **Découplage de Tailwind CSS 3.4.19** via `postcss.config.mjs` et suppression définitive du paquet déprécié `@astrojs/tailwind`.
3. **Mise à niveau de Sanity Studio vers la v4.22.1** sous Node 24 et React 18.3.1, garantissant la pérennité sans conflit d'arbre (`ERESOLVE`).
4. **Verrouillage strict des requêtes GROQ** avec filtrage obligatoire `editorialStatus == "publie"` et validation culturelle/droits pour les articles et vidéos.
5. **Génération dynamique du sitemap XML** (`src/pages/sitemap.xml.ts`) avec exclusion stricte de `/404` et `/recherche`.
6. **Protection contre l'indexation non désirée** : balises `noindex` et exclusion Pagefind (`data-pagefind-ignore`) sur les pages d'erreur et de recherche.

---

# 3. RÉSULTATS DES TESTS POST-FUSION SUR `MAIN`

Tous les tests demandés ont été exécutés directement sur la branche `main` après la fusion.

| Commande exécutée | Code sortie | Résultat détaillé et observations |
| :--- | :---: | :--- |
| `node --version` | `0` | `v24.22.3` (Node.js 24 LTS actif via `.nvmrc`). |
| `npm ls --depth=0` | `0` | Dépendances racines saines : `astro@7.4.11`, `tailwindcss@3.4.19`, `autoprefixer@10.6.2`, `pagefind@1.6.0`, `@sanity/client@6.29.1`, `typescript@5.9.3`. Zéro avertissement. |
| `npx astro check` | `0` | 31 fichiers Astro analysés : **0 erreur, 0 avertissement, 0 conseil**. |
| `npm run build` | `0` | 19 pages statiques compilées en 8,78s (total 14,02s). Moteur Vite 8 opérationnel. |
| `pagefind --site dist` | `0` | 19 fichiers HTML traités, 1 langue (fr), **17 pages indexées**, 1158 mots indexés en 0,196s. |
| `python3 scratch/audit_links.py` | `0` | 19 fichiers HTML scannés, 37 routes internes recensées, **0 lien brisé**. |
| `cd studio && npm run type-check` | `0` | `tsc --noEmit` exécuté avec succès : 0 erreur de typage sur l'ensemble des schémas et de la structure de bureau. |
| `cd studio && npm run build` | `0` | `sanity build` terminé avec succès en 84,9s : bundle statique de production généré dans `studio/dist/`. |

---

# 4. VÉRIFICATIONS COMPLÉMENTAIRES DE CONFORMITÉ

1. **Pages HTML générées (19 pages) :**  
   Confirmé : 19 fichiers HTML présents dans `dist/` couvrant l'accueil, les 6 rubriques éditoriales, les 6 articles initiaux, la bibliothèque, les pages légales, le contact, la recherche et la 404.
2. **Exclusion de `/404` du sitemap XML :**  
   Vérifié par inspection de `dist/sitemap.xml` : la route `/404` est rigoureusement absente. Le sitemap contient exactement 18 URL canoniques valides.
3. **Protection et indexation Pagefind (17 pages) :**  
   Les pages `/404.html` et `/recherche/index.html` portent l'attribut `data-pagefind-ignore` et la directive `noindex`. Exactement 17 pages documentaires sont indexées dans `dist/pagefind`.
4. **Conservation de la charte graphique et des styles :**  
   Présence vérifiée des classes `.bg-kaolin`, `.font-heading`, `.text-ocre`, `.bg-ocre`, `#8C3B22` et `#234738` dans les fichiers CSS générés dans `dist/_astro/*.css` et appliqués dans le DOM.
5. **Absence absolue de secrets dans le dépôt :**  
   Recherche de motifs d'API tokens, clés privées ou secrets via `git grep` : 0 occurrence. Seul `.env.example` (contenant des valeurs fictives documentées) est présent.

---

# 5. VERSIONS FINALES DÉPLOYABLES SUR `MAIN`

| Rôle | Paquet / Outil | Version finale verrouillée |
| :--- | :--- | :--- |
| **Environnement d'exécution** | Node.js | `v24.22.3 LTS` (défini dans `.nvmrc`) |
| **Gestionnaire de paquets** | npm | `11.19.1` |
| **Framework Frontend** | Astro | `7.4.11` |
| **Moteur Bundler Vite** | Vite (interne Astro) | `8.3.8` |
| **Framework CSS** | Tailwind CSS | `3.4.19` |
| **Post-processeur CSS** | PostCSS + Autoprefixer | `8.5.6` + `10.6.2` |
| **Back-Office CMS** | Sanity Studio | `4.22.1` |
| **Moteur React Studio** | React / React DOM | `18.3.1` |
| **Moteur de recherche** | Pagefind Extended | `1.6.0` |
| **Client GROQ SSG** | @sanity/client | `6.29.1` |
| **Typage statique** | TypeScript | `5.9.3` (root) / `5.4.0` (studio) |

---

# 6. ANOMALIES RESTANTES ET RECOMMANDATIONS

- **Anomalies techniques bloquantes :** **0**. Aucun bogue ni régression détecté.
- **Avertissement non bloquant Sanity Studio :**  
  Lors du build de Sanity Studio, la CLI émet un avertissement informatif indiquant que le support de React 18 sera retiré dans une version majeure future (v5/v6). Comme documenté dans `decision-finale-versions.md`, cet avertissement est attendu et ne nuit en rien au fonctionnement ni à la compilation statique actuelle du Studio.
- **Limites respectées :**  
  Aucun projet distant Sanity n'a été créé, aucun compte Cloudflare n'a été ouvert, aucun webhook n'a été enregistré et aucun domaine n'a été réservé. Le budget engagé demeure strictement de **0 €**.

---

# 7. CONCLUSION

La branche principale `main` intègre désormais un socle technique de pointe, pérenne et sécurisé, combinant **Astro 7**, **Vite 8**, **Tailwind CSS 3.4 (PostCSS)** et **Sanity Studio v4**.

Toutes les exigences de l'autorisation de fusion ont été rigoureusement satisfaites. Le projet est prêt pour la planification et l'autorisation future de la Phase 2.
