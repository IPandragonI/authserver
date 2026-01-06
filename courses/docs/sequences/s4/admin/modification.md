# Modification du système d'authentification

Dans cette section, nous allons modifier le service d'authentification pour permettre la gestion des connexions clients.
Actuellement, notre système d'authentification est configuré de façon a permettre la connexion à une application peu
importe le rôle de l'utilisateur.

<iframe width="640" height="360" src="https://youtube.com/embed/RNa5kdnFPe4" frameborder="0" allowfullscreen></iframe>

Voici donc les fichiers que nous allons modifier pour implémenter cette fonctionnalité :

- [`AuthController.java`](https://github.com/IPandragonI/authserver/blob/main/app/src/main/java/esgi/fyc/sso/authserver/controller/AuthController.java#L51) : Nous allons modifier légèrement la méthode `login` pour vérifier les permissions d'un utilisateur lors de la connexion à un client à travers son realm.
- [`AuthService.java`](https://github.com/IPandragonI/authserver/blob/main/app/src/main/java/esgi/fyc/sso/authserver/service/AuthService.java#L173) : Nous allons rajouter une méthode `testUser` pour vérifier si l'utilisateur a le droit de se connecter au client.

---

Maintenant que nous avons modifié notre service d'authentification, nous allons pouvoir créer nos applications.