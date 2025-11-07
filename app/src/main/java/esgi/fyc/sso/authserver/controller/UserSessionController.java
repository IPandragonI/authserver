package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.UserSessionDTO;
import esgi.fyc.sso.authserver.service.UserSessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class UserSessionController {

    private final UserSessionService userSessionService;

    public UserSessionController(UserSessionService userSessionService) {
        this.userSessionService = userSessionService;
    }

    // Get all sessions
    @GetMapping
    public ResponseEntity<List<UserSessionDTO>> getAllSessions() {
        try {
            List<UserSessionDTO> sessions = userSessionService.getAllSessions();
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            System.err.println("Failed to get all sessions: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get a session by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserSessionDTO> getSessionById(@PathVariable Integer id) {
        try {
            return userSessionService.getSessionById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Failed to get session by ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get a session by token
    @GetMapping("/token/{token}")
    public ResponseEntity<UserSessionDTO> getSessionByToken(@PathVariable String token) {
        try {
            return userSessionService.getSessionByToken(token)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Failed to get session by token " + token + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all sessions of a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserSessionDTO>> getSessionsByUser(@PathVariable Integer userId) {
        try {
            List<UserSessionDTO> sessions = userSessionService.getSessionsByUserId(userId);
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            System.err.println("Failed to get sessions for user " + userId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Create or update a session
    @PostMapping
    public ResponseEntity<UserSessionDTO> saveSession(@RequestBody UserSessionDTO dto) {
        try {
            UserSessionDTO saved = userSessionService.saveSession(dto);
            if (saved != null) {
                return new ResponseEntity<>(saved, HttpStatus.CREATED);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e) {
            System.err.println("Failed to save session: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete a session by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Integer id) {
        try {
            boolean deleted = userSessionService.deleteSession(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Failed to delete session " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all active sessions (non-revoked)
    @GetMapping("/active")
    public ResponseEntity<List<UserSessionDTO>> getActiveSessions() {
        try {
            List<UserSessionDTO> sessions = userSessionService.getActiveSessions();
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            System.err.println("Failed to get active sessions: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all expired sessions
    @GetMapping("/expired")
    public ResponseEntity<List<UserSessionDTO>> getExpiredSessions() {
        try {
            List<UserSessionDTO> sessions = userSessionService.getExpiredSessions();
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            System.err.println("Failed to get expired sessions: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
