package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.UserRoleDTO;
import esgi.fyc.sso.authserver.mapper.UserRoleMapper;
import esgi.fyc.sso.authserver.model.Role;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.model.UserRole;
import esgi.fyc.sso.authserver.model.UserRoleId;
import esgi.fyc.sso.authserver.repository.RoleRepository;
import esgi.fyc.sso.authserver.repository.UserRepository;
import esgi.fyc.sso.authserver.repository.UserRoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserRoleService {

    private final UserRoleRepository userRoleRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleMapper userRoleMapper;

    public UserRoleService(UserRoleRepository userRoleRepository,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           UserRoleMapper userRoleMapper) {
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleMapper = userRoleMapper;
    }

    public UserRoleDTO assignRoleToUser(Integer userId, Integer roleId) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            Optional<Role> roleOpt = roleRepository.findById(roleId);

            if (userOpt.isEmpty() || roleOpt.isEmpty()) {
                System.err.println("User or Role not found for assignment: userId=" + userId + ", roleId=" + roleId);
                return null;
            }

            User user = userOpt.get();
            Role role = roleOpt.get();

            if (userRoleRepository.existsByUserAndRole(user, role)) {
                System.err.println("User already has this role: userId=" + userId + ", roleId=" + roleId);
                return null;
            }

            UserRole userRole = new UserRole(role, user, LocalDateTime.now());
            UserRoleId id = new UserRoleId(role.getId(), user.getId());
            userRole.setId(id);

            UserRole saved = userRoleRepository.save(userRole);
            return userRoleMapper.toDto(saved);
        } catch (Exception e) {
            System.err.println("Error while assigning role: " + e.getMessage());
            return null;
        }
    }

    public boolean removeRoleFromUser(Integer userId, Integer roleId) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            Optional<Role> roleOpt = roleRepository.findById(roleId);

            if (userOpt.isEmpty() || roleOpt.isEmpty()) {
                System.err.println("User or Role not found for removal: userId=" + userId + ", roleId=" + roleId);
                return false;
            }

            User user = userOpt.get();
            Role role = roleOpt.get();

            userRoleRepository.findByUser(user).stream()
                    .filter(ur -> ur.getRole().equals(role))
                    .findFirst()
                    .ifPresent(userRoleRepository::delete);

            return true;
        } catch (Exception e) {
            System.err.println("Error while removing role: " + e.getMessage());
            return false;
        }
    }

    @Transactional(readOnly = true)
    public List<UserRoleDTO> getRolesByUser(Integer userId) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                System.err.println("User not found when retrieving roles: userId=" + userId);
                return Collections.emptyList();
            }

            return userRoleRepository.findByUser(userOpt.get()).stream()
                    .map(userRoleMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error while retrieving roles: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    @Transactional(readOnly = true)
    public List<UserRoleDTO> getUsersByRole(Integer roleId) {
        try {
            Optional<Role> roleOpt = roleRepository.findById(roleId);
            if (roleOpt.isEmpty()) {
                System.err.println("Role not found when retrieving users: roleId=" + roleId);
                return Collections.emptyList();
            }

            return userRoleRepository.findByRole(roleOpt.get()).stream()
                    .map(userRoleMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error while retrieving users by role: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    @Transactional(readOnly = true)
    public boolean userHasRole(Integer userId, Integer roleId) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            Optional<Role> roleOpt = roleRepository.findById(roleId);

            if (userOpt.isEmpty() || roleOpt.isEmpty()) {
                return false;
            }

            return userRoleRepository.existsByUserAndRole(userOpt.get(), roleOpt.get());
        } catch (Exception e) {
            System.err.println("Error while checking user role: " + e.getMessage());
            return false;
        }
    }
}
