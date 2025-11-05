# Introduction à Liquibase

## Qu’est-ce que Liquibase ?

Liquibase est un outil open-source de versioning de base de données.
Il permet de gérer, suivre et déployer les changements de schéma, un peu comme Git le fait pour le code.

## Pourquoi utiliser Liquibase dans ce projet ?

Dans un projet où la base de données évolue fréquemment, il est important de garder une trace des modifications apportées au schéma.
On va alors utiliser Liquibase et des changlogs pour documenter chaque changement.
Chaque fois qu’une modification est nécessaire (ajout de table, modification de colonne, etc.), on crée un nouveau changelog.
Cela permet de s’assurer que toutes les instances de la base de données sont synchronisées avec le schéma attendu par l’application.

## Exemple d’utilisation de Liquibase

### Structure d’un changelog
Un changelog est un fichier XML, YAML, JSON ou SQL qui décrit les changements à apporter à la base de données.
Voici un exemple simple en XML :
```xml
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">

    <changeSet id="1" author="votre_nom">
        <createTable tableName="users">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true"/>
            </column>
            <column name="username" type="VARCHAR(255)"/>
        </createTable>
    </changeSet>
</databaseChangeLog>
```

### Explication du changelog
- `<databaseChangeLog>` : Racine du fichier de changelog.
- `<changeSet>` : Définit un ensemble de changements à appliquer. Chaque `changeSet` doit avoir un `id` unique et un `author`.
- `<createTable>` : Crée une nouvelle table dans la base de données.
- `<column>` : Définit une colonne dans la table, avec son nom et son type.
- `<constraints>` : Spécifie les contraintes sur la colonne, comme la clé primaire.

### Bonnes pratiques

- Utiliser des `changeSet` petits et spécifiques pour faciliter la gestion des modifications.
- Documenter chaque `changeSet` avec des commentaires pour expliquer son but.

