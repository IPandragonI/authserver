# Connexion d’un client au SSO

Cette section va expliquer les étapes nécessaires pour qu’un client (application web) puisse s’authentifier auprès du serveur SSO que nous avons mis en place précédemment.

# 1. Informations nécessaires côté client

Quand un utilisateur clique sur “Se connecter”, l’application cliente ne gère jamais le login elle-même.
Elle doit rediriger l’utilisateur vers le serveur SSO grâce à une URL contenant des paramètres obligatoires :

- client_id : l’identifiant du client 
- redirect_uri : l’URL vers laquelle ton SSO renverra l’utilisateur après validation
- authorization_endpoint : l’URL du serveur SSO pour l’autorisation
- response_type=code : car on utilise un code d’autorisation

éventuellement scope si tu veux gérer des permissions

Exemple d’URL :

https://sso.example.com/authorize?client_id=mon-client&redirect_uri=https://monapp.example.com/callback&response_type=code

---
Voici donc ce que nous allons mettre en place.

<iframe width="640" height="360" src="https://youtube.com/embed/fw_QzFXff7M" frameborder="0" allowfullscreen></iframe>


---

Pour ce faire, nous allons donc créer 2 applications web comme nous avons pu le voir dans la vidéo :

- Une application administrative connectée au serveur SSO
- Une application cliente qui va permettre à l’utilisateur de se connecter via le serveur SSO
