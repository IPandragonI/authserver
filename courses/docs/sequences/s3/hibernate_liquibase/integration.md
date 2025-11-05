# Intégration d'Hibernate et Liquibase

## Configuration du projet

**Fichier** `application.properties`

Voici la configuration utilisée :

```properties
spring.liquibase.change-log=${LIQUIBASE_CHANGE_LOG:classpath:db.changelog/fycsso-changelog.xml}
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

- `spring.liquibase.change-log` : Spécifie le chemin du fichier de changelog Liquibase. On utilise une variable
  d’environnement `LIQUIBASE_CHANGE_LOG` pour permettre la personnalisation.
- `spring.jpa.generate-ddl` : Indique à Spring JPA de générer le schéma de la base de données.
- `spring.jpa.hibernate.ddl-auto` : Définit la stratégie de mise à jour du schéma. Ici, `update` permet à Hibernate de
  mettre à jour le schéma en fonction des entités.
- `spring.jpa.show-sql` : Affiche les requêtes SQL générées par Hibernate dans la console pour le débogage.

## Structure des changelogs Liquibase

Liquibase repose sur un fichier maître, ici fycsso-changelog.xml, qui inclut toutes les versions de schéma du projet.

Arborescence

```
src/main/resources/db.changelog/
│
├── fycsso-changelog.xml
└── 1.0/
    └── 001.xml
    └── 002.xml
└── 1.1/
    └── 001.xml
    ...
```

Contenu du fichier maître fycsso-changelog.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
https://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <!-- Version 1.0 -->
    <include file="db.changelog/1.0/001.xml"/>

</databaseChangeLog>
```

Ainsi, chaque version du schéma (1.0, 1.1, etc.) a ses propres fichiers *.xml regroupant les changeSet.

## Exemple de fichier de migration (001.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
    https://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <changeSet id="create-initial-tables" author="mathys">
        <sqlFile path="db/scripts/schema.sql"/>
    </changeSet>

</databaseChangeLog>
```

Ici, on inclut un script SQL externe pour créer les tables initiales.

---

## Intégration avec Hibernate

Chaque table SQL correspond à une entité Java dans le dossier :

`src/main/java/com/fyc/sso/business/`


Exemple :
```java
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
}

```

Chaque entité a son repository dédié dans :

`src/main/java/com/fyc/sso/repository`


Exemple :

```java
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
Optional<Role> findByName(String name);
}
```

Ainsi, Hibernate gère la persistance des entités définies en Java, tandis que Liquibase s'occupe de la gestion des versions du schéma de la base de données.