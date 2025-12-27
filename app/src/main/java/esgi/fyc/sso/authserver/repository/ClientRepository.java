package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

    List<Client> findByCompanyId(Integer companyId);

    List<Client> findByRealmId(Integer realmId);
}

