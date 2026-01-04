# Création des DTO d’authentification

Ici, nous allons créer les DTO (Data Transfer Objects) nécessaires pour les réponses du service d'authentification.

Chaque DTO doit inclure les constructeurs, getters et setters appropriés.

Dans le dossier `dto`, créer la classe `MessageDTO` avec pour attribut :

```java
private String message;
```

Ensuite, créer la classe `AuthResponseDTO` avec les attributs suivants :

```java
private String token;
private String refreshToken;
private String type = "Bearer";
private String username;
private String email;
private List<String> roles;
```