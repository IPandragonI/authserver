package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.UserRealmDTO;
import esgi.fyc.sso.authserver.mapper.UserRealmMapper;
import esgi.fyc.sso.authserver.model.UserRealm;
import esgi.fyc.sso.authserver.model.UserRealmId;
import esgi.fyc.sso.authserver.repository.UserRealmRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserRealmService {

    private final UserRealmRepository userRealmRepository;
    private final UserRealmMapper userRealmMapper;

    public UserRealmService(UserRealmRepository userRealmRepository, UserRealmMapper userRealmMapper) {
        this.userRealmRepository = userRealmRepository;
        this.userRealmMapper = userRealmMapper;
    }

    public List<UserRealmDTO> getAllUserRealms() {
        try {
            return userRealmRepository.findAll()
                    .stream()
                    .map(userRealmMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve user realms: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public Optional<UserRealmDTO> getUserRealm(Integer userId, Integer realmId) {
        try {
            UserRealmId id = new UserRealmId(realmId, userId);
            return userRealmRepository.findById(id)
                    .map(userRealmMapper::toDto);
        } catch (Exception e) {
            System.err.println("Failed to retrieve UserRealm for userId=" + userId + " and realmId=" + realmId + ": " + e.getMessage());
            return Optional.empty();
        }
    }

    public List<UserRealmDTO> getUserRealm(Integer realmId) {
        try {
            return userRealmRepository.findByRealmId(realmId)
                    .stream()
                    .map(userRealmMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve UserRealms for realmId=" + realmId + ": " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public UserRealmDTO createUserRealm(UserRealmDTO dto) {
        try {
            UserRealm userRealm = userRealmMapper.toEntity(dto);
            UserRealm saved = userRealmRepository.save(userRealm);
            return userRealmMapper.toDto(saved);
        } catch (Exception e) {
            System.err.println("Failed to create UserRealm: " + e.getMessage());
            return null;
        }
    }

    public UserRealmDTO updateUserRealm(UserRealmDTO dto) {
        try {
            if (dto.getUserId() == null || dto.getRealmId() == null) {
                System.err.println("User ID and Realm ID must not be null for update");
                return null;
            }
            UserRealmId id = new UserRealmId(dto.getRealmId(), dto.getUserId());
            Optional<UserRealm> existingOpt = userRealmRepository.findById(id);
            if (existingOpt.isPresent()) {
                UserRealm existing = existingOpt.get();
                existing.setAddedAt(dto.getAddedAt());
                existing.setLastAccess(dto.getLastAccess());
                UserRealm updated = userRealmRepository.save(existing);
                return userRealmMapper.toDto(updated);
            } else {
                System.err.println("UserRealm not found for given IDs: userId=" + dto.getUserId() + ", realmId=" + dto.getRealmId());
                return null;
            }
        } catch (Exception e) {
            System.err.println("Failed to update UserRealm: " + e.getMessage());
            return null;
        }
    }

    public boolean deleteUserRealm(Integer userId, Integer realmId) {
        try {
            UserRealmId id = new UserRealmId(realmId, userId);
            if (!userRealmRepository.existsById(id)) {
                System.err.println("UserRealm not found for deletion: userId=" + userId + ", realmId=" + realmId);
                return false;
            }
            userRealmRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.err.println("Failed to delete UserRealm: " + e.getMessage());
            return false;
        }
    }

    public boolean existsUserRealm(Integer userId, Integer realmId) {
        try {
            return userRealmRepository.existsByUserIdAndRealmId(userId, realmId);
        } catch (Exception e) {
            System.err.println("Failed to check existence of UserRealm: " + e.getMessage());
            return false;
        }
    }

    public List<UserRealmDTO> getUserRealmsByUser(Integer userId) {
        try {
            return userRealmRepository.findByUserId(userId)
                    .stream()
                    .map(userRealmMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve UserRealms for userId=" + userId + ": " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public List<UserRealmDTO> getUserRealmsByRealm(Integer realmId) {
        try {
            return userRealmRepository.findByRealmId(realmId)
                    .stream()
                    .map(userRealmMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve UserRealms for realmId=" + realmId + ": " + e.getMessage());
            return Collections.emptyList();
        }
    }
}
