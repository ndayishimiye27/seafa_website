# SEAFA — Saint Esprit Alumni Football Academy

Site français de SEAFA, communauté issue des anciens du Lycée du Saint Esprit, unie depuis 2013 par le football, la fraternité et le service. **Tugire Iteka.**

Next.js 16.3.4 (App Router), React 19.2.8, TypeScript, Tailwind CSS. Routes techniques conservées. Les contenus vivent dans les registres typés existants ; aucun CMS, authentification ou portail privé n’est intégré.

## Développement et vérification

Node.js 20.9 minimum ; Node.js 24 convient. Sous PowerShell, utiliser `npm.cmd` si nécessaire.

```sh
npm ci
npm run dev
npm run format:check
npm run lint
npm run typecheck
npm test
npm run verify:content
npm run build
npm start
npm run verify:routes
```

Tests navigateur : `npx playwright install chromium`, puis `npm run test:browser`. Le script construit et démarre la version de production sur le port 3100 ; aucun service de réception ni secret d’envoi n’est nécessaire. Ne jamais utiliser les données réelles pour les tests. `BASE_URL` permet de vérifier un serveur existant. Les tests couvrent les liens, les métadonnées, les formulaires, le clavier, axe et les dimensions mobiles et desktop. `npm run format` applique le formatage.

## Formulaires publics

Les demandes de contact, propositions de match et candidatures préparent un message français complet après validation dans le navigateur. Le visiteur choisit « Envoyer par WhatsApp » ou « Envoyer par e-mail », puis confirme lui-même l’envoi dans son application. Les liens conservent la destination configurée et tous les champs encodés ; aucun nom, numéro ou e-mail du destinataire n’est affiché dans les formulaires. Une ouverture d’application ne vaut pas confirmation d’envoi. Un brouillon complet et une option de copie restent disponibles si l’application ne s’ouvre pas ou si le lien est trop long.

Ces parcours n’appellent pas les routes API, n’enregistrent pas les réponses sur le serveur et ne dépendent pas d’un service de réception. Les anciennes API sécurisées sont conservées pour compatibilité ; la configuration de stockage et de livraison ci-dessous concerne uniquement ces API, pas les formulaires publics.

## Configuration

- `SITE_URL` : URL canonique confirmée. Repli local : `http://localhost:3000`.
- `NEXT_PUBLIC_SITE_URL` : ancien nom encore accepté si `SITE_URL` est absent.
- `SITE_INDEXABLE=true` : autorise l’indexation après validation du lancement. Sinon, noindex et robots bloqué.
- `SUBMISSIONS_DIR` : configuration facultative des anciennes API ; chemin **absolu**, privé, hors de `public`, sur un volume **persistant**. Les formulaires publics et la notice de confidentialité sont statiques et restent disponibles sans ce volume.
- `TRUSTED_IP_HEADER` : facultatif ; nom d’un en-tête réseau que le proxy de confiance **écrase**. Ne pas le configurer si les visiteurs peuvent le falsifier. Sans cet en-tête, limite partagée de 30 demandes/10 minutes ; sinon 5 par identifiant/10 minutes.

Les demandes validées sont enregistrées dans un fichier JSON unique avec synchronisation disque avant réponse HTTP 201. Pas d’e-mail automatique. Les erreurs de stockage retournent 503 ; aucun renseignement personnel n’est journalisé par l’application. JSON seulement, limite réelle de 16 Kio, champs autorisés, validation partagée client/serveur, consentements, piège antispam et compteurs atomiques sur le volume. La limite est partagée entre processus utilisant le **même volume**, pas entre volumes indépendants.

Les dossiers et fichiers privés de l’API historique sont créés avec des permissions restrictives sur les systèmes qui les prennent en charge. Configurer les ACL Windows ou permissions de l’hébergement si cette API est utilisée. Le responsable doit traiter les droits des personnes et définir la conservation des dossiers. Ne pas utiliser un disque éphémère pour conserver ces dossiers ; les formulaires publics n’utilisent pas ce stockage.

## Gestion du contenu

- Réglages et médias de l’accueil : `src/data/site-settings.ts`.
- Identité, mission, vision et valeurs : `src/content/identity.ts`.
- Histoire : `src/data/history.ts`. Ajouter une étape 2021–2026 avec identifiant, slug, année précise, récit, source et `verified: true`, puis `publicationStatus: "published"`. Ne pas créer de faux événements pour remplir les années. `mediaIds` et `albumId` sont facultatifs.
- Témoignages : `src/data/interviews.ts`. Ajouter nom vérifié, relation, résumé, paragraphes, source et statut. `kind: "memory"` distingue les souvenirs d’un entretien. Les portraits, photographies d’activité, archives et albums sont reliés par identifiant.
- Récompenses : `src/data/awards/index.ts`. Ajouter catégorie, année, lauréat, description et source. `actionMediaId` est prioritaire sur les cartes ; `presentationMediaId` s’affiche sur la page détaillée. Ajouter `recipientMediaId`, `albumId` et `relatedAwardIds` si disponibles.
- Albums : `src/data/albums/index.ts`, médias partagés dans `src/data/media.ts`. Ajouter couverture, images ordonnées, légendes, catégorie, relations et statut. Les mêmes albums peuvent accompagner activités, événements, récompenses, interviews et histoire.
- Diaspora : `src/data/diaspora.ts`, profils et initiatives avec statut. Aucun pays actuel n’est inventé ; seuls les profils publiés alimentent les pays affichés.
- Actualités : `src/data/news.ts` et le modèle unique `NewsArticle`. Ajouter titre, slug, résumé, catégorie, auteur, date, sections, média de couverture, album et SEO. Seuls les articles publiés avec une date apparaissent.
- Membres actuels : registres `src/data/placeholders.ts`, volontairement vides tant que les profils ne sont pas confirmés.
- Challenges : conserver les séries et relations existantes dans `src/data/activities/challenges.ts`. Deux capitaines, au plus trois matches, deux victoires nécessaires ; résultats et capitaines doivent être vérifiés.

Les routes dynamiques de brouillons renvoient 404. Le sitemap utilise les registres publiés. Les anciens chemins `/squad`, `/leadership`, `/privacy-policy` et `/match-request` redirigent durablement vers les pages canoniques.

## Médias et lancement

[Guide des photographies](public/media/README.md), [sources éditoriales](docs/EDITORIAL_SOURCES.md), [contenus en attente](docs/CONTENT_PENDING.md).

Les photos ne sont pas extraites automatiquement du livret. Aucun portrait généré, faux témoignage ou logo de remplacement. Le repère de marque présent dans le projet reste à sa place ; aucun fichier de logo n’était fourni.

Déploiement : installer avec le lockfile, conserver la configuration de domaine existante, exécuter les contrôles puis `npm run build`. Vercel utilise la configuration du projet et `vercel.json` ; pour un serveur autonome, utiliser `npm start` derrière HTTPS. Un volume privé concerne uniquement les anciennes API de stockage, pas les trois parcours publics WhatsApp/e-mail. Vérifier le domaine, les médias et les rôles actuels avant d’activer `SITE_INDEXABLE`. Un redéploiement est nécessaire après modification des registres statiques ou métadonnées.

Les anciens documents de fondation décrivent parfois une phase antérieure. Ce README, les sources éditoriales et la liste des contenus en attente décrivent la version actuelle. Aucun dépôt Git n’était présent dans le dossier fourni ; une sauvegarde initiale a été conservée dans `tmp/audit/before.zip`.
