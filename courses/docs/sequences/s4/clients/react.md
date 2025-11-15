# Création d'un client React consommant le SSO

## Structure du projet

Pour initialiser le projet React, nous allons utiliser Vite, un outil de build rapide et moderne pour les applications
web. La structure du projet sera la suivante :

Pour se faire, exécutez la commande suivante dans votre terminal :

```bash
npm create vite@latest
```

Choisissez le nom du projet (par exemple, `client-react`) et sélectionnez `React` comme framework.
Pour le language, vous pouvez choisir entre JavaScript et TypeScript selon vos préférences.
Ici, nous utiliserons JavaScript.

Une fois le projet créé, la structure sera la suivante :

```
/client-react
  |-- /public               # Fichiers publics (index.html, favicon, etc.)
  |-- /src                  # Code source de l'application
      |-- /assets           # Ressources statiques (images, styles, etc.)
      |-- App.css           # Styles globaux de l'application
      |-- App.jsx           # Composant principal de l'application
      |-- index.css         # Styles spécifiques à l'index
      |-- main.jsx          # Point d'entrée de l'application
  |-- .gitignore            # Fichier pour ignorer certains fichiers dans Git
  |-- eslint.config.js      # Configuration ESLint
  |-- index.html            # Fichier HTML principal
  |-- package.json          # Fichier de configuration npm
  |-- README.md             # Documentation du projet
  |-- vite.config.js        # Configuration de Vite
```

## Simplification du projet

Pour simplifier notre exemple, nous allons nous concentrer uniquement sur le fichier `App.jsx`.

