package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.AuthResponseDTO;
import esgi.fyc.sso.authserver.dto.MessageDTO;
import esgi.fyc.sso.authserver.model.*;
import esgi.fyc.sso.authserver.repository.*;
import esgi.fyc.sso.authserver.form.LoginForm;
import esgi.fyc.sso.authserver.form.RegisterForm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AuthService {

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


    public MessageDTO registerUser(@Valid RegisterForm registerRequest) {
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

    public AuthResponseDTO authenticateUser(LoginForm loginRequest) {
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

    public boolean testUser(String username) {
        return testUser(username, null, null);
    }

    public boolean testUser(String username, String realm) {
        return testUser(username, realm, null);
    }

    public boolean testUser(String username, String realm, String clientId) {
        if (username == null || username.isBlank()) return false;
        System.out.println("Testing user '" + username + "' for realm '" + realm + "' and clientId '" + clientId + "'");

        if (!"security-admin-console".equals(clientId)) {
            return userRepository.existsByUsername(username);
        }

        Optional<User> opt = userRepository.findByUsername(username);
        if (opt.isEmpty()) return false;
        User user = opt.get();
        System.out.println("Found user: " + user);

        if (realm != null && !realm.isBlank()) {
            try {
                java.lang.reflect.Method m = user.getClass().getMethod("getRealm");
                Object realmValue = m.invoke(user);
                if (realmValue == null) return false;
                if (!realm.equals(realmValue.toString())) return false;
            } catch (NoSuchMethodException e) {
            } catch (Exception e) {
                return false;
            }
        }

        Set<String> names = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return names.contains("ADMIN") || names.contains("SUPER_ADMIN") || names.contains("REALM_ADMIN");
    }
}