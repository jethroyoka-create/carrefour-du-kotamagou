# 07 — Description des fonctionnalités et système de gestion éditoriale

## 1. Fonctionnalités du site public (Front-office)

### 1.1 MVP (Phase 1 — Indispensables au lancement)
1. **Page d'accueil éditoriale modulable :** mise en avant contrôlée par la rédaction (Un grand dossier à la Une, derniers reportages/actualités, accès thématique aux archives, bloc *« Comprendre les appellations du Koutammakou »*).
2. **Lecteur de fiches documentaires & articles longs :**
   - Sommaire ancré sur grands écrans, barre de progression de lecture discrète ;
   - Encadré *« Repères »* (auteur, date de publication, date de mise à jour, personne(s)-ressource(s), statut de validation, langue source) ;
   - Module **« Citer cette ressource »** (copie en un clic d'une référence bibliographique propre pour étudiants/chercheurs).
3. **Médiathèque vidéo optimisée bas débit :**
   - Intégration YouTube en mode confidentiel (`youtube-nocookie.com`) avec **chargement en façade** (image miniature WebP légère + bouton lecture : l'iframe YouTube ne se charge qu'au clic de l'utilisateur) ;
   - Chapitrage temporel cliquable (ex. `04:12 — Origines du clan`) et transcription / synthèse écrite juste en dessous ;
   - Filtres combinables : Thématique, Format (Interview, Monographie, Reportage, Archive terrain, Short), Langue (*Français*, *Ditammari*, *Sous-titré FR*), Intervenant.
4. **Glossaire *Ditammari* intégré :**
   - Page d'index dédiée (`/glossaire`) filtrable par thème et lettre ;
   - Mise en évidence discrète des termes du glossaire dans les articles avec définition au clic/clavier.
5. **Fiches *Clans*, *Territoires* et *Personnes-ressources* reliées :** navigation croisée automatique entre un intervenant, ses vidéos, son village et son dossier thématique.
6. **Recherche globale instantanée :** recherche tolérante aux fautes d'accent et variantes orthographiques (*Kotamagou / Koutammakou*, *Takienta / Tacienta*, *Otamari / Otammari*).

### 1.2 Évolutions (Phases 2 et 3)
- **Carte interactive du Koutammakou (Phase 2)** reliant les localités vérifiées du Bénin et du Togo à leurs fiches et archives.
- **Audio de prononciation *Ditammari* (Phase 2/3)** sur les entrées du glossaire.
- **Bascule bilingue FR / EN (Phase 3)** et espace d'écriture/sous-titres *Ditammari*.
- **Formulaire de contribution encadrée (Phase 3)** sans ouverture de comptes publics non modérés en Phase 1.

---

## 2. Système de gestion éditoriale (Back-office CMS)

L'administrateur principal n'est **pas développeur** : l'interface d'administration doit être entièrement en français, claire, guidée par des champs structurés et protégée contre les erreurs de publication.

### 2.1 Fonctionnalités d'administration requises

| Module Back-office | Besoin fonctionnel concret |
| :--- | :--- |
| **Tableau de bord éditorial** | Vue immédiate des contenus par statut (brouillons en cours, contenus bloqués en attente de validation culturelle, publications programmées, derniers contenus publiés). |
| **Éditeur structuré (Articles, Actualités, Dossiers)** | Éditeur riche par blocs (paragraphes, intertitres, citations attribuées, encadrés de contexte, galeries photo avec légende obligatoire, blocs vidéo, renvois vers le glossaire). |
| **Gestionnaire de Vidéos** | Saisie simplifiée via URL/ID YouTube (récupération assistée de la miniature), durée, langue parlée, présence de sous-titres, chapitrage (`mm:ss + titre`), transcription/résumé, liens vers intervenants/clans/lieux. |
| **Médiathèque Photo & Droits** | Upload glisser-déposer avec **champs obligatoires** : texte alternatif (accessibilité), crédit photographe, date/lieu de prise de vue, et **licence / autorisation d'usage** (interdiction de publier sans statut de droit renseigné). |
| **Référentiels relationnels** | Fiches gérées à part et réutilisables partout : *Catégories*, *Mots-clés*, *Clans*, *Territoires/Villages*, *Personnes-ressources*, *Auteurs*, *Entrées du Glossaire*. |
| **Programmation & Prévisualisation** | Prévisualisation privée en temps réel du rendu exact avant mise en ligne ; date/heure de publication programmable. |
| **Journal & Archivage** | Possibilité de retirer un contenu du flux actif tout en conservant son historique interne (`Archivé`), ou de tracer une mise à jour documentaire (*« Mis à jour le… »*). |
| **Statistiques de consultation** | Tableau de bord simple (pages les plus lues, recherches sans résultat pour repérer les attentes du public, clics sur dossiers) sans tracker invasif. |

### 2.2 Workflow éditorial à 7 statuts (modèle de gouvernance)

Conformément au besoin exprimé, la plateforme doit implémenter une machine à états stricte :

```text
[1. Brouillon]
      │  (Rédaction terminée par l'auteur / documentaliste)
      ▼
[2. En vérification]  ──► Contrôle factuel, orthographe française & Ditammari, droits médias
      │
      ▼
[3. En attente de validation] ──► Relecture par personne-ressource / comité culturel (si sensible ou historique)
      │
      ▼
[4. Validé]  ──► Prêt pour publication
      │
      ├──► [5. Programmé] (publication automatique à date/heure cible)
      │          │
      ▼          ▼
[6. Publié]  ──► Visible publiquement sur le site + indexé SEO
      │
      ▼
[7. Archivé] ──► Dépublié ou placé en archive interne (avec gestion propre d'une redirection ou notice si URL déjà indexée)
```

- **Règle de sécurité éditoriale :** Pour tout contenu coché *« Sujet sensible / rituel sacré / histoire contestée »*, le passage de `[1. Brouillon]` directement à `[6. Publié]` est **techniquement bloqué** dans le CMS tant qu'un rôle *Éditeur en chef / Validateur* n'a pas approuvé l'étape `[4. Validé]`.
- **Rôles initiaux simples (Phase 1) :** `Administrateur / Éditeur en chef` (responsable du média), `Rédacteur / Documentaliste`, et optionnellement un accès `Relecteur culturel` en lecture/commentaire sur les brouillons. **Aucun compte public grand public** en Phase 1.
