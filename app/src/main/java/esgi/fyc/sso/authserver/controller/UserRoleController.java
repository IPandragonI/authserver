package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.UserRoleDTO;
import esgi.fyc.sso.authserver.service.UserRoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-roles")
public class UserRoleController {

    private final UserRoleService userRoleService;

    public UserRoleController(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    /**
     * Assign a role to a user
     */
    @PostMapping("/assign")
    public ResponseEntity<UserRoleDTO> assignRoleToUser(
            @RequestParam Integer userId,
            @RequestParam Integer roleId) {

        UserRoleDTO dto = userRoleService.assignRoleToUser(userId, roleId);
        if (dto == null) {
            // Could be because user/role not found or user already has role
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    /**
     * Remove a role from a user
     */
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeRoleFromUser(
            @RequestParam Integer userId,
            @RequestParam Integer roleId) {

        boolean removed = userRoleService.removeRoleFromUser(userId, roleId);
        if (!removed) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.noContent().build();
    }

    /**
     * Get all roles of a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserRoleDTO>> getRolesByUser(@PathVariable Integer userId) {
        List<UserRoleDTO> roles = userRoleService.getRolesByUser(userId);
        if (roles.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(roles);
    }

    /**
     * Get all users associated with a role
     */
    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<UserRoleDTO>> getUsersByRole(@PathVariable Integer roleId) {
        List<UserRoleDTO> users = userRoleService.getUsersByRole(roleId);
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(users);
    }

    /**
     * Check if a user has a role
     */
    @GetMapping("/check")
    public ResponseEntity<Boolean> userHasRole(
            @RequestParam Integer userId,
            @RequestParam Integer roleId) {

        boolean hasRole = userRoleService.userHasRole(userId, roleId);
        return ResponseEntity.ok(hasRole);
    }
}
