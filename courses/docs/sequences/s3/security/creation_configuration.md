# Configuration de Spring Security

Afin de sécuriser notre application, nous allons créer une classe de configuration dédiée à Spring Security.

À la même hauteur que le dossier `controller`, créez un nouveau dossier `config` et à l'intérieur, créez une classe `SpringSecurityConfig.java` :

Comme expliqué dans la préface, le fichier de configuration de Spring Security va définir les règles de sécurité pour notre application, y compris les endpoints accessibles sans authentification et ceux qui nécessitent une authentification.
Dans ce sens, nous allons commencer par écrire les fichiers permettant de filtrer les requêtes HTTP entrantes et de valider les tokens JWT afin d'ensuite les intégrer dans la configuration de Spring Security.

## JwtAuthenticationFilter.java

Cette classe est un component Spring qui va étendre `OncePerRequestFilter` pour s'assurer que le filtre est exécuté une seule fois par requête. Elle va intercepter les requêtes entrantes, extraire le token JWT, le valider et configurer le contexte de sécurité si le token est valide.

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

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
            UserDetails userDetails = this.userService.loadUserByUsername(username);

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

### Explications

#### Attributs
- `JwtService` : Service créé précédemment pour gérer les opérations liées aux tokens JWT, comme l'extraction du nom d'utilisateur et la validation du token.
- `UserService` : Service étendant `UserDetailsService` (classe Spring Security) pour charger les détails de l'utilisateur à partir de la base de données.

#### Méthode `doFilterInternal`

Cette méthode est appelée pour chaque requête HTTP entrante.

- Elle commence par extraire l'en-tête `Authorization` de la requête.
- Si l'en-tête est absent ou ne commence pas par "Bearer ", le filtre passe la requête au filtre suivant dans la chaîne.
- Si un token JWT est présent, il extrait le token en supprimant le préfixe "Bearer ".
- Ensuite, il utilise le `JwtService` pour extraire le nom d'utilisateur du token.
- Si le nom d'utilisateur est valide et qu'aucune authentification n'est encore présente dans le contexte de sécurité, il charge les détails de l'utilisateur à partir du `UserService`.
- Il valide ensuite le token JWT.
- Si le token est valide, il crée un objet `UsernamePasswordAuthenticationToken` avec les détails de l'utilisateur et le définit dans le contexte de sécurité de Spring.
- Enfin, il passe la requête au filtre suivant dans la chaîne.


## CorsConfig

Cette classe de configuration implémente `CorsConfigurationSource` (composant Spring) pour définir les règles CORS (Cross-Origin Resource Sharing) de l'application. Elle permet de spécifier quels domaines sont autorisés à accéder aux ressources de l'API, ainsi que les méthodes HTTP et les en-têtes autorisés.

```java
@Configuration
public class CorsConfig implements CorsConfigurationSource {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:5173"
        ));

        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "X-Requested-With",
                "Accept",
                "Origin",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        configuration.setExposedHeaders(Arrays.asList(
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials",
                "Authorization"
        ));

        configuration.setAllowCredentials(true);

        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Override
    @SuppressWarnings("NullableProblems")
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        return corsConfigurationSource().getCorsConfiguration(request);
    }
}
```

### Explications

#### Méthode `corsConfigurationSource`

Cette méthode crée et configure un objet `CorsConfiguration`.

À cet objet, nous allons ajouter plusieurs règles :

- `setAllowedOrigins`: Définit les origines autorisées à accéder à l'API. Ici, nous autorisons les applications front-end locales exécutées sur les ports 3000 (React) et 5173 (Vite).
- `setAllowedMethods`: Spécifie les méthodes HTTP autorisées pour les requêtes cross-origin (GET, POST, PUT, DELETE, OPTIONS, PATCH).
- `setAllowedHeaders`: Définit les en-têtes HTTP autorisés dans les requêtes cross-origin.
- `setExposedHeaders`: Spécifie les en-têtes qui peuvent être exposés aux clients.
- `setAllowCredentials`: Indique si les cookies et les informations d'authentification sont autorisés dans les requêtes cross-origin.
- `setMaxAge`: Définit la durée pendant laquelle les résultats d'une requête pré-vol peuvent être mis en cache.

Enfin, nous enregistrons cette configuration pour toutes les URL (`/**`) dans un `UrlBasedCorsConfigurationSource`.


## SpringSecurityConfig.java

Une fois le filtre JWT et la configuration CORS créés, nous pouvons maintenant configurer Spring Security pour utiliser ces composants.

```java
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private UserService userService;

    @Autowired
    private CorsConfig corsConfigurationSource;

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
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userService);
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

### Explications
#### Attributs
- `JwtAuthenticationFilter` : Le filtre JWT que nous avons créé précédemment pour intercepter les requêtes et valider les tokens.
- `UserService` : Le service pour charger les détails de l'utilisateur.
- `CorsConfig` : La configuration CORS que nous avons créée précédemment.

#### Méthode `filterChain`
Cette méthode configure la chaîne de filtres de sécurité pour l'application.
Ainsi, pour une requête entrante, elle va :

- Désactiver la protection CSRF (Cross-Site Request Forgery) car nous utilisons des tokens JWT.
- Configurer CORS en utilisant la configuration définie dans `CorsConfig`.
- Définir les règles d'autorisation des requêtes HTTP :
  - Les endpoints `/`, `/api/auth/**`, `/swagger-ui.html`, `/swagger-ui/**`, `/v3/api-docs/**` et `/error` sont accessibles sans authentification.
  - Toutes les autres requêtes nécessitent une authentification.
- Configurer la gestion des sessions pour qu'elle soit sans état (STATELESS), ce qui est approprié pour les applications utilisant des tokens JWT.
- Définir le fournisseur d'authentification en utilisant la méthode `authenticationProvider()`.
- Ajouter le filtre JWT avant le filtre `UsernamePasswordAuthenticationFilter` pour s'assurer que les tokens sont validés avant toute tentative d'authentification.

#### Méthode `authenticationProvider`
Cette méthode crée un `DaoAuthenticationProvider` qui utilise le `UserService` pour charger les détails de l'utilisateur et un `PasswordEncoder` pour encoder les mots de passe.

#### Méthode `passwordEncoder`
Cette méthode crée un `BCryptPasswordEncoder` pour encoder les mots de passe de manière sécurisée.

#### Méthode `authenticationManager`
Cette méthode crée un `AuthenticationManager` en utilisant la configuration d'authentification fournie par Spring.
Celui-ci sera utilisé dans le contrôleur d'authentification pour gérer le processus d'authentification des utilisateurs.