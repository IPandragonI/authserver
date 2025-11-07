package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.RealmDTO;
import esgi.fyc.sso.authserver.model.Company;
import esgi.fyc.sso.authserver.model.Realm;
import esgi.fyc.sso.authserver.repository.CompanyRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class RealmMapper {

    private final CompanyRepository companyRepository;

    public RealmMapper(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public RealmDTO toDto(Realm realm) {
        if (realm == null) {
            return null;
        }
        RealmDTO dto = new RealmDTO();
        dto.setId(realm.getId());
        dto.setName(realm.getName());
        dto.setDescription(realm.getDescription());
        dto.setEnabled(realm.getEnabled());
        if (realm.getCompany() != null) {
            dto.setCompanyId(realm.getCompany().getId());
        }
        return dto;
    }

    public Realm toEntity(RealmDTO dto) {
        if (dto == null) {
            return null;
        }
        Realm realm = new Realm();
        realm.setId(dto.getId());
        realm.setName(dto.getName());
        realm.setDescription(dto.getDescription());
        realm.setEnabled(dto.getEnabled());

        if (dto.getCompanyId() != null) {
            Optional<Company> company = companyRepository.findById(dto.getCompanyId());
            realm.setCompany(company.orElse(null));
        }

        return realm;
    }
}
