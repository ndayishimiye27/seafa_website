# Livraison SEAFA — 9 septembre 2026

## Résultat

Site français implémenté et vérifié localement : accueil éditorial, histoire 2013–2019, identité, communauté, diaspora, quatre témoignages, récompenses documentées, actualités, galerie et formulaires. La charte bleu nuit, blanc et or est responsive ; le repère de marque et son emplacement sont conservés. Aucun fichier de logo officiel ni photographie n’était présent dans le projet.

Les composants mal placés, les anciens articles non étayés, les imports erronés et les API incohérentes ont été corrigés. Les albums et modèles partagés sont conservés. Les formulaires utilisent une validation commune et n’annoncent une réussite qu’après enregistrement privé effectif. Les pages manquantes renvoient 404 ; sitemap, métadonnées, liens canoniques et redirections suivent les contenus publiés.

## Sources et corrections

Les 29 pages du livret fourni ont été lues et inspectées. [Sources détaillées](EDITORIAL_SOURCES.md) : identité et mission p. 1–3 ; histoire p. 5–13 ; Alain p. 14–15 ; Idan p. 20–21 ; Bados p. 23–24 ; Darcy p. 5 et 26–27 ; diaspora p. 22–23 ; Jack 2015 p. 8–9 et 18–20 ; Malolo 2018 p. 12. Les textes sont des synthèses, sans citations fabriquées. Darcy dispose d’une notice de souvenirs, le livret ne contenant pas d’entretien complet.

Corrections prioritaires du propriétaire : Tugire Iteka ; fondation en 2013 sans jour ni mois ; SEFA en 2014 et SEAFA en 2016 ; adhésion de Dieudonné Buyoya en 2016 au lieu de 2006 ; 200+ membres incluant 50 membres de la diaspora et 30 sages ; sages définis par le mariage et non par l’âge.

## Fichiers et médias

[Inventaire des fichiers créés, modifiés et supprimés](FILE_INVENTORY.md). La comparaison utilise les empreintes de la sauvegarde initiale, aucun dépôt Git n’ayant été fourni. Sauvegarde : `tmp/audit/before.zip`.

[Guide des médias](../public/media/README.md) : `public/media/hero` pour l’accueil ; `history` pour les archives ; `interviews` pour les témoins ; `awards` pour les lauréats et remises ; `gallery` pour les albums ; `community`, `diaspora`, `leadership`, `team`, `activities`, `events`, `challenges` et `news` pour les catégories correspondantes. Enregistrer chaque image une seule fois dans `src/data/media.ts`, puis utiliser son identifiant. Les extractions photographiques du livret restent manuelles, à effectuer par le propriétaire.

## Configuration et lancement

`SITE_URL` : domaine confirmé. `SITE_INDEXABLE=true` : seulement après validation du lancement. `SUBMISSIONS_DIR` : chemin absolu privé, hors de `public`, sur volume persistant ; sans ce réglage, les formulaires restent fermés. `TRUSTED_IP_HEADER` est facultatif et réservé à un proxy qui écrase cet en-tête. `NEXT_PUBLIC_SITE_URL` reste accepté pour compatibilité. Aucun envoi d’e-mail automatique n’est configuré.

Le [README](../README.md) décrit les commandes, l’ajout d’historique 2021–2026, de témoignages, prix, albums et données diaspora, ainsi que le déploiement.

## Vérification

- Compilation de production et TypeScript : réussis, 30 sorties générées.
- ESLint : réussi, sans avertissement.
- Tests unitaires et API : 5 réussis, dont persistance, validation, refus des entrées incorrectes et limites concurrentes.
- Validation des contenus : réussie, zéro avertissement ; contrôle des références et des fichiers médias locaux.
- Parcours navigateur : 12 réussis, comprenant 21 pages aux largeurs 320, 375, 768, 1024 et 1440 px, trois formulaires, menus clavier, chronologie, métadonnées, liens et mouvement réduit.
- Lightbox réelle testée séparément : test réussi pour les flèches, le bouclage des images, le maintien du focus, sa restauration après Échap et le balayage horizontal. Les deux images géométriques de test restent dans la fixture, sans ajout au site public. Sur cet environnement Windows, le bundler de cette fixture a nécessité une exécution hors sandbox pour lire les dépendances locales.
- Axe : aucune violation des règles WCAG A/AA testées sur les 21 pages. Ce résultat ne constitue pas une certification exhaustive d’accessibilité.
- Routes : 24 pages publiées en HTTP 200 et sept adresses absentes en HTTP 404.
- Limite connue de Next.js 16.3.4 : les slugs dynamiques absents déclenchent un message serveur `Internal: NoFallbackError` avec `dynamicParams=false`. Les réponses HTTP 404 et l’affichage fonctionnent ; les tests de routes réussissent. Ce comportement était déjà documenté dans la version initiale.
- Aucun débordement horizontal, image cassée, erreur console ou erreur d’hydratation détecté dans les parcours testés. Captures desktop et mobile inspectées dans `tmp/audit`.

## Éléments restant à fournir

[Liste complète](CONTENT_PENDING.md) : archives 2020–2026, photographies et portraits autorisés, citations exactes approuvées, pays et profils diaspora, direction et effectif actuels, nouvelles vérifiées, coordonnées, domaine et organisation du traitement des demandes. Le conflit de dates concernant les prix d’Alain et Yannick reste à clarifier ; ces prix ne sont pas publiés.

**Statut : version locale prête à la revue éditoriale et à l’intégration des médias.** La mise en ligne publique reste conditionnée aux coordonnées et au domaine définitifs, à la configuration du stockage privé et aux vérifications de contenu listées. Aucun déploiement n’a été effectué.
