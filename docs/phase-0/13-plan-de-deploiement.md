# 13 — Plan de déploiement progressif

Ce plan découpe la construction de **Carrefour du Kotamagou** en 4 phases réalistes, sans précipitation technique, en priorisant la préparation des contenus et la fiabilité.

---

## Phase 0 — Préparation (En cours — 2 à 3 semaines restantes après validation)

- **Objectifs :** Finaliser l'inventaire multi-plateformes (récupérer les exports TikTok et Facebook), valider la charte éditoriale, arrêter le choix technologique (Scénario 1 ou 2), définir les tokens graphiques finaux et préparer **10 à 15 fiches/dossiers pilotes** issus des meilleures vidéos YouTube existantes.
- **Dépendances :** Validation des décisions listées dans le livrable `14` ; accès administrateur aux exports Facebook/TikTok/YouTube Studio ; constitution d'un premier cercle de 2 à 3 personnes-ressources pour la relecture culturelle et *Ditammari*.
- **Risques :** Démarrer le développement sans textes ni photographies prêtes (risque de « coquille vide » au lancement).
- **Coût potentiel :** **0 €** (ou ~10–15 €/an si réservation anticipée du nom de domaine).

---

## Phase 1 — MVP « Média & Bibliothèque Documentaire » (4 à 6 semaines)

- **Priorités fonctionnelles :**
  1. Design System accessible (`Papier Kaolin`, `Ocre de Latérite`, `Newsreader` + `Source Serif 4` + `Public Sans`) optimisé mobile-first.
  2. Back-office CMS en français avec le workflow à **7 statuts** (`Brouillon` → `Archivé`) et gestion obligatoire des droits médias.
  3. Espace Média (*À la une*, *Actualités*, *Reportages*, *Interviews*, *Portraits*, *Événements*).
  4. Espace Documentation initial : *Dossiers* (3 à 5 dossiers phares au lancement : *Tipaanti*, *Tibénti–Dikou*, *Koutchati*, *Takienta/Tata*, *Fonio*), *Archives audiovisuelles* (intégration YouTube en façade), *Personnes-ressources* (fiches des intervenants déjà publiés) et *À propos / Charte*.
  5. Recherche globale fonctionnelle et socle SEO complet (Schema.org `Article`, `VideoObject`, `Person`, `sitemap.xml`).
- **Dépendances :** Nom de domaine acheté, hébergement choisi configuré, 10–15 contenus validés culturellement prêts à être saisis, jeu de photographies propres autorisées.
- **Risques :** Surcharge du périmètre (vouloir coder la carte interactive ou le multi-langue dès la Phase 1 au détriment de la qualité éditoriale et mobile).
- **Coût potentiel d'infrastructure :** **0 € à ~10 €/mois** (hors coût éventuel de prestation de développement ou de production photo terrain).

---

## Phase 2 — Enrichissement encyclopédique & territorial (3 à 5 semaines)

- **Priorités fonctionnelles :**
  1. **Atlas des Clans et Territoires :** fiches structurées des 10+ clans déjà documentés (`Banacoba`, `Bèssoribè`, `Bamatimaba`, `Bapakouba`, `Ossonou`, etc.) et des localités documentées.
  2. **Carte interactive transfrontalière Bénin–Togo** reliant les villages documentés aux dossiers et vidéos.
  3. **Glossaire *Ditammari* approfondi** avec infobulles contextuelles dans les articles et capsules audio de prononciation.
  4. Enrichissement de la couverture côté **Togo** (préfecture de la Kéran) selon les partenariats et tournages terrain réels.
- **Dépendances :** Validation linguistique de la graphie *Ditammari* (avec membres de la CNLD ou linguistes partenaires) ; collecte de coordonnées/informations vérifiées des villages.
- **Risques :** Publier des limites géographiques ou généalogies claniques imprécises ; alourdir la carte sur les smartphones bas débit (choisir une carte vectorielle légère ou tuiles mises en cache).
- **Coût potentiel :** **0 € à ~15 €/mois** (selon croissance du trafic et stockage audio/photo sur Cloudflare R2).

---

## Phase 3 — Rayonnement international, bilinguisme & réseau encadré (Évolutif)

- **Priorités fonctionnelles :**
  1. **Transcriptions intégrales et sous-titrages enrichis** (*Ditammari ↔ Français*) avec recherche jusque dans les transcriptions.
  2. **Version anglaise sélective** des grands dossiers UNESCO, du glossaire et des fiches patrimoniales pour chercheurs et institutions internationales.
  3. **Espace de contributions encadrées** (correspondants locaux Bénin/Togo, chercheurs invités) toujours soumis au workflow de validation à 7 statuts.
  4. **Page Partenariats avancée**, kits presse/enseignants et lettre d'information périodique.
- **Dépendances :** Équipe éditoriale et de traduction consolidée ; modèle économique (subventions/partenariats) amorcé pour soutenir la charge de relecture et de traduction.
- **Risques :** Dérive des coûts de traduction ou ralentissement de la modération si l'ouverture aux contributions externes précède les moyens humains de relecture.
- **Coût potentiel :** **~15 € à 40 €/mois** d'infrastructure (si montée en charge, sauvegardes renforcées, outil d'emailing/analytics) + budget dédié de traduction/terrain selon financements obtenus.
