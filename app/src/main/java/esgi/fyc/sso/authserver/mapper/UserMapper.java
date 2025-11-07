package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.UserDTO;
import esgi.fyc.sso.authserver.model.Company;
import esgi.fyc.sso.authserver.model.Role;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.repository.CompanyRepository;
import esgi.fyc.sso.authserver.repository.RoleRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserMapper {

    private final CompanyRepository companyRepository;
    private final RoleRepository roleRepository;

    public UserMapper(CompanyRepository companyRepository, RoleRepository roleRepository) {
        this.companyRepository = companyRepository;
        this.roleRepository = roleRepository;
    }

    public UserDTO toDto(User user) {
        if (user == null) {
            return null;
        }
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setEnabled(user.getEnabled());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setPassword(user.getPassword());
        dto.setVerifiedAt(user.getVerifiedAt());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        if (user.getCompany() != null) {
            dto.setCompanyId(user.getCompany().getId());
        }
        if (user.getRole() != null) {
            dto.setRoleId(user.getRole().getId());
        }

        return dto;
    }

    public User toEntity(UserDTO dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setEnabled(dto.getEnabled());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setPassword(dto.getPassword());
        user.setVerifiedAt(dto.getVerifiedAt());
        user.setCreatedAt(dto.getCreatedAt());
        user.setUpdatedAt(dto.getUpdatedAt());

        if (dto.getCompanyId() != null) {
            Optional<Company> company = companyRepository.findById(dto.getCompanyId());
            user.setCompany(company.orElse(null));
        }

        if (dto.getRoleId() != null) {
            Optional<Role> role = roleRepository.findById(dto.getRoleId());
            user.setRole(role.orElse(null));
        }

        return user;
    }
}
