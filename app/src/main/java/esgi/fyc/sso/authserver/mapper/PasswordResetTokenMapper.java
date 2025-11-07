package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.PasswordResetTokenDTO;
import esgi.fyc.sso.authserver.model.PasswordResetToken;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PasswordResetTokenMapper {

    private final UserRepository userRepository;

    public PasswordResetTokenMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public PasswordResetTokenDTO toDto(PasswordResetToken token) {
        if (token == null) return null;

        PasswordResetTokenDTO dto = new PasswordResetTokenDTO();
        User user = token.getUser();

        dto.setId(token.getId());
        dto.setToken(token.getToken());
        dto.setExpiresAt(token.getExpiresAt());
        dto.setUsed(token.getUsed());
        dto.setUserId(user != null ? user.getId() : null);
        dto.setCreatedAt(token.getCreatedAt());
        dto.setUpdatedAt(token.getUpdatedAt());

        return dto;
    }

    public PasswordResetToken toEntity(PasswordResetTokenDTO dto) {
        if (dto == null) return null;

        PasswordResetToken token = new PasswordResetToken();

        if (dto.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(dto.getUserId());
            userOpt.ifPresent(token::setUser);
        }

        token.setId(dto.getId());
        token.setToken(dto.getToken());
        token.setExpiresAt(dto.getExpiresAt());
        token.setUsed(dto.getUsed());
        token.setCreatedAt(dto.getCreatedAt());
        token.setUpdatedAt(dto.getUpdatedAt());

        return token;
    }
}
