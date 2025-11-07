package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.UserRoleDTO;
import esgi.fyc.sso.authserver.model.*;
import esgi.fyc.sso.authserver.repository.RoleRepository;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserRoleMapper {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserRoleMapper(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public UserRoleDTO toDto(UserRole userRole) {
        if (userRole == null) {
            return null;
        }

        UserRoleDTO dto = new UserRoleDTO();
        User user = userRole.getUser();
        Role role = userRole.getRole();

        dto.setUserId(user != null ? user.getId() : null);
        dto.setRoleId(role != null ? role.getId() : null);
        dto.setAssignedAt(userRole.getAssignedAt());
        dto.setCreatedAt(userRole.getCreatedAt());
        dto.setUpdatedAt(userRole.getUpdatedAt());

        return dto;
    }

    public UserRole toEntity(UserRoleDTO dto) {
        if (dto == null) {
            return null;
        }

        UserRole userRole = new UserRole();
        UserRoleId id = new UserRoleId();

        if (dto.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(dto.getUserId());
            userOpt.ifPresent(userRole::setUser);
            id.setUserId(dto.getUserId());
        }

        if (dto.getRoleId() != null) {
            Optional<Role> roleOpt = roleRepository.findById(dto.getRoleId());
            roleOpt.ifPresent(userRole::setRole);
            id.setRoleId(dto.getRoleId());
        }

        userRole.setId(id);
        userRole.setAssignedAt(dto.getAssignedAt());
        userRole.setCreatedAt(dto.getCreatedAt());
        userRole.setUpdatedAt(dto.getUpdatedAt());

        return userRole;
    }
}
