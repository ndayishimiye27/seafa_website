# Intégration au système SEAFA

Le contrat effectivement implémenté remplace les anciennes notes de préparation. Voir [FORM_DELIVERY.md](FORM_DELIVERY.md) pour l’e-mail, WhatsApp, le stockage et les reprises.

## Réception principale existante

- SEAFA_SYSTEM_INTAKE_URL : URL HTTPS dont le chemin est exactement /api/public/submissions, sans identifiants, paramètres ni fragment.
- SEAFA_SYSTEM_INTAKE_SECRET : secret serveur partagé d’au moins 32 caractères.
- Appel serveur POST avec Authorization: Bearer, Idempotency-Key UUID stable, X-Intake-Client pseudonymisé et JSON { kind, data }.
- kind vaut join, contact ou match-requests. Pour un match, proposedDateTime est transmis avec le décalage +02:00 du Burundi.
- Réponse acceptée seulement si HTTP 2xx et { success: true, id, reference, token, receivedAt } : id identique à l’UUID, référence SEAFA-APP-YYYY-NNNNNNNN ou SEAFA-COR-YYYY-NNNNNNNN, jeton hexadécimal de 64 caractères et date de réception.
- Le suivi est dérivé du même hôte : /application-access. Le jeton de suivi n’est jamais envoyé par e-mail ni WhatsApp.
- Les erreurs 400, 409, 422 et 429 restent des erreurs. Une réponse incomplète, un délai dépassé ou une erreur réseau ne devient jamais une réussite.
- Les notifications sont facultatives, exécutées après réception confirmée et ne remplacent pas le reçu du système.

Le système garde la responsabilité de la décision d’adhésion, des contrôles de paiement et de l’activation. Le site ne collecte aucun mot de passe et ne crée aucun membre.

## Connexion

SEAFA_SYSTEM_LOGIN_URL doit être l’URL HTTPS vérifiée de /login, sans paramètres ni fragment. Sans elle, /login affiche honnêtement que la connexion n’est pas encore disponible.

Aucune disponibilité réelle d’un système déployé n’est affirmée par les tests locaux : ils simulent le contrat. Aucun changement n’a été effectué dans le projet voisin.
