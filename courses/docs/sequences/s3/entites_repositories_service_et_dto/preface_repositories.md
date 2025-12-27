# Créer les repositories - Avant de commencer

Maintenant que l'on a créé toutes les entités de notre application, nous allons devoir créer des repositories. Avant de commencer à créer nos repositories, de petites explications s'imposent :

## Classe :

- un repository est une classe Java qui va représenter **un regroupement d'entités**, qui représente toutes les données stockées dans une table de la base de données. 
- pour déclarer un repository, on étend la classe JpaRepository.
- il faut également utiliser l'annotation ```@Repository``` sur la classe.

exemple :
```java
@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
}
```

## Méthodes :

- on peut donner à un repository des méthodes pour effectuer certaines actions simples, visant à récupérer une entité en particulier, où à vérifier l'existence d'une entité en fonction d'une valeur et d'un champ.
- lorsque l'on définit une méthode, si une méthode peut ne rien renvoyer (par exemple lors de la recherche d'un élément, qui peut ne pas exister), il faut la typer avec Optional, pour signaler qu'on peut ne rien recevoir en retour.
- le code correspondant à ces méthodes sera défini plus tard, dans le service correspondant à cette entité.

exemple :

```java
    Optional<Test> findByTest(Id test);

    Optional<Test> findByTest2(String test2);

    boolean existsByTest(Id test);

    boolean existsByTest2(String test2);
```

Dans l'étape suivante, nous allons donc pouvoir créer les différents repositories liés à nos entités.