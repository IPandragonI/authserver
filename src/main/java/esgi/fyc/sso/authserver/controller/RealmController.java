package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.entity.Realm;
import esgi.fyc.sso.authserver.service.RealmService;
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

    @GetMapping
    public ResponseEntity<List<Realm>> getAllRealms() {
        return ResponseEntity.ok(realmService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Realm> getRealmById(@PathVariable Long id) {
        return realmService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Realm> createRealm(@RequestBody Realm user) {
        return ResponseEntity.ok(realmService.createRealm(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Realm> updateRealm(@PathVariable Long id, @RequestBody Realm updatedRealm) {
        return ResponseEntity.ok(realmService.updateRealm(id, updatedRealm));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRealm(@PathVariable Long id) {
        realmService.deleteRealm(id);
        return ResponseEntity.noContent().build();
    }
}
