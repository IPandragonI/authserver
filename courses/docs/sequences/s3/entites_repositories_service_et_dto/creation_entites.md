# Créer les entités

Rappel du schéma de base de données :

![Modèle de la base de données](../../../img/mvc.jpg "Modèle de la base de données")

## Vidéo explicative
<iframe width="640" height="360" src="https://www.youtube.com/embed/WYVcPAk27Yg" frameborder="0" allowfullscreen></iframe>

## 1. Créer les entités

1. Pour chaque table de la base de données, créez l'entité qui lui est liée, avec :
    - ses champs
    - son/ses constructeurs
    - ses getters et ses setters

2. Si vous avez des difficultés pour créer ces entités, consultez le dépôt Github fourni.

3. Une fois vos entités crées, vous devriez avoir l'arborescence suivante :

```
src/main/java/esgi.fyc.sso.authserver/
│
└── controller
|   └── ...
├── model
│   └── AuditLog
│   └── Company
│   └── EmailVerificationToken
│   └── PasswordResetToken
│   └── Plan
│   └── Realm
│   └── Role
│   └── User
│   └── UserRealm
│   └── UserRealmId
│   └── UserRole
│   └── UserRoleId
│   └── UserSession
└── repository
|   └── ...
└── service
|   └── ...
...
```