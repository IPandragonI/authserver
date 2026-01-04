# Création des form d'authentification - Avant de commencer

Lorsque l'utilisateur voudra s'inscrire ou se connecter, il devra fournir certaines informations via des formulaires (forms).

À la différences des DTO (Data Transfer Objects) qui sont utilisés pour structurer les données échangées entre le client et le serveur, les formulaires sont spécifiquement conçus pour valider et capturer les données d'entrée de l'utilisateur.
Ainsi, les formulaires incluent souvent des annotations de validation pour s'assurer que les données fournies par l'utilisateur respectent certaines contraintes (par exemple, format d'email, longueur du mot de passe, etc.).

Par exemple : 

```java
@NotBlank(message = "L'email est obligatoire")
@Email(message = "L'email doit être valide")
private String email;
```

Nous allons créer trois formulaires principaux :

- `RegisterForm` : pour l'inscription des nouveaux utilisateurs.
- `LoginForm` : pour la connexion des utilisateurs existants.
- `RefreshTokenForm` : pour le rafraîchissement des tokens JWT.