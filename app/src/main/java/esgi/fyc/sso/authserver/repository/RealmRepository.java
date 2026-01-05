package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.Realm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RealmRepository extends JpaRepository<Realm, Integer> {

    List<Realm> findByCompanyId(Integer companyId);

    Realm findByName(String name);

}
