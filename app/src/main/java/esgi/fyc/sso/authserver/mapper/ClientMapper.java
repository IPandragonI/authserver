package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.ClientDTO;
import esgi.fyc.sso.authserver.model.Client;
import esgi.fyc.sso.authserver.model.Company;
import esgi.fyc.sso.authserver.model.Realm;
import esgi.fyc.sso.authserver.repository.CompanyRepository;
import esgi.fyc.sso.authserver.repository.RealmRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ClientMapper {

    private final CompanyRepository companyRepository;
    private final RealmRepository realmRepository;

    public ClientMapper(CompanyRepository companyRepository, RealmRepository realmRepository) {
        this.companyRepository = companyRepository;
        this.realmRepository = realmRepository;
    }

    public ClientDTO toDto(Client client) {
        if (client == null) {
            return null;
        }
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setName(client.getName());
        if (client.getRealm() != null) {
            dto.setRealmId(client.getRealm().getId());
        }
        if (client.getCompany() != null) {
            dto.setCompanyId(client.getCompany().getId());
        }
        dto.setCreatedAt(client.getCreatedAt());
        dto.setUpdatedAt(client.getUpdatedAt());
        return dto;
    }

    public Client toEntity(ClientDTO dto) {
        if (dto == null) {
            return null;
        }
        Client client = new Client();
        client.setName(dto.getName());
        try {
            if (dto.getId() != null) {
                java.lang.reflect.Field idField = Client.class.getDeclaredField("id");
                idField.setAccessible(true);
                idField.set(client, dto.getId());
            }
        } catch (Exception ignored) {
        }

        if (dto.getRealmId() != null) {
            Optional<Realm> realm = realmRepository.findById(dto.getRealmId());
            client.setRealm(realm.orElse(null));
        }

        if (dto.getCompanyId() != null) {
            Optional<Company> company = companyRepository.findById(dto.getCompanyId());
            client.setCompany(company.orElse(null));
        }

        if (dto.getCreatedAt() != null) {
            try {
                java.lang.reflect.Field createdAtField = Client.class.getDeclaredField("createdAt");
                createdAtField.setAccessible(true);
                createdAtField.set(client, dto.getCreatedAt());
            } catch (Exception ignored) {}
        }
        if (dto.getUpdatedAt() != null) {
            try {
                java.lang.reflect.Field updatedAtField = Client.class.getDeclaredField("updatedAt");
                updatedAtField.setAccessible(true);
                updatedAtField.set(client, dto.getUpdatedAt());
            } catch (Exception ignored) {}
        }

        return client;
    }
}
