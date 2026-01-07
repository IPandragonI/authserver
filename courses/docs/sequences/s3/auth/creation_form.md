# Création des forms d’authentification

Ici, nous allons créer les formulaires (forms) nécessaires pour les requêtes d’authentification.

Attention, il faut ajouter les annotations de validation appropriées (@NotBlank, @Size, @Email, @Pattern ...).

Aussi, chaque form doit inclure les constructeurs (un vide et un complet), getters et setters appropriés.

Créer un dossier `form`, créer la classe `RegisterForm` avec les attributs suivants.

```java
private String username;
private String email;
private String password;
```

Puis, créer la classe `LoginForm` avec les attributs suivants :

```java
private String username;
private String password;
```

Enfin, créer la classe `RefreshTokenForm` avec l'attribut suivant :

```java
private String refreshToken;
```

## Correction

--- 

<iframe width="640" height="360" src="https://www.youtube.com/embed/64tyZwT2OI4" frameborder="0" allowfullscreen></iframe>

---