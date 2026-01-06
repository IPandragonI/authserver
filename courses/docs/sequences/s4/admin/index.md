# Création d'une application React liée au SSO

## Structure du projet

Pour initialiser le projet React, nous allons utiliser Vite, un outil de build rapide et moderne pour les applications
web. La structure du projet sera la suivante :

Pour se faire, exécutez la commande suivante dans votre terminal :

```bash
npm create vite@latest
```

Choisissez le nom du projet (par exemple, `frontend`) et sélectionnez `React` comme framework.
Pour le language, vous pouvez choisir entre JavaScript et TypeScript selon vos préférences.
Ici, nous utiliserons JavaScript.


## Structure des dossiers

Voici donc un exemple de structure de projet pour notre application React :

```
/frontend
  |-- /public
      |-- favicon.ico
  |-- /src
      |-- /api
          |-- index.js
          |-- Urls.js
      |-- /components
          |-- common
              |-- Table.jsx
          |-- layout
              |-- Header.jsx
              |-- Footer.jsx
              |-- Sidebar.jsx
      |-- /pages
          |-- auth
              |-- ForgetPassword.jsx
              |-- Login.jsx
              |-- Register.jsx
          |-- clients
              |-- Clients.jsx
          |-- companies
              |-- Companies.jsx
          |-- dasboard
              |-- Dashboard.jsx
          |-- home
              |-- Home.jsx
          |-- logs
              |-- Logs.jsx
          |-- plans
              |-- Plans.jsx
          |-- realms
              |-- Realms.jsx
          |-- roles
              |-- Roles.jsx
          |-- settings
              |-- profile
                  |-- notifications
                      |-- ProfileNotifications.jsx
                  |-- preferences
                      |-- ProfilePreferences.jsx
                  |-- settings
                      |-- ProfileSettings.jsx
                  |-- security
                      |-- ProfileSecurity.jsx
              |-- realm
                  |-- RealmSettings.jsx
          |-- users
              |-- Users.jsx
      |-- /styles
          |-- global.css
      |-- App.jsx
      |-- AuthProvider.jsx
      |-- main.jsx
  |-- .gitignore
  |-- .env
  |-- eslint.config.js
  |-- package.json
  |-- README.md
  |-- vite.config.js
```

## Routes de l'application

Pour simplifier le projet, nous allons nous concentrer uniquement sur le fichier `App.jsx` pour le moment.
Le fichier `App.jsx` sera le router principal de notre application React.
Voici donc les routes qu'il faudra implémenter :

```
/ # Page d'accueil du SSO
/auth/login/{realmName} # Page de connexion
/auth/register # Page d'inscription
/auth/forgot-password # Page de réinitialisation du mot de passe
/realm/{realmName} # Page du realm
    /dashboard                       # Tableau de bord du realm
    /users                           # Liste des realms
    /clients                         # Liste des clients du realm
    /users                           # Liste des utilisateurs du realm
    /roles                           # Liste des rôles du realm
    /plans                           # Liste des plans du SSO
    /companies                       # Liste des entreprises
    /logs                            # Page des logs
    /settings                        # Page des paramètres

    # Si vous voulez aller plus loin, vous pouvez également créer ces pages :
    /profile                         # Page de profil utilisateur
    /settings                        # Page des paramètres utilisateur
        /profile                     # Paramètres de profil
        /preferences                 # Préférences utilisateur
        /notifications               # Paramètres de notifications
        /security                    # Paramètres de sécurité
```

Ces pages sont le strict minimum pour notre application SSO, en sachant que toutes les pages ne seront pas visibles en
fonction des rôles de la personne connectée.

## Gestion des rôles

Comme on l'a vu auparavant, notre SSO utilise des rôles pour les utilisateurs :

```
- SUPER_ADMIN : System-wide administrator with highest privileges
- ADMIN : Realm administrator with elevated privileges
- USER : Standard user with limited access
- REALM_ADMIN : Realm owner and manager
```

Il faut donc adapter l'affichage des pages en fonction des rôles de l'utilisateur connecté.
C'est pour cela que l'on a notre fichier `Sidebar.jsx` qui va permettre cela en affichant les liens de navigation
appropriés selon les rôles.

## Exercice

1. Initialisez un projet React avec Vite en utilisant la commande `npm create vite@latest`.
2. Créez la structure de dossiers décrite ci-dessus.
3. Implémentez les routes dans le fichier `App.jsx`.
4. Créez les différentes pages dans le dossier `pages` en respectant la structure donnée.
5. Adaptez l'affichage des pages en fonction des rôles de l'utilisateur connecté