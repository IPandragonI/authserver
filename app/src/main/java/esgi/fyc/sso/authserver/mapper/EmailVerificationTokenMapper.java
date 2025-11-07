package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.EmailVerificationTokenDTO;
import esgi.fyc.sso.authserver.model.EmailVerificationToken;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EmailVerificationTokenMapper {

    private final UserRepository userRepository;

    public EmailVerificationTokenMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public EmailVerificationTokenDTO toDto(EmailVerificationToken token) {
        if (token == null) {
            return null;
        }

        EmailVerificationTokenDTO dto = new EmailVerificationTokenDTO();
        User user = token.getUser();

        dto.setId(token.getId());
        dto.setToken(token.getToken());
        dto.setExpiresAt(token.getExpiresAt());
        dto.setUsed(token.getUsed());
        dto.setCreatedAt(token.getCreatedAt());
        dto.setUpdatedAt(token.getUpdatedAt());
        dto.setUserId(user != null ? user.getId() : null);

        return dto;
    }

    public EmailVerificationToken toEntity(EmailVerificationTokenDTO dto) {
        if (dto == null) {
            return null;
        }

        EmailVerificationToken token = new EmailVerificationToken();

        token.setId(dto.getId());
        token.setToken(dto.getToken());
        token.setExpiresAt(dto.getExpiresAt());
        token.setUsed(dto.getUsed());
        token.setCreatedAt(dto.getCreatedAt());
        token.setUpdatedAt(dto.getUpdatedAt());

        if (dto.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(dto.getUserId());
            userOpt.ifPresent(token::setUser);
        }

        return token;
    }
}
