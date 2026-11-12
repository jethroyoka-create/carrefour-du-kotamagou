# 15 — Recommandation finale argumentée

## 1. Le diagnostic de fond

L'examen approfondi des sources publiques montre que **Carrefour du Kotamagou** part avec un actif rare que la plupart des nouveaux médias mettent des années à construire : **une légitimité de terrain réelle et un catalogue de 122 vidéos documentaires** (dont des entretiens de 20 à 47 minutes avec des historiens, archéologues, sociologues, chefs de culte, éducateurs et détenteurs de mémoire orale), soutenus par une communauté Facebook déjà active (**3 775 abonnés**).

Mais aujourd'hui, ce capital patrimonial souffre de trois vulnérabilités majeures :
1. **L'invisibilité documentaire et SEO :** les descriptions YouTube récentes sont vides, le savoir est enfermé dans la vidéo/audio (souvent en *Ditammari* non transcrit) et reste donc introuvable sur Google comme dans les recherches académiques.
2. **La fragmentation des formats :** aucun point central ne relie un village, un clan, une personne-ressource, un terme *Ditammari* et les reportages vidéo correspondants.
3. **Le risque de vulnérabilité culturelle :** à mesure que la plateforme gagnera en visibilité institutionnelle et internationale, l'absence de protocole écrit sur les appellations (*Koutammakou / Kotamagou / Batammariba / Otamari / Somba / Tamberma / Takienta / Tata*) et sur la validation des rites sensibles exposerait le projet à la critique.

---

## 2. La recommandation stratégique (Ce qu'il faut construire en priorité)

### Sur le plan éditorial : « Moins de volume, plus de profondeur indexable »
Ne tentez pas d'importer les 122 vidéos d'un coup sous forme de coquilles vides. **L'enjeu du lancement (Phase 1) est qualitatif :**
- Sélectionner **10 à 15 contenus phares** déjà tournés (par exemple : *Les origines/migrations* avec Pr N'Dah & Noël Koussey ; *Tipaanti* ; *De Tibénti à Dikou* ; *Koutchati* ; *L'enfant Otammari* avec Dr Kouagou ; *Valorisation de tacienta/tata* ; *Le Fonio* avec Pr Armand Natta ; *Alphabétisation Ditammari*) ;
- En faire de **véritables fiches et dossiers écrits sourcés**, relus linguistiquement et validés culturellement, accompagnés du lecteur vidéo optimisé et d'un premier **Glossaire Ditammari de 30 à 50 termes clés** ;
- Produire en parallèle un **shooting photographique documentaire propre** sur le terrain (Boukombé, Koussocoingou, Takienta, portraits consentis), car la direction artistique *« Journalisme de terre et de mémoire »* repose sur la qualité et l'authenticité des images.

### Sur le plan technique : « Sobriété, souveraineté des données et performance mobile »
Pour concilier **budget minimal**, **expérience irréprochable sur smartphones Android modestes** et **administration facile pour un non-développeur** :
- **Recommandation technique n°1 (si budget ~5–10 €/mois possible pour un petit VPS) :** **Astro (ou Next.js) + Directus + PostgreSQL + Cloudflare R2**, ou **Next.js + Payload CMS v3 + PostgreSQL + Cloudflare R2** (un seul socle open-source sans limite d'utilisateurs ni dépendance SaaS payante).
  - *Si préférence absolue pour 0 €/mois sans serveur à gérer au jour 1 :* **Astro + Sanity (plan gratuit) + Cloudflare Pages**, en sachant qu'une migration ultérieure sera nécessaire si l'équipe éditoriale dépasse les seuils gratuits de Sanity.
- **Règle absolue sur la vidéo :** conserver l'hébergement vidéo sur YouTube et implémenter un **lecteur en façade léger (`youtube-nocookie.com`)** qui ne charge la vidéo qu'au clic de l'utilisateur — économisant ainsi data et batterie aux visiteurs du Bénin et du Togo.

### Sur le plan visuel : « L'autorité éditoriale sans artifice »
La combinaison **Papier Kaolin (`#FAF8F4`) + Charbon (`#161412`) + Ocre de Latérite (`#8C3B22`) + Vert Atakora (`#234738`)**, portée par les polices **`Newsreader`** (titres), **`Source Serif 4`** (lecture longue) et **`Public Sans`** (interface), ancre visuellement Carrefour du Kotamagou au niveau des grands médias documentaires internationaux tout en honorant la matière et la sobriété du Koutammakou.

---

## 3. Condition de passage à la Phase 1

Aucune ligne de code ne doit être écrite tant que :
1. Les **10 décisions du livrable `14`** n'ont pas été arbitrées par vous ;
2. Le **nom de domaine** et le **scénario technique (Scénario 1 vs Scénario 2)** n'ont pas été validés ;
3. Une première **sélection de contenus et photographies vérifiés** n'est pas identifiée pour alimenter le MVP dès sa mise en ligne.
