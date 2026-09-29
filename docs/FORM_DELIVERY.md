# Réception des formulaires SEAFA

État vérifié le 29 septembre 2026. Aucun destinataire réel, jeton ou compte de service n’est configuré par cette modification. Aucun message réel n’a été envoyé et aucun déploiement n’a été effectué.

## Les trois formulaires

| Formulaire           | Page           | Endpoint                 | Contenu transmis                                                                                                                         |
| -------------------- | -------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Proposition de match | /request-match | POST /api/match-requests | Organisation, interlocuteur, coordonnées, date/heure au Burundi (UTC+02:00), lieu, format, message et consentement                       |
| Contact              | /contact       | POST /api/contact        | Nom, coordonnées, type de courrier, organisation, objet, message et consentement                                                         |
| Adhésion             | /join          | POST /api/join           | Identité déclarée, coordonnées, catégorie, résidence, profil et expérience, motivations, acceptation du code de conduite et consentement |

Les libellés et options de l’e-mail proviennent directement de src/content/form-fields.ts. Tous les champs sont inclus, y compris les champs facultatifs avec « Non renseigné ». Les valeurs des listes et des consentements sont traduites en français. Aucune admission, aucun compte ni aucun match n’est automatiquement confirmé.

## Fonctionnement conservé

1. Validation navigateur et serveur : champs autorisés, consentements, limites de longueur, piège à robots, origine et JSON de 16 Ko maximum.
2. Si SEAFA_SYSTEM_INTAKE_URL et SEAFA_SYSTEM_INTAKE_SECRET sont valides, SEAFA_SYSTEM reste prioritaire. Le site exige un reçu correspondant à la clé UUID : success, id, reference, token, receivedAt.
3. Une panne du système ne provoque pas de bascule silencieuse. Le formulaire conserve ses données et réutilise sa clé.
4. Sans système configuré, l’e-mail peut devenir le mode principal si sa configuration complète et le stockage privé sont disponibles.
5. Sans réception configurée, les champs restent éditables, avec bouton désactivé et explication visible. Le stockage local seul reste réservé au développement.

Une réception SEAFA_SYSTEM réussie reste réussie même si une notification optionnelle échoue. Le reçu et son code de suivi sont conservés. Les échecs de notification sont signalés côté serveur et, lorsque la file a pu être écrite, restent dans le journal privé de livraison.

## E-mail complet via Resend

Configuration serveur uniquement :

- SEAFA_EMAIL_DELIVERY_ENABLED=true
- SEAFA_TEAM_EMAIL : adresse officielle qui doit recevoir les trois formulaires.
- SEAFA_EMAIL_FROM : adresse d’expédition seule, appartenant à un domaine validé chez Resend.
- RESEND_API_KEY : clé autorisée à envoyer depuis ce domaine.
- SUBMISSIONS_DIR : chemin absolu privé, persistant et accessible en écriture, hors de public.

Le demandeur figure en reply_to, jamais comme expéditeur technique. Sans SEAFA_SYSTEM, la réponse positive nécessite un identifiant d’e-mail renvoyé par Resend. Un simple HTTP 200 sans reçu ne suffit pas. Le texte précise que l’envoi est accepté par le service, sans prétendre que SEAFA l’a déjà lu ou que le message est arrivé dans la boîte de réception. Avec SEAFA_SYSTEM, cet e-mail constitue une copie complète après enregistrement.

## Notification WhatsApp via Meta Cloud API

Configuration serveur uniquement :

- SEAFA_WHATSAPP_NOTIFICATIONS_ENABLED=true
- SEAFA_TEAM_WHATSAPP : numéro destinataire au format international, avec + et indicatif pays, sans espaces.
- WHATSAPP_PHONE_NUMBER_ID : identifiant du numéro **expéditeur** WhatsApp Business enregistré chez Meta ; ce n’est pas le numéro destinataire.
- WHATSAPP_ACCESS_TOKEN : jeton serveur disposant des droits d’envoi nécessaires.
- WHATSAPP_API_VERSION : version Graph API prise en charge par le compte, au format vNN.0.
- WHATSAPP_TEMPLATE_NAME et WHATSAPP_TEMPLATE_LANGUAGE : nom et langue exacts du modèle approuvé.
- SUBMISSIONS_DIR : même stockage privé.

Le modèle doit avoir exactement deux paramètres texte dans le corps, dans cet ordre : type de demande puis référence. Exemple à soumettre à Meta : « SEAFA : nouvelle demande de type {{1}}, référence {{2}}. Consultez la boîte e-mail ou le système du Secrétariat pour la traiter. »

