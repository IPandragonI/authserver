# Création des DTO d'authentification - Avant de commencer

Dans un premier temps, nous allons créer les DTO (Data Transfer Objects) nécessaires pour les réponses du service d'authentification.

Nous allons créer deux DTO principaux :

- `MessageDTO` : pour encapsuler les messages de réponse (succès, erreurs).
- `AuthResponseDTO` : pour encapsuler les données de la réponse d'authentification (tokens JWT, nom d'utilisateur, email, rôles).