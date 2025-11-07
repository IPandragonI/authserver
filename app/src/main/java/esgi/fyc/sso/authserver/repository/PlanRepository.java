package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Integer> {

    Optional<Plan> findByName(String name);

    boolean existsByName(String name);

}
