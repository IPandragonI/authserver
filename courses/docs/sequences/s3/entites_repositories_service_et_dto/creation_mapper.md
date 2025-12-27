# Création des mappers

## Vidéo explicative
(à ajouter)

## 1. Créer les mappers

1. Pour chaque entité & DTO de l'application, créer un mapper qui lui correspond. Attention de bien définir le mapper selon les normes expliquées (voir cours précédent).
2. Si vous avez des difficultés pour créer ces mappers, consultez le dépôt Github fourni.
3. Une fois vos mappers créés, vous devriez avoir l'arborescence suivante :

```
src/main/java/esgi.fyc.sso.authserver/
│
└── mappers
│   └── AuditLogMapper
│   └── ClientMapper
│   └── CompanyMapper
│   └── PlanMapper
│   └── RealmMapper
│   └── RoleMapper
│   └── UserMapper
│   └── UserRealmMapper
│   └── UserRoleMapper
│   └── UserSessionMapper
└── model
|   └── ...
└── repository
|   └── ...
└── service
|   └── ...
...
```