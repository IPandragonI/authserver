# Créer les entités - Avant de commencer

Pour chaque table de la base de données, il faut créer une entité qui lui correspond. Cette entité nous permettra **d'interagir avec la table et ses données**, afin de pouvoir les manipuler. Avant de créer ces entité, voici quelques explications sur les normes & syntaxes :

### Champs

- chaque champ doit être annoté de ```@Column``` et de son nom dans la base de données avec ```(name = "test")```
- si un champ doit être unique, c'est à dire qu'on ne peut pas avoir cette même valeur sur plusieurs entités de la même table, il faut l'indiquer avec ```(unique = true)```
- si un champ ne peut pas être null en base de de données, il doit être annoté avec ```(nullable = false)```
- si un champ est un id, il doit être indiqué avec ```@Id```
- si un id est généré par la table en sql de manière automatique, il faut l'indiquer avec ```@GeneratedValue(strategy = GenerationType.IDENTITY)```

exemple : 

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer test;

@Column(name = "test2", nullable = false, unique = true)
private String test2;
```

### Constructeur

- pour chaque entité, il faut un constructeur, c'est à dire de quoi **fournir des données et construire une instance de cet objet**, pour pouvoir l'utiliser.

exemple :
```java
public User(Integer test, String test2) {
    this.test = test;
    this.test2 = test2;
}
```

### Getters et setters

- pour chaque entité, il faut fournir de quoi **récupérer ou modifier les données d'un champ de cet objet**. Pour cela, on passe par un getter ou un setter, pour chaque champ de l'entité.

exemple :

```java
public Integer getTest() {
    return test;
}

public void setTest(Integer test) {
    this.test = test;
}
```

Dans l'étape suivante, nous allons donc pouvoir créer les différents entités de notre application.