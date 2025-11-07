package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.AuditLogDTO;
import esgi.fyc.sso.authserver.service.AuditLogService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    // Uniform response structure
    record ApiResponse<T>(String message, T data) {}

    // Récupérer tous les logs
    @GetMapping
    public ResponseEntity<ApiResponse<List<AuditLogDTO>>> getAllLogs() {
        try {
            List<AuditLogDTO> logs = auditLogService.getAllLogs();
            return ResponseEntity.ok(new ApiResponse<>("Logs retrieved successfully", logs));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Failed to retrieve logs: " + e.getMessage(), null));
        }
    }

    // Récupérer un log par son id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AuditLogDTO>> getLogById(@PathVariable Integer id) {
        try {
            Optional<AuditLogDTO> dtoOpt = auditLogService.getLogById(id);
            return dtoOpt
                    .map(dto -> ResponseEntity.ok(new ApiResponse<>("Log found", dto)))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse<>("Log not found", null)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Failed to retrieve log: " + e.getMessage(), null));
        }
    }

    // Créer un nouveau log
    @PostMapping
    public ResponseEntity<ApiResponse<AuditLogDTO>> createLog(@Valid @RequestBody AuditLogDTO dto) {
        try {
            AuditLogDTO created = auditLogService.createLog(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>("Log created successfully", created));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>("Failed to create log: " + e.getMessage(), null));
        }
    }

    // Mettre à jour un log existant
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AuditLogDTO>> updateLog(@PathVariable Integer id, @Valid @RequestBody AuditLogDTO dto) {
        try {
            Optional<AuditLogDTO> updatedOpt = auditLogService.updateLog(id, dto);
            return updatedOpt
                    .map(updated -> ResponseEntity.ok(new ApiResponse<>("Log updated successfully", updated)))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponse<>("Log not found", null)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>("Failed to update log: " + e.getMessage(), null));
        }
    }

    // Supprimer un log
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLog(@PathVariable Integer id) {
        try {
            boolean deleted = auditLogService.deleteLog(id);
            if (deleted) {
                return ResponseEntity.ok(new ApiResponse<>("Log deleted successfully", null));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>("Log not found", null));
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Failed to delete log: " + e.getMessage(), null));
        }
    }

    // Récupérer tous les logs d'un utilisateur
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<AuditLogDTO>>> getLogsByUser(@PathVariable Integer userId) {
        try {
            List<AuditLogDTO> logs = auditLogService.getLogsByUser(userId);
            return ResponseEntity.ok(new ApiResponse<>("Logs retrieved successfully", logs));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Failed to retrieve logs for user: " + e.getMessage(), null));
        }
    }

    // Récupérer tous les logs d'un realm
    @GetMapping("/realm/{realmId}")
    public ResponseEntity<ApiResponse<List<AuditLogDTO>>> getLogsByRealm(@PathVariable Integer realmId) {
        try {
            List<AuditLogDTO> logs = auditLogService.getLogsByRealm(realmId);
            return ResponseEntity.ok(new ApiResponse<>("Logs retrieved successfully", logs));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Failed to retrieve logs for realm: " + e.getMessage(), null));
        }
    }

    // Récupérer tous les logs d'un utilisateur dans un realm
    @GetMapping("/user/{userId}/realm/{realmId}")
    public ResponseEntity<ApiResponse<List<AuditLogDTO>>> getLogsByUserAndRealm(@PathVariable Integer userId, @PathVariable Integer realmId) {
        try {
            List<AuditLogDTO> logs = auditLogService.getLogsByUserAndRealm(userId, realmId);
            return ResponseEntity.ok(new ApiResponse<>("Logs retrieved successfully", logs));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Failed to retrieve logs for user and realm: " + e.getMessage(), null));
        }
    }
}
