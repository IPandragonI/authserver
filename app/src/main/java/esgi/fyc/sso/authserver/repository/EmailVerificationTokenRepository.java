package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Integer> {

    // Récupérer un token par sa valeur
    Optional<EmailVerificationToken> findByToken(String token);

}
