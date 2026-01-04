# Configuration des token JWT - Avant de commencer

## Gestion des token JWT

Afin de gérer l'authentification stateless<sup>1</sup> de notre application, nous allons utiliser des JSON Web Tokens (JWT). 

Les tokens JWT permettent de transmettre des informations sécurisées entre le client et le serveur sous forme de JSON. Ils sont signés numériquement pour garantir leur intégrité et peuvent être vérifiés par le serveur sans avoir besoin de stocker une session.

Ainsi, chaque requête envoyée au serveur doit inclure un token JWT valide dans les en-têtes HTTP de la requête, généralement dans l'en-tête `Authorization` :

```Authorization: Bearer <token_JWT>```

Le serveur peut alors vérifier ce token pour authentifier l'utilisateur et autoriser l'accès aux ressources protégées.

## Schéma du token JWT
<img src="../../../../img/jwt.png" alt="Schéma JWT" style="max-width:600px;"/>

---
1. Statless signifie que le serveur ne conserve pas d'état de session entre les requêtes. Chaque requête est autonome et doit contenir toutes les informations nécessaires pour être traitée.