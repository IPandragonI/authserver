package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.AuditLogDTO;
import esgi.fyc.sso.authserver.mapper.AuditLogMapper;
import esgi.fyc.sso.authserver.model.AuditLog;
import esgi.fyc.sso.authserver.repository.AuditLogRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AuditLogMapper auditLogMapper;

    public AuditLogService(AuditLogRepository auditLogRepository, AuditLogMapper auditLogMapper) {
        this.auditLogRepository = auditLogRepository;
        this.auditLogMapper = auditLogMapper;
    }

    // Retrieve all logs
    public List<AuditLogDTO> getAllLogs() {
        try {
            return auditLogRepository.findAll()
                    .stream()
                    .map(auditLogMapper::toDto)
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving all logs", e);
        }
    }

    // Retrieve a log by its id
    public Optional<AuditLogDTO> getLogById(Integer id) {
        try {
            return auditLogRepository.findById(id)
                    .map(auditLogMapper::toDto);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving log with id " + id, e);
        }
    }

    // Create a new log
    public AuditLogDTO createLog(AuditLogDTO dto) {
        try {
            AuditLog auditLog = auditLogMapper.toEntity(dto);
            AuditLog saved = auditLogRepository.save(auditLog);
            return auditLogMapper.toDto(saved);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while creating log", e);
        }
    }

    // Update an existing log
    public Optional<AuditLogDTO> updateLog(Integer id, AuditLogDTO dto) {
        try {
            return auditLogRepository.findById(id)
                    .map(existing -> {
                        existing.setAction(dto.getAction());
                        existing.setDescription(dto.getDescription());
                        existing.setIp(dto.getIp());
                        existing.setUa(dto.getUa());

                        AuditLog updated = auditLogRepository.save(existing);
                        return auditLogMapper.toDto(updated);
                    });
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while updating log with id " + id, e);
        }
    }

    // Delete a log
    public boolean deleteLog(Integer id) {
        try {
            if (auditLogRepository.existsById(id)) {
                auditLogRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while deleting log with id " + id, e);
        }
    }

    // Retrieve all logs for a user
    public List<AuditLogDTO> getLogsByUser(Integer userId) {
        try {
            return auditLogRepository.findByUserId(userId)
                    .stream()
                    .map(auditLogMapper::toDto)
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving logs for user " + userId, e);
        }
    }

    // Retrieve all logs for a realm
    public List<AuditLogDTO> getLogsByRealm(Integer realmId) {
        try {
            return auditLogRepository.findByRealmId(realmId)
                    .stream()
                    .map(auditLogMapper::toDto)
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving logs for realm " + realmId, e);
        }
    }

    // Retrieve all logs for a user in a realm
    public List<AuditLogDTO> getLogsByUserAndRealm(Integer userId, Integer realmId) {
        try {
            return auditLogRepository.findByUserIdAndRealmId(userId, realmId)
                    .stream()
                    .map(auditLogMapper::toDto)
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving logs for user " + userId + " in realm " + realmId, e);
        }
    }
}
