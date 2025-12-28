# Création des DTO - Avant de commencer

Dans cette partie, nous allons créer des classes **DTO (Data Transfert Object)**. Ces objets DTO ont pour utilité de communiquer directement avec la base de données pour effectuer diverses actions. Ces objets sont des "clones" de nos entités, à la différence près qu'elles représentent la communication directe entre notre entité et sa table dans la base de données. Avant de créer ces DTO, quelques explications :

## Classe

- un DTO est une classe qui utilise un repository. Elle doit donc avoir un attribut correspondant au repository de l'entité.
- un DTO, quand déclaré, doit être précédé de l'annotation **"Repository"**, pour signaler qu'on va interagir avec un regroupement de données.
- un DTO doit avoir un/plusieurs constructeurs, qui lui permettront de construire un objet utilisable :

exemple :

```java
@Repository
public class TestDTO(){
    private TestRepository testRepository;

    public TestDTO(TestRepository testRepository){
        this.testRepository = testRepository;
    }
}
```

## Méthodes

- Chaque classe DTO doit permettre d'interagir avec les champs de la table à laquelle il correspond et par conséquent doit fournir des méthodes permettant de modifier/consulter ces données.
- On peut se servir de getters et de setters pour le faire :

exemple :

```java
public Integer getId() {
    return id;
}

public void setId(Integer id) {
    this.id = id;
}
```

Nous pouvons ensuite passer à la création des DTO.