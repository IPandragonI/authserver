package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.RoleDTO;
import esgi.fyc.sso.authserver.mapper.RoleMapper;
import esgi.fyc.sso.authserver.model.Role;
import esgi.fyc.sso.authserver.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleService(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    public RoleDTO createRole(RoleDTO dto) {
        try {
            if (roleRepository.existsByName(dto.getName())) {
                throw new IllegalArgumentException("Role already exists: " + dto.getName());
            }

            Role role = roleMapper.toEntity(dto);
            Role saved = roleRepository.save(role);
            return roleMapper.toDto(saved);
        } catch (Exception e) {
            // Log exception if needed
            System.err.println("Error creating role: " + e.getMessage());
            return null;
        }
    }

    public List<RoleDTO> getAllRoles() {
        try {
            return roleRepository.findAll()
                    .stream()
                    .map(roleMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error fetching all roles: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public RoleDTO getRoleById(Integer id) {
        try {
            Optional<Role> roleOpt = roleRepository.findById(id);
            return roleOpt.map(roleMapper::toDto).orElse(null);
        } catch (Exception e) {
            System.err.println("Error fetching role by id " + id + ": " + e.getMessage());
            return null;
        }
    }

    public RoleDTO getRoleByName(String name) {
        try {
            Optional<Role> roleOpt = roleRepository.findByName(name);
            return roleOpt.map(roleMapper::toDto).orElse(null);
        } catch (Exception e) {
            System.err.println("Error fetching role by name " + name + ": " + e.getMessage());
            return null;
        }
    }

    public RoleDTO updateRole(Integer id, RoleDTO dto) {
        try {
            Role existing = roleRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Role not found with id " + id));

            if (!existing.getName().equals(dto.getName()) && roleRepository.existsByName(dto.getName())) {
                throw new IllegalArgumentException("Another role already exists with name: " + dto.getName());
            }

            existing.setName(dto.getName());
            existing.setDescription(dto.getDescription());

            Role updated = roleRepository.save(existing);
            return roleMapper.toDto(updated);
        } catch (Exception e) {
            System.err.println("Error updating role with id " + id + ": " + e.getMessage());
            return null;
        }
    }

    public boolean deleteRole(Integer id) {
        try {
            if (!roleRepository.existsById(id)) {
                return false;
            }
            roleRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.err.println("Error deleting role with id " + id + ": " + e.getMessage());
            return false;
        }
    }
}
