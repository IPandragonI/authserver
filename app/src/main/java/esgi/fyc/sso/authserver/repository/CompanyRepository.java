package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Optional<Company> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Company> findByName(String name);

    boolean existsByName(String name);

}
