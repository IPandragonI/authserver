package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.ClientDTO;
import esgi.fyc.sso.authserver.mapper.ClientMapper;
import esgi.fyc.sso.authserver.model.Client;
import esgi.fyc.sso.authserver.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }

    public List<ClientDTO> getAllClients() {
        try {
            return clientRepository.findAll()
                    .stream()
                    .map(clientMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve clients: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public ClientDTO getClientById(Integer id) {
        try {
            Optional<Client> clientOpt = clientRepository.findById(id);
            return clientOpt.map(clientMapper::toDto).orElse(null);
        } catch (Exception e) {
            System.err.println("Failed to retrieve client with ID " + id + ": " + e.getMessage());
            return null;
        }
    }

    public ClientDTO createClient(ClientDTO dto) {
        try {
            Client client = clientMapper.toEntity(dto);
            Client saved = clientRepository.save(client);
            return clientMapper.toDto(saved);
        } catch (Exception e) {
            System.err.println("Failed to create client: " + e.getMessage());
            return null;
        }
    }

    public ClientDTO updateClient(Integer id, ClientDTO dto) {
        try {
            Optional<Client> existingOpt = clientRepository.findById(id);
            if (existingOpt.isEmpty()) {
                System.err.println("Client not found with ID " + id);
                return null;
            }

            Client client = existingOpt.get();
            client.setName(dto.getName());
            if (dto.getRealmId() != null) {
                client.setRealm(clientMapper.toEntity(new ClientDTO(null, null, dto.getRealmId(), null, null, null)).getRealm());
            }
            if (dto.getCompanyId() != null) {
                client.setCompany(clientMapper.toEntity(new ClientDTO(null, null, null, dto.getCompanyId(), null, null)).getCompany());
            }

            Client updated = clientRepository.save(client);
            return clientMapper.toDto(updated);
        } catch (Exception e) {
            System.err.println("Failed to update client with ID " + id + ": " + e.getMessage());
            return null;
        }
    }

    public boolean deleteClient(Integer id) {
        try {
            if (!clientRepository.existsById(id)) {
                System.err.println("Client not found with ID " + id);
                return false;
            }
            clientRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.err.println("Failed to delete client with ID " + id + ": " + e.getMessage());
            return false;
        }
    }

    public List<ClientDTO> getClientsByCompany(Integer companyId) {
        try {
            return clientRepository.findByCompanyId(companyId)
                    .stream()
                    .map(clientMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve clients for company " + companyId + ": " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public List<ClientDTO> getClientsByRealm(Integer realmId) {
        try {
            return clientRepository.findByRealmId(realmId)
                    .stream()
                    .map(clientMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve clients for realm " + realmId + ": " + e.getMessage());
            return Collections.emptyList();
        }
    }
}

