package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.PasswordResetTokenDTO;
import esgi.fyc.sso.authserver.service.PasswordResetTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/password-reset-tokens")
public class PasswordResetTokenController {

    private final PasswordResetTokenService service;

    public PasswordResetTokenController(PasswordResetTokenService service) {
        this.service = service;
    }

    // Create a new password reset token for a user
    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createToken(@PathVariable Integer userId,
                                         @RequestParam(defaultValue = "60") int expirationMinutes) {
        try {
            PasswordResetTokenDTO tokenDTO = service.createToken(userId, expirationMinutes);
            return ResponseEntity.ok(tokenDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create password reset token: " + e.getMessage());
        }
    }

    // Get all tokens
    @GetMapping
    public ResponseEntity<?> getAllTokens() {
        try {
            List<PasswordResetTokenDTO> tokens = service.getAllTokens();
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve password reset tokens: " + e.getMessage());
        }
    }


    // Récupération d'un token DTO
    @GetMapping("/{token}")
    public ResponseEntity<?> getToken(@PathVariable String token) {
        try {
            return service.getTokenDTO(token)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when retrieving token: " + e.getMessage());
        }
    }

    // Validate a token (mark as used if valid)
    @PostMapping("/validate/{token}")
    public ResponseEntity<?> validateToken(@PathVariable String token) {
        try {
            boolean isValid = service.validateToken(token);
            if (isValid) {
                return ResponseEntity.ok("Token validated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token is invalid or expired.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to validate token: " + e.getMessage());
        }
    }

    // Delete a token by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteToken(@PathVariable Integer id) {
        try {
            service.deleteToken(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete token: " + e.getMessage());
        }
    }

    // Clean expired or used tokens
    @DeleteMapping("/clean")
    public ResponseEntity<?> cleanTokens() {
        try {
            service.cleanExpiredOrUsedTokens();
            return ResponseEntity.ok("Expired or used tokens have been cleaned successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to clean tokens: " + e.getMessage());
        }
    }
}
