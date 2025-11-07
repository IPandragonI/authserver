package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.AuditLogDTO;
import esgi.fyc.sso.authserver.model.AuditLog;
import esgi.fyc.sso.authserver.model.Realm;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.repository.RealmRepository;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditLogMapper {

    private final UserRepository userRepository;
    private final RealmRepository realmRepository;

    public AuditLogMapper(UserRepository userRepository, RealmRepository realmRepository) {
        this.userRepository = userRepository;
        this.realmRepository = realmRepository;
    }

    public AuditLogDTO toDto(AuditLog auditLog) {
        if (auditLog == null) return null;

        AuditLogDTO dto = new AuditLogDTO();
        User user = auditLog.getUser();
        Realm realm = auditLog.getRealm();

        dto.setId(auditLog.getId());
        dto.setAction(auditLog.getAction());
        dto.setDescription(auditLog.getDescription());
        dto.setIp(auditLog.getIp());
        dto.setUa(auditLog.getUa());
        dto.setUserId(user != null ? user.getId() : null);
        dto.setRealmId(realm != null ? realm.getId() : null);

        return dto;
    }

    public AuditLog toEntity(AuditLogDTO dto) {
        if (dto == null) return null;

        AuditLog auditLog = new AuditLog();

        if (dto.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(dto.getUserId());
            userOpt.ifPresent(auditLog::setUser);
        }

        if (dto.getRealmId() != null) {
            Optional<Realm> realmOpt = realmRepository.findById(dto.getRealmId());
            realmOpt.ifPresent(auditLog::setRealm);
        }

        auditLog.setId(dto.getId());
        auditLog.setAction(dto.getAction());
        auditLog.setDescription(dto.getDescription());
        auditLog.setIp(dto.getIp());
        auditLog.setUa(dto.getUa());

        return auditLog;
    }
}
