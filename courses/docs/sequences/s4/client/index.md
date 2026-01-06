# Création d'une application React consommant le SSO

Dans cette section, nous allons créer une application cliente en React qui consommera le service d'authentification SSO
que nous avons mis en place précédemment.

## Structure du projet

Pour initialiser le projet React, nous allons utiliser Vite, un outil de build rapide et moderne pour les applications
web. Pour se faire, exécutez la commande suivante dans votre terminal :

```bash
npm create vite@latest
```

Choisissez le nom du projet (par exemple, `client-app`) et sélectionnez `React` comme framework.
Pour le language, vous pouvez choisir entre JavaScript et TypeScript selon vos préférences.
Ici, nous utiliserons JavaScript.

Voici un exemple de structure de projet pour notre application React :

```
/client-app
  |-- /public
      |-- favicon.ico
  |-- /src
      |-- /components
            |-- LoginButton.jsx
      |-- /pages
            |-- Home.jsx
            |-- Dashboard.jsx
            |-- Login.jsx
            |-- Profile.jsx
      |-- App.jsx
      |-- main.jsx
  |-- .gitignore
  |-- .env
  |-- eslint.config.js
  |-- package.json
  |-- README.md
  |-- vite.config.js
```

Le but de cette application est de simuler un client web qui s'authentifie via le serveur SSO que nous avons créé.
Pour ce faire, nous allons créer plusieurs pages : une page d'accueil, une page de connexion, un tableau de bord et une
page de profil utilisateur.

## Exercice

1. **Initialisation du projet** : Créez un nouveau projet React avec Vite comme décrit ci-dessus.
2. **Créer le composant LoginButton** : Ce bouton permettra à l'utilisateur de se connecter via le SSO. Lorsqu'il est
   cliqué, il redirigera l'utilisateur vers le serveur d'authentification SSO en fonction des paramètres OAuth2.
3. **Créer les pages** :
    - `Home.jsx` : La page d'accueil de l'application.
    - `Login.jsx` : La page de connexion qui affichera le bouton de connexion SSO.
    - `Dashboard.jsx` : La page principale après la connexion, affichant des informations utilisateur.
    - `Profile.jsx` : Une page pour afficher et modifier les informations du profil utilisateur.
4. **Gestion des routes** : Utilisez `react-router-dom` pour gérer la navigation entre les différentes pages de
   l'application.
5. **Intégration avec le SSO** : Configurez l'application pour qu'elle interagisse avec le serveur SSO pour
   l'authentification.
    - Lorsqu'un utilisateur clique sur le bouton de connexion, il doit être redirigé vers le serveur SSO.
    - Après une authentification réussie, l'utilisateur doit être redirigé vers le tableau de bord avec un token JWT.
6. **Affichage des informations utilisateur** : Sur la page `Dashboard.jsx`, affichez les informations de l'utilisateur
   récupérées à partir du token JWT.
7. **Gestion de la déconnexion** : Ajoutez une fonctionnalité de déconnexion qui révoque le token JWT et redirige
   l'utilisateur vers la page d'accueil.
8. **Testez l'application** : Assurez-vous que toutes les fonctionnalités fonctionnent correctement, y compris
   la redirection vers le SSO, la récupération des informations utilisateur et la déconnexion.