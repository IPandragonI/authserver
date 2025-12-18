# Configuration des token JWT

## État du code

Arborescence

```
src/main/
├── java
│   └── com.authserver
│       └── controller
│       └── dto
│       └── mapper
│       └── model
│       └── repository
│       └── service
|    └── resources
│       └── db.changelog
|           └── 1.0
│               └── 001.xml
│           └── fycsso-changelog.xml
|       └── static
|          └── bdd_initialization.sql
│       └── templates
│       └── application.properties
```

## Gestion des token JWT

Afin de gérer l'authentification stateless de notre application, nous allons utiliser des JSON Web Tokens (JWT). 

Les tokens JWT permettent de transmettre des informations sécurisées entre le client et le serveur sous forme de JSON. Ils sont signés numériquement pour garantir leur intégrité et peuvent être vérifiés par le serveur sans avoir besoin de stocker une session.

Ainsi, chaque requête envoyée au serveur doit inclure un token JWT valide dans les en-têtes HTTP. Le serveur peut alors vérifier ce token pour authentifier l'utilisateur et autoriser l'accès aux ressources protégées.

### Création du service JWT

Nous allons créer un service dédié à la gestion des tokens JWT. Ce service sera responsable de la génération, de la validation et de l'extraction des informations contenues dans les tokens.

Dans le dossier `service`, créez une nouvelle classe `JwtService.java` :

#### JwtService.java

```java
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    @Value("${jwt.refresh.expiration:604800000}")
    private Long refreshExpiration;
    
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());
        return createToken(claims, userDetails.getUsername(), expiration);
    }
    
    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "refresh");
        return createToken(claims, userDetails.getUsername(), refreshExpiration);
    }
    
    private String createToken(Map<String, Object> claims, String subject, Long expirationTime) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }
    
    public Boolean validateRefreshToken(String token) {
        try {
            Claims claims = extractAllClaims(token);
            String type = claims.get("type", String.class);
            return "refresh".equals(type) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Long getExpirationTime() {
        return expiration;
    }

    public Long getRefreshExpirationTime() {
        return refreshExpiration;
    }
}
```

//TODO: Continuer