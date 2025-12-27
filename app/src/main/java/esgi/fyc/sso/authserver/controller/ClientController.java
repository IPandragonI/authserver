package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.ClientDTO;
import esgi.fyc.sso.authserver.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<ClientDTO> clients = clientService.getAllClients();
        if (clients.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Integer id) {
        ClientDTO client = clientService.getClientById(id);
        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(client);
    }

    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody ClientDTO dto) {
        ClientDTO created = clientService.createClient(dto);
        if (created == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create client.");
        }
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClient(@PathVariable Integer id, @RequestBody ClientDTO dto) {
        ClientDTO updated = clientService.updateClient(id, dto);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found or failed to update.");
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Integer id) {
        boolean deleted = clientService.deleteClient(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found or failed to delete.");
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<ClientDTO>> getClientsByCompany(@PathVariable Integer companyId) {
        List<ClientDTO> clients = clientService.getClientsByCompany(companyId);
        if (clients.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/realm/{realmId}")
    public ResponseEntity<List<ClientDTO>> getClientsByRealm(@PathVariable Integer realmId) {
        List<ClientDTO> clients = clientService.getClientsByRealm(realmId);
        if (clients.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(clients);
    }
}

