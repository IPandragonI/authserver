# Créer les services - Avant de commencer

La prochaine étape, maintenant, est de créer les services, qui vont pouvoir effectuer différentes actions sur notre repository, et ainsi pouvoir interagir avec la base de données. Avant de commencer, quelques explications sur les services :

## Classe

- pour chaque entité (et donc repository) on doit avoir un service qui lui est lié.
- un service doit avoir comme attribut le repository auquel il est lié, afin de pouvoir effectuer des manipulations dessus.
- ce service permettra d'effectuer des actions CRUD sur notre repository, et donc de pouvoir interagir avec les données.
- chaque service doit être déclaré avec l'annotation ```@Service```.

exemple :
```java
@Service
public class TestService {

    private final TestRepository testRepository;

}
```

## Méthodes

- chaque méthode doit permettre d'effectuer une action vis à vis du repository, dans la logique du système CRUD.
- toute action qui devra être possible de faire dans l'application vis à vis de cette table **doit obligatoirement être définie dans le service**.
- la gestion d'exception et le contrôle d'intégrité des données doit se faire depuis le service, afin de garantir une bonne gestion des donneés, et éviter d'effectuer des requêtes sql avec de mauvais paramètres (entre autres).

exemple :
```java
    // Create a new test entity, with unique id
    public Test createTest(Id test, String test2) {
        if (testRepository.existsByTest(test)) {
            throw new IllegalArgumentException("TestEntity with test '" + test + "' already exists");
        }
        Test testEntity = new Test(test, test2);
        Test savedTest = roleRepository.save(testEntity);
        return testEntity;
    }

    // Get test by name
    public Optional<Test> getTestById(Id test) {
        return testRepository.findByTest(test)
    }
```
Dans l'étape suivante, nous allons donc pouvoir créer les différents services liés à nos remositories.

