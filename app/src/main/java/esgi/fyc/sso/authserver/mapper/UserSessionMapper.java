package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.UserSessionDTO;
import esgi.fyc.sso.authserver.model.Realm;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.model.UserSession;
import esgi.fyc.sso.authserver.repository.RealmRepository;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserSessionMapper {

    private final UserRepository userRepository;
    private final RealmRepository realmRepository;

    public UserSessionMapper(UserRepository userRepository, RealmRepository realmRepository) {
        this.userRepository = userRepository;
        this.realmRepository = realmRepository;
    }

    public UserSessionDTO toDto(UserSession userSession) {
        if (userSession == null) return null;

        UserSessionDTO dto = new UserSessionDTO();
        User user = userSession.getUser();
        Realm realm = userSession.getRealm();

        dto.setId(userSession.getId());
        dto.setUserId(user != null ? user.getId() : null);
        dto.setRealmId(realm != null ? realm.getId() : null);
        dto.setSessionToken(userSession.getSessionToken());
        dto.setRefreshToken(userSession.getRefreshToken());
        dto.setIp(userSession.getIp());
        dto.setUa(userSession.getUa());
        dto.setExpiresAt(userSession.getExpiresAt());
        dto.setRevoked(userSession.getRevoked());
        dto.setCreatedAt(userSession.getCreatedAt());
        dto.setUpdatedAt(userSession.getUpdatedAt());

        return dto;
    }

    public UserSession toEntity(UserSessionDTO dto) {
        if (dto == null) return null;

        UserSession userSession = new UserSession();

        if (dto.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(dto.getUserId());
            userOpt.ifPresent(userSession::setUser);
        }

        if (dto.getRealmId() != null) {
            Optional<Realm> realmOpt = realmRepository.findById(dto.getRealmId());
            realmOpt.ifPresent(userSession::setRealm);
        }

        userSession.setId(dto.getId());
        userSession.setSessionToken(dto.getSessionToken());
        userSession.setRefreshToken(dto.getRefreshToken());
        userSession.setIp(dto.getIp());
        userSession.setUa(dto.getUa());
        userSession.setExpiresAt(dto.getExpiresAt());
        userSession.setRevoked(dto.getRevoked());
        userSession.setCreatedAt(dto.getCreatedAt());
        userSession.setUpdatedAt(dto.getUpdatedAt());

        return userSession;
    }
}
