# Créer les repositories

## Vidéo explicative
<iframe width="640" height="360" src="https://www.youtube.com/embed/FQdlTMZqhTo" frameborder="0" allowfullscreen></iframe>

## 1. Créer les repositories

1. Créer les repositories pour chaque entité de l'application. Pensez à créer des méthodes pour réaliser des récupérations d'entité par rapport à un id, et des méthodes pour vérifier si une entité existe déjà avec une certaine valeur passée en paramètre (voir exemple dans le cours précédent).
2. Si vous avez des difficultés pour créer ces repositories, consultez le dépôt Github fourni.
3. Une fois vos repositories créés, vous devriez avoir l'arborescence suivante :

```
src/main/java/esgi.fyc.sso.authserver/
│
└── controller
|   └── ...
│└── model
|   └── ...
└── repository
│   └── AuditLogRepository
│   └── CompanyRepository
│   └── EmailVerificationTokenRepository
│   └── PasswordResetTokenRepository
│   └── PlanRepository
│   └── RealmRepository
│   └── RoleRepository
│   └── UserRepository
│   └── UserRealmRepository
│   └── UserRealmIdRepository
│   └── UserRoleRepository
│   └── UserRoleIdRepository
│   └── UserSessionRepository
└── service
|   └── ...
...
```