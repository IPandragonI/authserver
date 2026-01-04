# Création du service d’authentification

Dans le dossier `service`, créer une nouvelle classe `AuthService` avec les annotations `@Service` et `@Transactional` :

## Attributs

```java

@Autowired
private AuthenticationManager authenticationManager;

@Autowired
private UserRepository userRepository;

@Autowired
private RoleRepository roleRepository;

@Autowired
private PasswordEncoder passwordEncoder;

@Autowired
private JwtService jwtService;
```

## Méthodes

```java
public MessageDTO registerUser(@Valid RegisterRequest registerRequest) {
    if (userRepository.existsByUsername(registerRequest.getUsername())) {
        throw new RuntimeException("Le nom d'utilisateur existe déjà!");
    }

    if (userRepository.existsByEmail(registerRequest.getEmail())) {
        throw new RuntimeException("L'email existe déjà!");
    }

    User user = new User();
    user.setUsername(registerRequest.getUsername());
    user.setEmail(registerRequest.getEmail());
    user.setCreatedAt(java.time.LocalDateTime.now());
    user.setUpdatedAt(java.time.LocalDateTime.now());
    user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

    Set<Role> roles = new HashSet<>();
    Role userRole = roleRepository.findByName("USER")
            .orElseThrow(() -> new RuntimeException("Erreur: Rôle non trouvé."));
    roles.add(userRole);
    user.setRoles(roles.stream().toList());

    userRepository.save(user);
    return new MessageDTO("Utilisateur enregistré avec succès!");
}

public AuthResponseDTO authenticateUser(LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
            )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String jwt = jwtService.generateToken(userDetails);
    String refreshToken = jwtService.generateRefreshToken(userDetails);

    List<String> roles = user.getRoles().stream()
            .map(Role::getName)
            .collect(Collectors.toList());

    userRepository.save(user);

    return new AuthResponseDTO(
            jwt,
            refreshToken,
            user.getUsername(),
            user.getEmail(),
            roles
    );
}

public AuthResponseDTO refreshToken(String refreshToken) {
    if (!jwtService.validateRefreshToken(refreshToken)) {
        throw new RuntimeException("Refresh token invalide ou expiré");
    }

    String username = jwtService.extractUsername(refreshToken);
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

    UserDetails userDetails = org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())
            .authorities(user.getRoles().stream()
                    .map(role -> "ROLE_" + role.getName())
                    .toArray(String[]::new))
            .build();

    String newJwt = jwtService.generateToken(userDetails);
    String newRefreshToken = jwtService.generateRefreshToken(userDetails);

    List<String> roles = user.getRoles().stream()
            .map(Role::getName)
            .collect(Collectors.toList());

    return new AuthResponseDTO(
            newJwt,
            newRefreshToken,
            user.getUsername(),
            user.getEmail(),
            roles
    );
}

public void logout() {
    SecurityContextHolder.clearContext();
}

public boolean validateToken(String token) {
    try {
        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userRepository.findByUsername(username)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword())
                        .authorities(user.getRoles().stream()
                                .map(role -> "ROLE_" + role.getName())
                                .toArray(String[]::new))
                        .build())
                .orElse(null);

        return userDetails != null && jwtService.validateToken(token, userDetails);
    } catch (Exception e) {
        return false;
    }
}
```

### Explications

#### Méthode `registerUser`

Cette méthode permet d’enregistrer un nouvel utilisateur. Elle vérifie d’abord si le nom d’utilisateur ou l’email existe
déjà dans la base de données. Si ce n’est pas le cas, elle crée un nouvel utilisateur, encode son mot de passe, assigne
le rôle "USER", et sauvegarde l’utilisateur dans la base de données.

#### Méthode `authenticateUser`

Cette méthode gère la connexion des utilisateurs. Elle utilise l’`AuthenticationManager` pour authentifier l’utilisateur
avec le nom d’utilisateur et le mot de passe fournis. Si l’authentification réussit, elle génère un token JWT et un
token de rafraîchissement, puis retourne ces tokens avec les informations de l’utilisateur.

#### Méthode `refreshToken`

Cette méthode permet de rafraîchir le token JWT en utilisant un token de rafraîchissement valide. Elle vérifie d’abord
la validité du token de rafraîchissement, puis génère un nouveau token JWT et un nouveau token de rafraîchissement.

#### Méthode `logout`

Cette méthode gère la déconnexion de l’utilisateur en effaçant le contexte de sécurité.

#### Méthode `validateToken`

Cette méthode valide un token JWT en extrayant le nom d’utilisateur et en vérifiant si le token est valide pour cet
utilisateur.
