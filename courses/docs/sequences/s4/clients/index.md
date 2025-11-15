# Connexion d’un client au SSO

Cette section va expliquer les étapes nécessaires pour qu’un client (application web) puisse s’authentifier auprès du serveur SSO que nous avons mis en place précédemment.

# 1. Informations nécessaires côté client

Quand un utilisateur clique sur “Se connecter”, l’application cliente ne gère jamais le login elle-même.
Elle doit rediriger l’utilisateur vers le serveur SSO grâce à une URL contenant des paramètres obligatoires :

- client_id : l’identifiant du client 
- redirect_uri : l’URL vers laquelle ton SSO renverra l’utilisateur après validation
- authorization_endpoint : l’URL du serveur SSO pour l’autorisation
- token_endpoint : l’URL du serveur SSO pour obtenir le token d’accès
- response_type=code : car on utilise un code d’autorisation

éventuellement scope si tu veux gérer des permissions

Exemple d’URL :

https://sso.example.com/authorize?client_id=mon-client&redirect_uri=https://monapp.example.com/callback&response_type=code
