# Création du controller d'authentification

Dans le dossier `controller`, créer une nouvelle classe `AuthController` avec l'annotation `@RestController` et le mapping de base `/api/auth`.
De plus, ajouter l'annotation `@CrossOrigin` pour permettre les requêtes cross-origin avec pour valeur `origins = "*", maxAge = 3600`.

## Attributs

```java
@Autowired
private AuthService authService;
```

De toute évidence, nous avons besoin d'injecter le service d'authentification que nous avons créé précédemment.

## Endpoints

```java
@PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            MessageDTO response = authService.registerUser(registerRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageDTO("Erreur: " + e.getMessage()));
        }
    }

    @PostMapping("/login/{realm}")
    public ResponseEntity<?> loginPost(
            @PathVariable String realm,
            @RequestParam(value = "client_id", required = false) String clientId,
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {

        logger.info("POST /api/auth/login/{} from {} - client_id='{}' - username='{}'",
                realm,
                request.getRemoteAddr(),
                clientId,
                loginRequest.getUsername());

        try {
            AuthResponseDTO authResponse = authService.authenticateUser(loginRequest);

            if ("security-admin-console".equals(clientId)) {
                boolean allowed = authService.testUser(loginRequest.getUsername(), realm, clientId);
                if (!allowed) {
                    return ResponseEntity
                            .status(HttpStatus.FORBIDDEN)
                            .body(new MessageDTO("Utilisateur non autorisé pour ce realm/client"));
                }
            }

            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageDTO("Authentification échouée: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageDTO("Authentification échouée"));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        try {
            AuthResponseDTO response = authService.refreshToken(request.getRefreshToken());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageDTO("Erreur: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        try {
            authService.logout();
            return ResponseEntity.ok(new MessageDTO("Déconnexion réussie"));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageDTO("Erreur lors de la déconnexion"));
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            boolean isValid = authService.validateToken(jwt);
            if (isValid) {
                return ResponseEntity.ok(new MessageDTO("Token valide"));
            } else {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new MessageDTO("Token invalide"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageDTO("Token invalide"));
        }
    }
```

### Explications

#### registerUser
Gère les requêtes POST à `/api/auth/register` pour l'enregistrement des utilisateurs. Il utilise le service d'authentification pour créer un nouvel utilisateur et retourne un message de succès ou d'erreur.

#### loginPost
Gère les requêtes POST à `/api/auth/login/{realm}` pour l'authentification des utilisateurs. Il prend en compte le `realm` et un `client_id` optionnel. Après authentification, il retourne les tokens JWT et de rafraîchissement, ou un message d'erreur.

#### refreshToken
Gère les requêtes POST à `/api/auth/refresh-token` pour rafraîchir le token JWT en utilisant un token de rafraîchissement valide. Il retourne les nouveaux tokens ou un message d'erreur.

#### logout
Gère les requêtes POST à `/api/auth/logout` pour déconnecter l'utilisateur en effaçant le contexte de sécurité. Il retourne un message de succès ou d'erreur.

#### validateToken
Gère les requêtes GET à `/api/auth/validate-token` pour valider un token JWT. Il extrait le token de l'en-tête `Authorization`, vérifie sa validité et retourne un message indiquant si le token est valide ou non.

## Conclusion

Si vous avez bien suivi toutes les étapes de ce cours, vous devriez maintenant avoir un controller d'authentification complet qui gère l'enregistrement, la connexion, le rafraîchissement des tokens, la déconnexion et la validation des tokens JWT. 

Vous pouvez maintenant tester ces endpoints avec des outils comme Postman ou curl pour vous assurer qu'ils fonctionnent correctement.