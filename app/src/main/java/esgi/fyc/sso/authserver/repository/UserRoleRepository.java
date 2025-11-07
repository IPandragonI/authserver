package esgi.fyc.sso.authserver.repository;

import esgi.fyc.sso.authserver.model.UserRole;
import esgi.fyc.sso.authserver.model.UserRoleId;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {

    // Récupérer tous les rôles d’un utilisateur donné
    List<UserRole> findByUser(User user);

    // Récupérer tous les utilisateurs ayant un rôle spécifique
    List<UserRole> findByRole(Role role);

    // Vérifier si un utilisateur a déjà un rôle donné
    boolean existsByUserAndRole(User user, Role role);

}
