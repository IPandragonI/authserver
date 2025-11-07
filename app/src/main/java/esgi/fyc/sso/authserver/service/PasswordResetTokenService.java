package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.PasswordResetTokenDTO;
import esgi.fyc.sso.authserver.mapper.PasswordResetTokenMapper;
import esgi.fyc.sso.authserver.model.PasswordResetToken;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.repository.PasswordResetTokenRepository;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordResetTokenMapper tokenMapper;
    private final UserRepository userRepository;

    public PasswordResetTokenService(PasswordResetTokenRepository tokenRepository,
                                     PasswordResetTokenMapper tokenMapper,
                                     UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.tokenMapper = tokenMapper;
        this.userRepository = userRepository;
    }

    // Create a token for a user
    @Transactional
    public PasswordResetTokenDTO createToken(Integer userId, int expirationMinutes) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                throw new IllegalArgumentException("User not found with ID: " + userId);
            }

            User user = userOpt.get();
            String tokenValue = UUID.randomUUID().toString();
            LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(expirationMinutes);

            PasswordResetToken token = new PasswordResetToken(tokenValue, expiresAt, false, user);
            PasswordResetToken savedToken = tokenRepository.save(token);

            return tokenMapper.toDto(savedToken);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error creating password reset token: " + e.getMessage(), e);
        }
    }

    // Validate a token (not used and not expired)
    @Transactional
    public boolean validateToken(String tokenValue) {
        try {
            Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(tokenValue);
            if (tokenOpt.isEmpty()) {
                return false;
            }

            PasswordResetToken token = tokenOpt.get();

            if (token.getUsed() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
                return false;
            }

            token.setUsed(true);
            tokenRepository.save(token);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error validating password reset token: " + e.getMessage(), e);
        }
    }

    // Clean expired or used tokens
    @Transactional
    public void cleanExpiredOrUsedTokens() {
        try {
            LocalDateTime now = LocalDateTime.now();
            tokenRepository.findAll().stream()
                    .filter(t -> t.getUsed() || t.getExpiresAt().isBefore(now))
                    .forEach(tokenRepository::delete);
        } catch (Exception e) {
            throw new RuntimeException("Error cleaning password reset tokens: " + e.getMessage(), e);
        }
    }

    // Retrieve a token DTO by its value
    public Optional<PasswordResetTokenDTO> getTokenDTO(String tokenValue) {
        try {
            return tokenRepository.findByToken(tokenValue)
                    .map(tokenMapper::toDto);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving password reset token: " + e.getMessage(), e);
        }
    }

    // Retrieve a token by ID
    public Optional<PasswordResetTokenDTO> getTokenById(Integer id) {
        try {
            return tokenRepository.findById(id)
                    .map(tokenMapper::toDto);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving password reset token by ID: " + e.getMessage(), e);
        }
    }

    // Retrieve all tokens
    public List<PasswordResetTokenDTO> getAllTokens() {
        try {
            return tokenRepository.findAll().stream()
                    .map(tokenMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all password reset tokens: " + e.getMessage(), e);
        }
    }

    // Delete a token by ID
    @Transactional
    public void deleteToken(Integer id) {
        try {
            if (!tokenRepository.existsById(id)) {
                throw new IllegalArgumentException("Password reset token not found with ID: " + id);
            }
            tokenRepository.deleteById(id);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting password reset token: " + e.getMessage(), e);
        }
    }
}
