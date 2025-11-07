package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Integer> {

    // Chercher une session par son token
    Optional<UserSession> findBySessionToken(String sessionToken);

    // Chercher toutes les sessions d'un utilisateur
    List<UserSession> findByUserId(Integer userId);

    // Chercher toutes les sessions non révoquées
    List<UserSession> findByRevokedFalse();

    // Chercher toutes les sessions expirées
    List<UserSession> findByExpiresAtBefore(java.time.LocalDateTime dateTime);

    // Chercher une session par refresh token
    Optional<UserSession> findByRefreshToken(String refreshToken);

}
