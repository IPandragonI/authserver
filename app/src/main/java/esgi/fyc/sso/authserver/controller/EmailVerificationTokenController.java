package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.EmailVerificationTokenDTO;
import esgi.fyc.sso.authserver.service.EmailVerificationTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email-tokens")
public class EmailVerificationTokenController {

    private final EmailVerificationTokenService tokenService;

    public EmailVerificationTokenController(EmailVerificationTokenService tokenService) {
        this.tokenService = tokenService;
    }

    // Création d'un token pour un utilisateur
    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createToken(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "60") int expirationMinutes) {
        try {
            EmailVerificationTokenDTO tokenDTO = tokenService.createToken(userId, expirationMinutes);
            return ResponseEntity.ok(tokenDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création du token: " + e.getMessage());
        }
    }

    // Validation d'un token
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        try {
            boolean valid = tokenService.validateToken(token);
            if (valid) {
                return ResponseEntity.ok("Token validated successfully.");
            } else {
                return ResponseEntity.badRequest().body("Invalid or expired token.");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when retrieving token: " + e.getMessage());
        }
    }

    // Récupération d'un token DTO
    @GetMapping("/{token}")
    public ResponseEntity<?> getToken(@PathVariable String token) {
        try {
            return tokenService.getTokenDTO(token)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when retrieving token: " + e.getMessage());
        }
    }

    // Nettoyage manuel des tokens expirés ou utilisés
    @DeleteMapping("/clean")
    public ResponseEntity<?> cleanTokens() {
        try {
            tokenService.cleanExpiredOrUsedTokens();
            return ResponseEntity.ok("Expired and used token cleaned.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when cleaning tokens: " + e.getMessage());
        }
    }
}
