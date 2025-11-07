package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Integer> {

    // Récupérer tous les logs pour un utilisateur donné
    List<AuditLog> findByUserId(Integer userId);

    // Récupérer tous les logs pour un realm donné
    List<AuditLog> findByRealmId(Integer realmId);

    // Récupérer tous les logs par action
    List<AuditLog> findByAction(String action);

    // Récupérer tous les logs d'un utilisateur spécifique dans un realm spécifique
    List<AuditLog> findByUserIdAndRealmId(Integer userId, Integer realmId);
}
