package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.entity.Realm;
import esgi.fyc.sso.authserver.repository.RealmRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RealmService {

    private final RealmRepository realmRepository;

    public RealmService(RealmRepository realmRepository) {
        this.realmRepository = realmRepository;
    }

    public List<Realm> findAll() {
        return realmRepository.findAll();
    }

    public Optional<Realm> findById(Long id) {
        return realmRepository.findById(id);
    }

    public Realm createRealm(Realm realm) {
        return realmRepository.save(realm);
    }

    public Realm updateRealm(Long id, Realm updatedRealm) {
        Realm existingRealm = realmRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Realm not found with ID: " + id));

        existingRealm.setName(updatedRealm.getName());
        existingRealm.setDescription(updatedRealm.getDescription());

        return realmRepository.save(existingRealm);
    }

    public void deleteRealm(Long id) {
        realmRepository.deleteById(id);
    }
}
