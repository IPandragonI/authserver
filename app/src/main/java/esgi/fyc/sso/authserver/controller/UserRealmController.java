package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.UserRealmDTO;
import esgi.fyc.sso.authserver.service.UserRealmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-realms")
public class UserRealmController {

    private final UserRealmService userRealmService;

    public UserRealmController(UserRealmService userRealmService) {
        this.userRealmService = userRealmService;
    }

    @GetMapping
    public ResponseEntity<List<UserRealmDTO>> getAllUserRealms() {
        List<UserRealmDTO> userRealms = userRealmService.getAllUserRealms();
        return ResponseEntity.ok(userRealms);
    }

    @GetMapping("/user/{userId}/realm/{realmId}")
    public ResponseEntity<UserRealmDTO> getUserRealm(@PathVariable Integer userId,
                                                     @PathVariable Integer realmId) {
        try {
            return userRealmService.getUserRealm(userId, realmId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error retrieving UserRealm: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<UserRealmDTO> createUserRealm(@RequestBody UserRealmDTO dto) {
        try {
            UserRealmDTO created = userRealmService.createUserRealm(dto);
            if (created == null) {
                return ResponseEntity.internalServerError().build();
            }
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            System.err.println("Error creating UserRealm: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<UserRealmDTO> updateUserRealm(@RequestBody UserRealmDTO dto) {
        try {
            UserRealmDTO updated = userRealmService.updateUserRealm(dto);
            if (updated == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            System.err.println("Error updating UserRealm: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/user/{userId}/realm/{realmId}")
    public ResponseEntity<Void> deleteUserRealm(@PathVariable Integer userId,
                                                @PathVariable Integer realmId) {
        try {
            boolean deleted = userRealmService.deleteUserRealm(userId, realmId);
            if (!deleted) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.err.println("Error deleting UserRealm: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserRealmDTO>> getUserRealmsByUser(@PathVariable Integer userId) {
        try {
            List<UserRealmDTO> userRealms = userRealmService.getUserRealmsByUser(userId);
            return ResponseEntity.ok(userRealms);
        } catch (Exception e) {
            System.err.println("Error retrieving UserRealms for userId=" + userId + ": " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/realm/{realmId}")
    public ResponseEntity<List<UserRealmDTO>> getUserRealmsByRealm(@PathVariable Integer realmId) {
        try {
            List<UserRealmDTO> userRealms = userRealmService.getUserRealmsByRealm(realmId);
            return ResponseEntity.ok(userRealms);
        } catch (Exception e) {
            System.err.println("Error retrieving UserRealms for realmId=" + realmId + ": " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
