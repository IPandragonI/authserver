package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.entity.Realm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealmRepository extends JpaRepository<Realm, Long> {
}
