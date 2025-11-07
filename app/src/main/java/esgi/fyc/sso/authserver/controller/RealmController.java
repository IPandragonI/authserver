package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.RealmDTO;
import esgi.fyc.sso.authserver.service.RealmService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/realms")
public class RealmController {

    private final RealmService realmService;

    public RealmController(RealmService realmService) {
        this.realmService = realmService;
    }

    // Get all realms
    @GetMapping
    public ResponseEntity<List<RealmDTO>> getAllRealms() {
        List<RealmDTO> realms = realmService.getAllRealms();
        if (realms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(realms);
    }

    // Get realm by ID
    @GetMapping("/{id}")
    public ResponseEntity<RealmDTO> getRealmById(@PathVariable Integer id) {
        RealmDTO realm = realmService.getRealmById(id);
        if (realm == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return ResponseEntity.ok(realm);
    }

    // Create a new realm
    @PostMapping
    public ResponseEntity<?> createRealm(@RequestBody RealmDTO dto) {
        RealmDTO created = realmService.createRealm(dto);
        if (created == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create realm.");
        }
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Update an existing realm
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRealm(@PathVariable Integer id, @RequestBody RealmDTO dto) {
        RealmDTO updated = realmService.updateRealm(id, dto);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Realm not found or failed to update.");
        }
        return ResponseEntity.ok(updated);
    }

    // Delete a realm
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRealm(@PathVariable Integer id) {
        boolean deleted = realmService.deleteRealm(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Realm not found or failed to delete.");
        }
        return ResponseEntity.noContent().build();
    }
}
