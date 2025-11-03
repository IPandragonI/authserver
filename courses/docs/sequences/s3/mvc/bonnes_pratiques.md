# Bonnes pratiques

## Normes de codage
- Suivez les conventions de nommage Java (CamelCase pour les classes, camelCase pour les variables et méthodes).

- Utilisez des packages pour organiser les classes par fonctionnalité (ex., `com.example.app.controller`, `com.example.app.service`, `com.example.app.model`).

- Commentez votre code de manière claire et concise seulement pour expliquer les parties complexes.

- Évitez les lignes de code trop longues (généralement limitées à 80-120 caractères).

- Utilisez des noms de variables et de méthodes significatifs et descriptifs.

- Évitez les commentaires redondants qui n’ajoutent pas de valeur.

- Utilisez des blocs `try-catch` pour gérer les exceptions de manière appropriée.

- Utilisez des annotations Spring Boot pour simplifier la configuration et la gestion des dépendances (ex., `@Autowired`, `@Service`, `@Repository`, `@RestController`).

- Utilisez des DTO (Data Transfer Objects) pour transférer les données entre les couches, afin de ne pas exposer directement les entités du modèle.


## Sources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-150003.pdf)
- [Best Practices for Building RESTful APIs](https://restfulapi.net/best-practices/)



