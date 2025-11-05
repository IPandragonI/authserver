# Rappel et principes de l’architecture MVC

Le **MVC (Model-View-Controller)** est un modèle architectural qui vise à séparer les responsabilités d’une application en trois couches distinctes et complémentaires :

- **Model** → représente les données, la logique métier et les règles de gestion.
- **View** → gère l’affichage et l’interface utilisateur.
- **Controller** → reçoit les requêtes utilisateur, invoque la logique métier et détermine la vue à renvoyer.

---

## Rôle de chaque couche

### Model
Le **Model** contient les entités (objets représentant les données, souvent mappées à une table de base de données), 
ainsi que la logique métier (les règles fonctionnelles propres à l’application) et la persistance des données.

#### Exemple :
L’entité `User`, liée à la table `users` dans la base de données. 

Le service `UserService`, qui contient les traitements liés aux utilisateurs. 

Le repository `UserRepository`, qui gère les opérations CRUD (*Create, Read, Update, Delete*) sur les utilisateurs.

---

### View
La **View** est chargée de présenter les données au client (sous forme HTML, JSON, XML, etc.).  
Dans une application Spring Boot REST, la vue n’est pas une page HTML, mais plutôt les réponses JSON renvoyées au client (par exemple une application front-end en React ou Angular).

#### Exemple :
Une requête HTTP GET vers `/api/users/1` renvoie une réponse JSON contenant :

```json
{
  "id": 1,
  "username": "dupond",
  "email": "Dupond@example.com"
}
```

---

### Controller
Le **Controller** est l'intermédiaire entre le client et le serveur. Il reçoit les requêtes HTTP, appelle les services du modèle pour traiter les données, 
et retourne les réponses appropriées (souvent sous forme JSON dans une API REST).

#### Exemple :
Le `UserController` qui gère les requêtes liées aux utilisateurs, comme la récupération, la création, la mise à jour et la suppression d’utilisateurs.

`GET /api/users/{id}` → Récupérer un utilisateur par son ID.

`POST /api/users` → Créer un nouvel utilisateur.

`PUT /api/users/{id}` → Mettre à jour un utilisateur existant.

`DELETE /api/users/{id}` → Supprimer un utilisateur.

---

## Pourquoi utiliser MVC plutôt qu’une architecture monolithique ou non structurée ?

Le modèle MVC apporte plusieurs avantages majeurs par rapport à une architecture où 
tout serait centralisé dans un même bloc de code comme par exemple :

* La **séparation des responsabilités** : chaque couche a un rôle bien défini, ce qui facilite la maintenance et l’évolution du code.
* La **testabilité** : chaque couche peut être testée indépendamment, ce qui améliore la qualité du code.
* La **réutilisabilité** : les composants de chaque couche peuvent être réutilisés dans d’autres parties de l’application ou dans d’autres projets.



## Sources

- [Modèle MVC - Wikipedia](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur)
- [Spring MVC - Documentation officielle Spring](https://spring.io/guides/gs/rest-service/)