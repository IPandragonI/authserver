# Introduction à Hibernate

## Qu’est-ce qu’Hibernate ?

Hibernate est un ORM (Object-Relational Mapping), c’est-à-dire un outil qui permet de faire le lien entre les objets Java et les tables d’une base de données relationnelle.

En gros, il permet de manipuler des objets Java sans écrire directement de SQL.
C’est Hibernate qui se charge de traduire les opérations Java (création, lecture, mise à jour, suppression) en requêtes SQL.

## Pourquoi utiliser Hibernate dans ce projet ?

Hibernate est l'un des ORM les plus populaires et largement utilisés dans l'écosystème Java.
Utiliser un ORM permet de gagner du temps et d'automatiser la gestion des interactions avec la base de données.

## Exemple d’utilisation d’Hibernate

Définissons une entité `User` qui sera mappée à une table `users` dans la base de données.
Tout d'abord, nous créons la classe `User` avec les annotations Hibernate nécessaires :


```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
}
```

Ici, on retrouve l'annotation `@Entity` qui indique qu’il s’agit d’une entité persistante.

L’annotation `@Id` indique que le champ `id` est la clé primaire de l’entité, et `@GeneratedValue` spécifie que sa valeur sera générée automatiquement par la base de données.

De fait, cette entity représente en base une table SQL :

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255)
);
```


## Hibernate et JPA

JPA (Java Persistence API) est une spécification Java EE.
Hibernate est une implémentation de cette spécification.

JPA définit comment gérer la persistance.

Hibernate fournit le code concret pour le faire.

## Annotations principales

- `@Entity` : Indique qu’une classe est une entité persistante.
- `@Table(name = "table_name")` : Spécifie le nom de la table en base de données.
- `@Id` : Indique le champ qui est la clé primaire.
- `@GeneratedValue(strategy = GenerationType.IDENTITY)` : Spécifie que la valeur de la clé primaire est générée automatiquement.
- `@Column(name = "column_name")` : Spécifie le nom de la colonne en base de données.
- `@OneToMany`, `@ManyToOne`, `@ManyToMany` : Définissent les relations entre les entités.

## Opérations principales

- `findAll()` : Récupérer toutes les entités d’un type donné.
- `findById(id)` : Récupérer une entité par son ID.
- `save(entity)` : Enregistrer une nouvelle entité ou mettre à jour une entité existante.
- `delete(entity)` : Supprimer une entité.
- `deleteById(id)` : Supprimer une entité par son ID.
- `deleteAll()` : Supprimer toutes les entités d’un type donné.
- `count()` : Compter le nombre d’entités d’un type donné.
- `existsById(id)` : Vérifier si une entité existe par son ID.
- `query()` : Exécuter des requêtes personnalisées.

## Opérateurs disponibles

| Opérateur     | Exemple                                                 | SQL généré                                             |
|---------------|---------------------------------------------------------|--------------------------------------------------------|
| `And`         | `findByUsernameAndEmail(String username, String email)` | `SELECT * FROM users WHERE username = ? AND email = ?` |
| `Or`          | `findByUsernameOrEmail(String username, String email)`  | `SELECT * FROM users WHERE username = ? OR email = ?`  |
| `Between`     | `findByAgeBetween(int start, int end)`                  | `SELECT * FROM users WHERE age BETWEEN ? AND ?`        |
| `LessThan`    | `findByAgeLessThan(int age)`                            | `SELECT * FROM users WHERE age < ?`                    |
| `GreaterThan` | `findByAgeGreaterThan(int age)`                         | `SELECT * FROM users WHERE age > ?`                    |
| `Like`        | `findByUsernameLike(String pattern)`                    | `SELECT * FROM users WHERE username LIKE ?`            |
| `In`          | `findByRoleIn(List<String> roles)`                      | `SELECT * FROM users WHERE role IN (?)`                |
| `OrderBy`     | `findByOrderByUsernameAsc()`                            | `SELECT * FROM users ORDER BY username ASC`            |

## Conclusion

Hibernate est un outil puissant pour gérer la persistance des données dans une application Java.
Il simplifie grandement les interactions avec la base de données en permettant de travailler avec des objets Java plutôt qu’avec du SQL brut.
Dans ce projet, nous utiliserons Hibernate pour gérer les entités et les opérations CRUD sur la base de données.
  
## Sources
- [Documentation officielle Hibernate](https://hibernate.org/orm/documentation/)
- [Guide JPA de Baeldung](https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)