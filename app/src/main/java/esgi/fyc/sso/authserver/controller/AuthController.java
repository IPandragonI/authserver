package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.AuthResponseDTO;
import esgi.fyc.sso.authserver.dto.MessageDTO;
import esgi.fyc.sso.authserver.dto.UserRealmDTO;
import esgi.fyc.sso.authserver.model.Realm;
import esgi.fyc.sso.authserver.service.AuthService;
import esgi.fyc.sso.authserver.form.LoginForm;
import esgi.fyc.sso.authserver.form.RefreshTokenForm;
import esgi.fyc.sso.authserver.form.RegisterForm;
import esgi.fyc.sso.authserver.service.RealmService;
import esgi.fyc.sso.authserver.service.UserRealmService;
import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;
    @Autowired
    private RealmService realmService;
    @Autowired
    private UserRealmService userRealmService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterForm registerRequest) {
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
            @Valid @RequestBody LoginForm loginRequest,
            HttpServletRequest request) {

        logger.info("POST /api/auth/login/{} from {} - client_id='{}' - username='{}'",
                realm,
                request.getRemoteAddr(),
                clientId,
                loginRequest.getUsername());

        try {
            boolean allowed = authService.testUser(loginRequest.getUsername(), realm, clientId);
            if (!allowed) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageDTO("Utilisateur non autorisé pour ce realm/client"));
            }
            AuthResponseDTO authResponse = authService.authenticateUser(loginRequest);

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
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenForm request) {
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
}