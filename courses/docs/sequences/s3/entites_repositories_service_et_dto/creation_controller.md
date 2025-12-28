# Création des controllers

## Vidéo explicative

(à ajouter)

## 1. Créer les controllers

1. Pour chaque entité avec laquelle on peut interagir dans l'application, créer un controller qui lui correspond. Attention de bien mapper les différentes routes selon les normes expliquées (voir cours précédent).
2. Si vous avez des difficultés pour créer ces controllers, consultez le dépôt Github fourni.
3. Une fois vos controllers créés, vous devez avoir l'arborescence suivante :

```
src/main/java/esgi.fyc.sso.authserver/
│
└── controller
│   └── AuditLogController
│   └── ClientController
│   └── CompanyController
│   └── PlanController
│   └── RealmController
│   └── RoleController
│   └── UserController
│   └── UserRealmController
│   └── UserRoleController
│   └── UserSessionController
└── dto
|   └── ...
└── mapper
|   └── ...
└── model
|   └── ...
...
```