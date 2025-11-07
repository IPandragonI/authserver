package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.UserRealmDTO;
import esgi.fyc.sso.authserver.model.Realm;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.model.UserRealm;
import esgi.fyc.sso.authserver.model.UserRealmId;
import esgi.fyc.sso.authserver.repository.RealmRepository;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserRealmMapper {

    private final UserRepository userRepository;
    private final RealmRepository realmRepository;

    public UserRealmMapper(UserRepository userRepository, RealmRepository realmRepository) {
        this.userRepository = userRepository;
        this.realmRepository = realmRepository;
    }

    public UserRealmDTO toDto(UserRealm userRealm) {
        if (userRealm == null) {
            return null;
        }

        UserRealmDTO dto = new UserRealmDTO();
        User user = userRealm.getUser();
        Realm realm = userRealm.getRealm();

        dto.setUserId(user != null ? user.getId() : null);
        dto.setRealmId(realm != null ? realm.getId() : null);
        dto.setAddedAt(userRealm.getAddedAt());
        dto.setLastAccess(userRealm.getLastAccess());
        dto.setCreatedAt(userRealm.getCreatedAt());
        dto.setUpdatedAt(userRealm.getUpdatedAt());

        return dto;
    }

    public UserRealm toEntity(UserRealmDTO dto) {
        if (dto == null) return null;

        UserRealm userRealm = new UserRealm();

        UserRealmId id = new UserRealmId();
        if (dto.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(dto.getUserId());
            userOpt.ifPresent(userRealm::setUser);
            id.setUserId(dto.getUserId());
        }

        if (dto.getRealmId() != null) {
            Optional<Realm> realmOpt = realmRepository.findById(dto.getRealmId());
            realmOpt.ifPresent(userRealm::setRealm);
            id.setRealmId(dto.getRealmId());
        }

        userRealm.setId(id);

        userRealm.setAddedAt(dto.getAddedAt());
        userRealm.setLastAccess(dto.getLastAccess());
        userRealm.setCreatedAt(dto.getCreatedAt());
        userRealm.setUpdatedAt(dto.getUpdatedAt());

        return userRealm;
    }

}
