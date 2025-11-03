# Introduction à Docker

Docker est une plateforme de conteneurisation qui permet d'encapsuler une application et ses dépendances dans un environnement portable et reproductible. Dans cette séquence, l'objectif est de comprendre les principes de base de Docker et d'apprendre à construire, exécuter et orchestrer des conteneurs pour des applications Java/Spring Boot.

## [Installation](installation.md)

---

## Pourquoi utiliser Docker ?

- Isolation des dépendances : chaque application s'exécute dans son propre conteneur.
- Portabilité : même comportement entre postes de développement, CI et production.
- Rapidité de déploiement : démarrage et mise à l'échelle simplifiés.
- Cohérence : même image = même comportement.

---

## Concepts clés

- Image : snapshot immuable contenant l'application et son environnement.
- Conteneur : instance en cours d'exécution d'une image.
- Dockerfile : fichier déclaratif décrivant comment construire une image.
- Registry : dépôt d'images (ex. Docker Hub, registry privée).
- Volumes : stockage persistant pour les conteneurs.
- Réseaux : connectivité entre conteneurs et services.

---

## Objectifs de la séquence

À la fin de ce module, vous serez capable de :

- Expliquer les principaux concepts de Docker.
- Écrire un `Dockerfile` simple pour une application Spring Boot.
- Construire et tester une image Docker localement.
- Utiliser `docker compose` pour exécuter des services liés.

---

## Prérequis

- Docker installé (Engine et Docker CLI). 
> Vérifier avec : `docker --version`.
- Docker Compose pour orchestrer plusieurs services.

---

## Ressources recommandées

- Documentation Docker : https://docs.docker.com
- Tutoriels officiels et exemples pour Java/Spring Boot
- Exemples pratiques fournis dans la suite de la séquence

---