# Configuration de Spring Security - Avant de commencer

## Gestion de la sécurité avec Spring Security

Une fois le service JWT mis en place, nous allons configurer la sécurité de notre application en utilisant Spring Security.

Pour ce faire, nous allons mettre à jour la configuration de Spring Security afin d'intégrer notre filtre d'authentification JWT.

Le fonctionnement de Spring Security repose sur une chaîne de filtres qui interceptent les requêtes HTTP entrantes.

Nous allons ajouter notre `JwtAuthenticationFilter` à cette chaîne pour qu'il puisse traiter les tokens JWT avant que les requêtes n'atteignent les contrôleurs.