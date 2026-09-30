# Formulaires publics — revue du 30 septembre 2026

## Changement de comportement

Les candidatures `/join` et propositions `/request-match` sont utilisables sans le système privé. Après validation, le visiteur choisit WhatsApp **+257 79 690 359** ou l’e-mail **jambojeanjimmy52@gmail.com**, puis continue dans son application. Tous les champs pertinents, les coordonnées et le type de demande figurent dans le brouillon français ; l’e-mail a un objet fixe approprié.

Le site ne transmet pas simultanément ces demandes à ses API et ne conserve pas de copie serveur. Il ne confirme jamais un envoi ou une réception : le visiteur doit appuyer sur **Envoyer** dans son application. Les champs restent remplis. Toute modification invalide le précédent aperçu pour éviter d’envoyer un brouillon périmé.

Les URL sont encodées. Les fenêtres bloquées disposent d’un lien de reprise. Les messages trop longs ne sont pas tronqués : aperçu complet, copie automatique ou sélection manuelle et coordonnées explicites sont disponibles. Il n’est pas possible de détecter de façon fiable l’installation d’une application e-mail ni sa livraison. Le site ne journalise pas les réponses et ne les transmet pas à un outil d’analyse.

Le formulaire `/contact` et son intake configuré sont conservés. Les API existantes gardent leurs validations, leur limitation et leur idempotence, mais les deux nouveaux parcours n’y font aucun POST.

## Postes de jeu

Le terrain utilise les 21 codes distincts fournis : GK, SW, LB, LWB, LCB, CB, RCB, RB, RWB, LM, LCM, CDM, CM, RCM, RM, CAM, LW, RW, SS, CF, ST. ST n’apparaît qu’une fois. Les cases natives sont accessibles au clavier et nommées en français. Le visiteur peut sélectionner de 1 à 5 postes, décocher, et basculer vers une liste lisible. La sixième sélection est refusée avec une explication.

`positions: string[]` est conservé intégralement par la validation, les types et les générateurs de messages. Pour les anciens appels API, preferredPosition/secondaryPosition sont convertis lorsque positions est absent. Un mélange des deux formats est rejeté pour éviter une perte silencieuse. Tout futur intake privé devra accepter le tableau complet avant réactivation pour ces candidatures.

Les deux références graphiques nommées dans la demande ne sont pas présentes dans le dépôt. La liste et le placement conventionnel des postes ont servi de référence, sans inventer une copie exacte d’une image non consultée.

## Fichiers

- `src/components/forms/composer-form.tsx` : nouveau parcours de brouillon.
- `src/components/forms/position-selector.tsx` : terrain et liste accessibles.
- `src/components/forms/public-form.tsx` : choix du parcours ; Contact reste sur l’intake.
- `src/components/forms/membership-application-form.tsx`, `match-request-form.tsx` : indépendance de la configuration serveur.
- `src/content/positions.ts`, `src/content/form-fields.ts` : codes, types et validation partagée.
- `src/lib/composer.ts` : coordonnées, message complet et URL.
- `src/lib/submissions.ts`, `system-intake.ts`, `team-delivery.ts` : validation et conservation du tableau complet pour les appels API.
- `src/styles/globals.css` : terrain responsive et états de sélection/focus.
- `src/app/join/page.tsx`, `src/app/privacy/page.tsx` : explications exactes du nouveau parcours.
- `tests/composer.test.ts`, `tests/browser/composer.spec.ts` : nouveaux tests ciblés.
- `tests/finishing.test.ts`, `tests/team-delivery.test.ts`, `tests/browser/finishing.spec.ts`, `tests/browser/site.spec.ts` : assertions adaptées au parcours désormais manuel.
- `docs/FORM_DELIVERY.md`, `docs/SYSTEM_INTEGRATION.md`, ce rapport : fonctionnement et limites.

## Publication

Le dépôt était propre au début, sur main au commit c8b861f. origin pointe vers TechVLabs/seafa_website ; main suit personal/main, ndayishimiye27/seafa_website. Les deux remotes sont accessibles et ont initialement le même commit. Le choix de la destination de production a été demandé, sans supposer lequel des deux doit être publié.

La CLI Vercel a été vérifiée ; aucun projet n’est lié dans ce dépôt. L’accès au compte/équipe/projet, le nom exact du domaine SEAFA et l’accès à son fournisseur DNS doivent être confirmés avant publication et connexion du domaine. Aucun nom de domaine ni enregistrement DNS n’est inventé. Aucun message réel de test n’est envoyé aux destinataires.

## Vérification

Validation de contenu : 0 avertissement. Les 22 tests unitaires passent, ainsi que lint, TypeScript, Prettier et la compilation de production (114 pages générées). Les 116 vérifications de routes passent. Le diff Git ne contient aucune erreur d’espacement.

Les 13 scénarios navigateur des nouveaux formulaires passent : les deux canaux et les deux formulaires à 375/1440 px, clavier/liste/limite/contraste à 320/768/1440 px, ouverture WhatsApp et copie manuelle d’un message long. Des erreurs initiales dans les sélecteurs et l’encodage des fixtures de test ont été corrigées. Les captures sont conservées sous tmp/composer.

La dernière suite complète comporte **74 réussites et 1 échec intermittent préexistant** : le test Claver à 375 px dépasse son attente de navigation de 5 secondes. Ce même comportement avait été observé lors de la revue précédente ; les liens et le portrait n’ont pas été modifiés ici. La reprise isolée des deux scénarios Claver passe **2/2**, sans modification de ce test ni de l’application. Aucun échec lié aux nouveaux formulaires ne subsiste. Les vérifications des pages existantes, médias, navigation, accessibilité et liens passent. Les journaux sont tmp/composer/verified-browser.log, brand-recheck.log et routes.log.

État de livraison : branche locale **codex/public-form-composers**, prête pour publication après confirmation du remote de production. Aucun push n’a été effectué tant que le choix entre origin et personal reste indéterminé. Aucune URL publique ni aucun domaine n’a donc pu être vérifié pour cette version.

Les tests de composer interceptent les ouvertures ou inspectent les URL : ils ne prouvent pas une réception effective par WhatsApp ou e-mail. La CLI Vercel a signalé une expiration de worker puis un état déconnecté. Aucune publication ni connexion DNS n’a été faite ; le contrôle des formulaires sur le site public reste à effectuer après accès au bon projet et déploiement.

Références techniques : [liens WhatsApp préremplis](https://faq.whatsapp.com/425247423114725/), [déploiement Vercel par CLI](https://vercel.com/docs/projects/deploy-from-cli).
