package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.RealmDTO;
import esgi.fyc.sso.authserver.mapper.RealmMapper;
import esgi.fyc.sso.authserver.model.Realm;
import esgi.fyc.sso.authserver.repository.RealmRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RealmService {

    private final RealmRepository realmRepository;
    private final RealmMapper realmMapper;

    public RealmService(RealmRepository realmRepository, RealmMapper realmMapper) {
        this.realmRepository = realmRepository;
        this.realmMapper = realmMapper;
    }

    // Get all realms
    public List<RealmDTO> getAllRealms() {
        try {
            return realmRepository.findAll()
                    .stream()
                    .map(realmMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve realms: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    // Get realm by ID
    public RealmDTO getRealmById(Integer id) {
        try {
            Optional<Realm> realmOpt = realmRepository.findById(id);
            return realmOpt.map(realmMapper::toDto).orElse(null);
        } catch (Exception e) {
            System.err.println("Failed to retrieve realm with ID " + id + ": " + e.getMessage());
            return null;
        }
    }

    // Create a new realm
    public RealmDTO createRealm(RealmDTO dto) {
        try {
            Realm realm = realmMapper.toEntity(dto);
            Realm saved = realmRepository.save(realm);
            return realmMapper.toDto(saved);
        } catch (Exception e) {
            System.err.println("Failed to create realm: " + e.getMessage());
            return null;
        }
    }

    // Update an existing realm
    public RealmDTO updateRealm(Integer id, RealmDTO dto) {
        try {
            Optional<Realm> realmOpt = realmRepository.findById(id);
            if (realmOpt.isEmpty()) {
                System.err.println("Realm not found with ID " + id);
                return null;
            }

            Realm realm = realmOpt.get();
            realm.setName(dto.getName());
            realm.setDescription(dto.getDescription());
            realm.setEnabled(dto.getEnabled());
            if (dto.getCompanyId() != null) {
                realm.setCompany(realmMapper.toEntity(dto).getCompany());
            }

            Realm updated = realmRepository.save(realm);
            return realmMapper.toDto(updated);
        } catch (Exception e) {
            System.err.println("Failed to update realm with ID " + id + ": " + e.getMessage());
            return null;
        }
    }

    // Delete a realm by ID
    public boolean deleteRealm(Integer id) {
        try {
            if (!realmRepository.existsById(id)) {
                System.err.println("Realm not found with ID " + id);
                return false;
            }
            realmRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.err.println("Failed to delete realm with ID " + id + ": " + e.getMessage());
            return false;
        }
    }
}
