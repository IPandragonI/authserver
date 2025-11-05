# Création de l’architecture

## Arborescence du projet

Une fois que l'application Spring Boot est créée, il est important de structurer le projet selon le modèle MVC. 
Voici l'arborescence que nous allons mettre en place :

```
app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/app/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   └── resources/
│   │       └── db.changelog/
│   │         └── app-changelog.xml
│   │       ├── static/
│   │       ├── template/
│   │       └── application.properties
└── pom.xml
```

### Description des dossiers

- `controller/` : Contient les classes qui gèrent les requêtes HTTP et les interactions entre le modèle et la vue.
- `model/` : Contient les classes représentant les entités de l'application, ainsi que la logique métier.
- `repository/` : Contient les interfaces qui gèrent la persistance des données (CRUD) en interagissant avec la base de données.
- `service/` : Contient les classes qui implémentent la logique métier et les règles de gestion.
- `resources/db.changelog/` : Contient les fichiers de migration de la base de données (Liquibase).
- `resources/static/` : Contient les ressources statiques (CSS, JS, images).
- `application.properties` : Fichier de configuration de l'application.
- `pom.xml` : Fichier de configuration Maven pour gérer les dépendances et les plugins.