package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.EmailVerificationTokenDTO;
import esgi.fyc.sso.authserver.mapper.EmailVerificationTokenMapper;
import esgi.fyc.sso.authserver.model.EmailVerificationToken;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.repository.EmailVerificationTokenRepository;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmailVerificationTokenService {

    private final EmailVerificationTokenRepository tokenRepository;
    private final EmailVerificationTokenMapper tokenMapper;
    private final UserRepository userRepository;

    public EmailVerificationTokenService(EmailVerificationTokenRepository tokenRepository,
                                         EmailVerificationTokenMapper tokenMapper,
                                         UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.tokenMapper = tokenMapper;
        this.userRepository = userRepository;
    }

    // Création d'un token pour un utilisateur
    @Transactional
    public EmailVerificationTokenDTO createToken(Integer userId, int expirationMinutes) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                throw new IllegalArgumentException("Utilisateur introuvable avec l'ID : " + userId);
            }

            User user = userOpt.get();
            String tokenValue = UUID.randomUUID().toString();
            LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(expirationMinutes);

            EmailVerificationToken token = new EmailVerificationToken(tokenValue, expiresAt, false, user);
            EmailVerificationToken savedToken = tokenRepository.save(token);

            return tokenMapper.toDto(savedToken);
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur lors de la création du token pour l'utilisateur ID " + userId, e);
        }
    }

    // Validation d'un token
    @Transactional
    public boolean validateToken(String tokenValue) {
        try {
            Optional<EmailVerificationToken> tokenOpt = tokenRepository.findByToken(tokenValue);
            if (tokenOpt.isEmpty()) {
                return false;
            }

            EmailVerificationToken token = tokenOpt.get();

            if (token.getUsed() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
                return false;
            }

            token.setUsed(true);
            tokenRepository.save(token);

            return true;
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur lors de la validation du token : " + tokenValue, e);
        }
    }

    // Nettoyage des tokens expirés ou utilisés
    @Transactional
    public void cleanExpiredOrUsedTokens() {
        try {
            LocalDateTime now = LocalDateTime.now();
            tokenRepository.findAll().stream()
                    .filter(t -> t.getUsed() || t.getExpiresAt().isBefore(now))
                    .forEach(tokenRepository::delete);
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur lors du nettoyage des tokens expirés ou utilisés", e);
        }
    }

    // Récupération d'un token DTO par sa valeur
    public Optional<EmailVerificationTokenDTO> getTokenDTO(String tokenValue) {
        try {
            return tokenRepository.findByToken(tokenValue)
                    .map(tokenMapper::toDto);
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur lors de la récupération du token : " + tokenValue, e);
        }
    }
}
