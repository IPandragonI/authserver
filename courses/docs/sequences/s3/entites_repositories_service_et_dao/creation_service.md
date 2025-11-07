# Créer les services

## Vidéo explicative
(à ajouter)

## 1. Créer les services

1. Créer les services pour chaque repository de l'application. Pensez à créer les différentes méthodes que nous pourrons utiliser pour manipuler les données de chaque table de la base de données.
2. Si vous avez des difficultés pour créer ces services, consultez le dépôt Github fourni.
3. Une fois vos services créés, vous devriez avoir l'arborescence suivante :

```
src/main/java/esgi.fyc.sso.authserver/
│
└── controller
|   └── ...
└── model
|   └── ...
└── repository
|   └── ...
└── service
│   └── AuditLogService
│   └── CompanyService
│   └── EmailVerificationTokenService
│   └── PasswordResetTokenService
│   └── PlanService
│   └── RealmService
│   └── RoleService
│   └── UserService
│   └── UserRealmService
│   └── UserRealmIdService
│   └── UserRoleService
│   └── UserRoleIdService
│   └── UserSessionService
...
```
Nous pouvons ensuite passer à la création des DAO.