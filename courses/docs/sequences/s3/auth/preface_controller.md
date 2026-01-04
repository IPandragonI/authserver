# Création du controller d'authentification - Avant de commencer

Le controller d’authentification est responsable de la gestion des requêtes HTTP liées à l’authentification des utilisateurs.
Il agit comme une interface entre le client (par exemple, une application web ou mobile) et le service d’authentification que nous avons précédemment créé.

Nous allons créer un controller REST qui exposera plusieurs endpoints pour les opérations d’authentification courantes, telles que l’inscription, la connexion et le rafraîchissement des tokens JWT.
