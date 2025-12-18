# Configuration de Spring Security

## État du code

Arborescence

```
src/main/
├── java
│   └── com.authserver
|       └── config
|          └── JwtAuthenticationFilter.java
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


## Gestion de la sécurité avec Spring Security

Nous avons pu voir précédemment comment configurer une base de données avec Hibernate et Liquibase, puis comment structurer notre application selon le modèle MVC avec la mise en place des entités, des repositories, des services et des contrôleurs.

Maintenant, nous allons aborder la configuration de la sécurité de notre application en utilisant Spring Security.

### Configuration de Spring Security

Afin de sécuriser notre application, nous allons créer une classe de configuration dédiée à Spring Security.

À la même hauteur que le dossier `controller`, créez un nouveau dossier `config` et à l'intérieur, créez une classe `SpringSecurityConfig.java` :

Notre application repose sur une authentification stateless via JWT, autrement dit, il n'y a aucune session côté serveur. 
Ainsi, chaque requête doit fournir un token valide.

Voici l’implémentation complète de notre classe de configuration :

#### SpringSecurityConfig.java

```java
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/api/auth/**",
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/error"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

Maintenant, passons en revue les différentes parties de cette configuration.

`@Configuration` : Indique que cette classe contient des configurations Spring.

`@EnableWebSecurity` : Active la sécurité web dans l'application.

`JwtAuthenticationFilter` : Filtre personnalisé pour gérer l'authentification via JWT.

`UserDetailsService` : Service pour charger les détails de l'utilisateur.

`CorsConfigurationSource` : Source de configuration CORS pour gérer les requêtes cross-origin.

---

**Méthode `filterChain`** :

```java
csrf(AbstractHttpConfigurer::disable)
```
   - Désactive la protection CSRF car nous utilisons des tokens JWT.

```java
cors(cors -> cors.configurationSource(corsConfigurationSource))
```
   - Configure CORS avec la source de configuration injectée.

```java
authorizeHttpRequests(auth -> auth
        .requestMatchers(
                "/",
                "/api/auth/**",
                "/swagger-ui.html",
                "/swagger-ui/**",
                "/v3/api-docs/**",
                "/error"
        ).permitAll()
        .anyRequest().authenticated()
)
```
   - Définit les règles d'autorisation des requêtes HTTP :
     - Permet l'accès libre aux endpoints d'authentification, à la documentation Swagger et à la page d'erreur.
     - Exige une authentification pour toutes les autres requêtes.
```java
sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
)
```
   - Configure la gestion des sessions pour être stateless.

```java
.authenticationProvider(authenticationProvider())
```
   - Définit le fournisseur d'authentification.

```java
.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
```
   - Ajoute le filtre JWT avant le filtre d'authentification standard de Spring Security.


### Filtre d'authentification JWT

Le `JwtAuthenticationFilter` intercepte les requêtes entrantes, extrait le token JWT, le valide et configure le contexte de sécurité si le token est valide.

#### JwtAuthenticationFilter.java

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtService.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
```

