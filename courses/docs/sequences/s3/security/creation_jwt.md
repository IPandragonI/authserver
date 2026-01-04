# Configuration des token JWT

Nous allons créer un service dédié à la gestion des tokens JWT. Ce service sera responsable de la génération, de la validation et de l'extraction des informations contenues dans les tokens.

Dans le dossier `service`, créez une nouvelle classe `JwtService.java` :

## Attributs

Premièrement, nous allons définir les attributs nécessaires pour la gestion des tokens JWT, tels que le secret de signature et les durées d'expiration.
```java
@Value("${jwt.secret}")
private String secret;

@Value("${jwt.expiration}")
private Long expiration;

@Value("${jwt.refresh.expiration:604800000}")
private Long refreshExpiration;
```

L'annotation `@Value` permet d'injecter les valeurs définies dans le fichier `application.properties`.
Ainsi, pour modifier facilement les paramètres des tokens, vous pouvez ajouter les lignes suivantes dans `application.properties` :

```properties
jwt.secret=VotreCléSecrèteIciBase64Encodée
jwt.expiration=3600000  # 1 heure en millisecondes
jwt.refresh.expiration=604800000  # 7 jours en millisecondes
```

## Méthodes

Nous allons maintenant implémenter les méthodes nécessaires pour générer, valider et extraire les informations des tokens JWT.

```java
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
```

Ici, nous utilisons la bibliothèque `jjwt` dans sa version 13.0 pour manipuler les tokens JWT. Assurez-vous d'ajouter la dépendance suivante dans votre fichier `pom.xml` si ce n'est pas déjà fait :

```xml

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.13.0</version>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.13.0</version>
    <scope>runtime</scope>
</dependency>
```
