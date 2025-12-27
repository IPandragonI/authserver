# Création des DAO

## Vidéo explicative
<iframe width="640" height="360" src="https://youtu.be/ViZ8PwXG5FM" frameborder="0" allowfullscreen></iframe>

## 1. Créer les DTO

1. Pour chaque entité de l'application, créer un DTO qui lui correspond. Attention de bien définir le DTO selon les normes expliquées (voir cours précédent).
2. Si vous avez des difficultés pour créer ces DTO, consultez le dépôt Github fourni.
3. Une fois vos DTO créés, vous devriez avoir l'arborescence suivante :

```
src/main/java/esgi.fyc.sso.authserver/
│
└── dto
│   └── AuditLogDTO
│   └── CompanyDTO
│   └── EmailVerificationTokenDTO
│   └── PasswordResetTokenDTO
│   └── PlanDTO
│   └── RealmDTO
│   └── RoleDTO
│   └── UserDTO
│   └── UserRealmDTO
│   └── UserRealmIdDTO
│   └── UserRoleDTO
│   └── UserRoleIdDTO
│   └── UserSessionDTO
└── model
|   └── ...
└── repository
|   └── ...
└── service
|   └── ...
...
```

Ensuite, nous allons passer à la création des mappers.