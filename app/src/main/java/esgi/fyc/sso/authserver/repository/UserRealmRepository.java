package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.UserRealm;
import esgi.fyc.sso.authserver.model.UserRealmId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRealmRepository extends JpaRepository<UserRealm, UserRealmId> {

    // Récupérer tous les UserRealm pour un user donné
    List<UserRealm> findByUserId(Integer userId);

    // Récupérer tous les UserRealm pour un realm donné
    List<UserRealm> findByRealmId(Integer realmId);

    // Vérifier si un user est associé à un realm
    boolean existsByUserIdAndRealmId(Integer userId, Integer realmId);
}
