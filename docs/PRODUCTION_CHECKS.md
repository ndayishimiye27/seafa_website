# Contrôles et surveillance de production

Le domaine canonique est `https://www.saintespritfootballacademyalumni.com` ; le domaine racine redirige vers `www`. Aucun changement DNS n’est nécessaire pour les corrections du 15 octobre.

## Avant et après livraison

- `npm run check` : lint, types, contenu et tests unitaires. `vercel.json` impose cette commande avant `npm run build` : un échec bloque ce build Vercel.
- `npm test` lance les tests dans un processus enfant avec `NODE_ENV=test`, sans hériter des variables de livraison SEAFA/Resend/WhatsApp ni du stockage privé de l’hébergeur. Les tests configurent leurs propres mocks et dossiers temporaires. L’environnement de `next build` et les contrôles de sécurité de l’API en production restent inchangés.
- `.github/workflows/quality.yml` : mêmes contrôles, audit des dépendances de production, build et tests Chromium ciblés des formulaires, métadonnées, erreurs, galerie et redirections sur les pushes `main` et les pull requests.
- `npm run verify:production` : contrôle HTTP sans envoi de formulaire. Vérifie le domaine, les URL canoniques, JSON-LD, sitemap, politique robots, images sociales PNG 1200×630, une image d’album optimisée, redirections et 404.
- `BASE_URL` permet de cibler le serveur local ou l’URL Vercel de production ; les origines attendues dans les métadonnées restent celles du domaine public. Les images sont demandées au serveur testé, même si leur URL canonique pointe vers le domaine public.
- `EXPECT_INDEXABLE` vaut `false` par défaut, conformément à la politique existante. Si le lancement indexable est approuvé ultérieurement, configurer `SITE_INDEXABLE=true` en production et changer cette attente dans le workflow de surveillance. Les previews restent noindex.
- `EXPECT_COMMIT=<sha complet>` vérifie la balise `seafa:release`, alimentée par `VERCEL_GIT_COMMIT_SHA`. Cela distingue une nouvelle livraison d’une ancienne page encore disponible.

## Surveillance dans les capacités existantes

`.github/workflows/production.yml` exécute le contrôle HTTP et l’audit du lockfile toutes les six heures, manuellement, et lors d’un statut Vercel réussi associé à `main`. Ce projet publiait des statuts de commit Vercel ; le workflow utilise donc l’événement `status`, sans supposer l’existence d’événements `deployment_status`. Les contrôles échouent explicitement si le registre npm ou le site est inaccessible. GitHub peut retarder les tâches planifiées : il s’agit de contrôles périodiques, pas d’une garantie de disponibilité continue.

`src/instrumentation.ts` utilise le hook Next.js `onRequestError` pour écrire un événement JSON `seafa.server_error` dans les journaux serveur de l’hébergeur. Seuls le type de route et un digest filtré sont inclus ; aucune URL de requête, saisie, en-tête, message d’erreur ou stack n’est copié par ce hook. Le framework peut produire ses propres journaux indépendamment de ce hook. Le test unitaire vérifie le filtrage. Les erreurs purement clientes ne sont pas centralisées par ce mécanisme.

## Configuration externe et limites

Vérifier dans GitHub que les Actions sont autorisées et que les notifications d’échec sont activées pour les responsables. Le workflow ajouté ne modifie pas leurs préférences. Pour bloquer les merges sur ces contrôles, configurer la protection de branche ; le workflow seul ne constitue pas une règle de protection. L’état effectif des exécutions est consigné dans le rapport de livraison.

Vercel conserve les événements serveur selon le plan et les réglages du projet. L’accès aux journaux privés, leur rétention et les alertes doivent être vérifiés par un administrateur ; aucun événement d’erreur volontaire n’est déclenché en production. Aucun service externe de télémétrie, endpoint public de collecte ou dépendance supplémentaire n’a été ajouté. Les mesures réelles des Core Web Vitals et le suivi des erreurs clientes nécessitent encore l’activation/configuration d’un outil adapté (par exemple les capacités Vercel existantes), avec une revue de confidentialité. Ils ne sont pas déclarés opérationnels par ce changement.