La notification ne contient ni le texte du formulaire, ni les coordonnées du demandeur, ni son code confidentiel. Elle est envoyée après acceptation par SEAFA_SYSTEM ou Resend. **WhatsApp seul n’ouvre pas la réception des formulaires** : un numéro ou un lien wa.me ne constitue pas un service automatique de réception des dossiers complets.

Confirmer que le destinataire accepte ces notifications. Un identifiant wamid. confirme l’acceptation par Meta, pas la livraison ou la lecture. Le suivi des statuts finaux reste à configurer chez les prestataires avant mise en service.

## Reprises et exploitation

Les pages de formulaire sont prérendues : leur état activé/désactivé est calculé à la compilation. Fournir la configuration au build **et** au serveur/worker, puis reconstruire le site après activation ou désactivation d’un canal principal. Les secrets restent côté serveur et ne sont pas transmis aux composants client. Une modification de l’environnement du serveur seul ne met pas à jour les boutons déjà générés.

Les dossiers sont écrits dans SUBMISSIONS_DIR/delivery avec permissions restrictives et synchronisation disque avant appel du prestataire. Ils contiennent le texte de l’e-mail et les états, mais aucun jeton de service ni code confidentiel SEAFA_SYSTEM.

- Un verrou par UUID évite les envois concurrents. Même clé avec contenu différent : 409.
- Les nouvelles demandes directes sont limitées à 5/10 minutes par identité de proxy de confiance, ou 30/10 minutes pour le compartiment partagé. SEAFA_SYSTEM garde ses contrôles.
- Les tentatives Resend réutilisent exactement le même contenu, les mêmes destinataires et la même clé. Elles s’arrêtent après 23 heures depuis le premier essai, avant expiration de l’idempotence.
- Un WhatsApp incertain après délai dépassé ou interruption passe à unknown. Il n’est jamais renvoyé automatiquement sans rapprochement avec le journal Meta.
- Les refus WhatsApp explicites restent à reprendre après correction.
- Après un crash, un fichier .lock peut rester : l’opérateur doit vérifier qu’aucun envoi n’est en cours et rapprocher le journal prestataire avant de libérer le verrou.

Préparer une tâche de l’hébergeur toutes les minutes exécutant **npm run deliveries:retry** avec le même environnement protégé. Ce programme envoie réellement les éléments en attente : ne l’activer qu’après configuration et validation. Aucune route HTTP publique. La sortie contient seulement checked, pending, review, errors ; un code non nul requiert une vérification. Les états review, unknown et les verrous résiduels nécessitent une intervention.

Un volume persistant doit être partagé par le serveur et le worker, avec opérations de fichiers atomiques. Un disque éphémère n’est pas compatible sans remplacement par une file/base durable. Fixer les ACL ou permissions, sauvegardes, conservation et responsable des demandes. Prévoir un délai serveur supérieur aux appels cumulés (jusqu’à 35 secondes). Surveiller les rejets, rebonds e-mail et statuts Meta.

## Informations encore nécessaires

1. Adresse e-mail destinataire officielle de SEAFA.
2. Adresse d’expédition et domaine vérifié Resend, puis clé API via l’environnement protégé.
3. Numéro WhatsApp destinataire et accord de réception.
4. Compte WhatsApp Business/Meta prêt à envoyer, identifiant expéditeur, jeton serveur, version API, modèle approuvé et langue.
5. Hébergement et chemin du volume privé ; planification du worker et responsable des reprises.
6. Si SEAFA_SYSTEM est utilisé : URL HTTPS réelle de /api/public/submissions, secret partagé d’au moins 32 caractères et vérification d’un reçu réel. La connexion membre nécessite séparément SEAFA_SYSTEM_LOGIN_URL.
7. Domaine public SITE_URL, contact de confidentialité et durée de conservation.

Les tests utilisent exclusivement des destinataires fictifs et des réponses simulées. Aucun test ne prouve une livraison réelle sans ces configurations.

## Références techniques

- [Resend : envoi d’e-mail](https://resend.com/docs/api-reference/emails/send-email)
- [Resend : idempotence pendant 24 heures](https://resend.com/docs/dashboard/emails/idempotency-keys)
- [Meta : messages modèles WhatsApp](https://whatsapp.github.io/WhatsApp-Nodejs-SDK/api-reference/messages/template/)
