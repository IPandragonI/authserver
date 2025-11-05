# Dockerisation du projet Spring Boot

Dans cette partie, vous apprendrez à dockeriser une application Spring Boot avec une base de données MariaDB, en utilisant Docker Compose pour orchestrer les services.
Vous verrez comment configurer les fichiers Docker, gérer les variables d'environnement et lancer l'application en mode développement et production.

---

## Rôle des fichiers

### `Dockerfile`

- Multi-stage build : utilise une image Maven pour compiler le projet et produire le jar, puis une image JDK légère pour exécuter l'application.
- Avantage : image finale plus légère, compilation isolée.
- Points importants : ARG/ENV pour le JAR, `ENTRYPOINT` passe `JAVA_OPTS`.

### `docker-compose.yml` (production/stack complet)  

- Définit trois services : `db` (MariaDB), `app` (image buildée depuis `Dockerfile`) et `phpmyadmin`.
- Utilise `env_file: - .env` pour centraliser les secrets/config.
- Monte un volume `db_data` pour la persistance des données.
- `app` dépend de `db` avec `depends_on`.
- Mappe le port application via la variable `SERVER_PORT` et expose `3306` pour la DB.

### `docker-compose.dev.yml` (dev)  

- Contient uniquement `db` (MariaDB) pour que l'application soit lancée depuis l'IDE mais connectée à une base dockerisée.
- Utiliser en dev quand on veut debug depuis IntelliJ et garder la DB isolée.

### `.dockerignore`

- Exclut les fichiers inutiles du contexte de build Docker (ex : `target/`, `.git/`, etc.) pour accélérer la construction de l'image.

---

## Variables importantes (dans `.env`)

- `MARIADB_DATABASE`, `MARIADB_USER`, `MARIADB_PASSWORD`, `MARIADB_ROOT_PASSWORD`
- `DATASOURCE_URL`, `DATASOURCE_USERNAME`, `DATASOURCE_PASSWORD` (pour Spring Boot)
- `LIQUIBASE_CHANGE_LOG` (si Liquibase utilisé)
- `SERVER_PORT` (port exposé par l'application)
- `JAVA_OPTS` (options JVM au runtime)

Exemple rapide de `DATASOURCE_URL` : `jdbc:mariadb://db:3306/<DATABASE>?useSSL=false`

---

## Commandes utiles

- Lancer la DB en dev (app depuis l'IDE) :  
  `docker compose -f docker-compose.dev.yml up -d`

- Lancer le stack complet (build + run) :  
  `docker compose -f docker-compose.yml up --build`

- Logs :  
  `docker compose -f docker-compose.yml logs -f app`

- Arrêter et supprimer volumes :  
  `docker compose -f docker-compose.yml down -v`

- Inspecter conteneur DB :  
  `docker compose -f docker-compose.yml exec db sh`  
  (ou utiliser `mysql` client selon image)

---

## Points de vigilance / dépannage rapide

- Si `docker` nécessite `sudo`, ajouter l'utilisateur au groupe `docker` ou utiliser `sudo`.
- Si port 3306 déjà utilisé, adapter le mapping local dans `docker-compose` ou arrêter le service local MySQL.
- Pour supprimer data corrompue : `docker volume rm <project>_db_data` (attention perte de données).
- Erreurs de build : vérifier que `pom.xml` et `src/` sont copiés correctement dans le `Dockerfile`.

---

## Vidéo explicative

<iframe width="640" height="360" src="https://www.youtube.com/embed/BP1MIyxLTIA" frameborder="0" allowfullscreen></iframe>

---

## Évolutions du code (fichiers à récupérer dans le projet)

- [`Dockerfile`](https://github.com/IPandragonI/authserver/blob/main/app/Dockerfile)
- [`docker-compose.yml`](https://github.com/IPandragonI/authserver/blob/main/app/docker-compose.dev.yml)
- [`docker-compose.dev.yml`](https://github.com/IPandragonI/authserver/blob/main/app/docker-compose.yml)
- [`.env` (exemple à créer/modifier avant démarrage)](https://github.com/IPandragonI/authserver/blob/main/app/.env)
- [`.dockerignore`](https://github.com/IPandragonI/authserver/blob/main/app/.dockerignore)

Copier ces fichiers depuis le dépôt local ou les ouvrir dans l'IDE pour modification.