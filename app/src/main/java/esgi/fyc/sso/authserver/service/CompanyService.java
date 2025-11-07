package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.CompanyDTO;
import esgi.fyc.sso.authserver.mapper.CompanyMapper;
import esgi.fyc.sso.authserver.model.Company;
import esgi.fyc.sso.authserver.repository.CompanyRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;

    public CompanyService(CompanyRepository companyRepository, CompanyMapper companyMapper) {
        this.companyRepository = companyRepository;
        this.companyMapper = companyMapper;
    }

    // Create or update a company
    public CompanyDTO save(CompanyDTO companyDTO) {
        try {
            Company company = companyMapper.toEntity(companyDTO);
            Company savedCompany = companyRepository.save(company);
            return companyMapper.toDto(savedCompany);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while saving company", e);
        }
    }

    // Retrieve a company by id
    public Optional<CompanyDTO> findById(Integer id) {
        try {
            return companyRepository.findById(id)
                    .map(companyMapper::toDto);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving company with id " + id, e);
        }
    }

    // Retrieve all companies
    public List<CompanyDTO> findAll() {
        try {
            return companyRepository.findAll()
                    .stream()
                    .map(companyMapper::toDto)
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving all companies", e);
        }
    }

    // Delete a company by id and return true if deleted
    public boolean deleteById(Integer id) {
        try {
            if (companyRepository.existsById(id)) {
                companyRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while deleting company with id " + id, e);
        }
    }

    // Retrieve a company by email
    public Optional<CompanyDTO> findByEmail(String email) {
        try {
            return companyRepository.findByEmail(email)
                    .map(companyMapper::toDto);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving company with email " + email, e);
        }
    }

    // Check if a company exists by email
    public boolean existsByEmail(String email) {
        try {
            return companyRepository.existsByEmail(email);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while checking existence of company with email " + email, e);
        }
    }

    // Retrieve a company by name
    public Optional<CompanyDTO> findByName(String name) {
        try {
            return companyRepository.findByName(name)
                    .map(companyMapper::toDto);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while retrieving company with name " + name, e);
        }
    }

    // Check if a company exists by name
    public boolean existsByName(String name) {
        try {
            return companyRepository.existsByName(name);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error while checking existence of company with name " + name, e);
        }
    }
}
