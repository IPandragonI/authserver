package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.CompanyDTO;
import esgi.fyc.sso.authserver.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // Créer ou mettre à jour une company
    @PostMapping
    public ResponseEntity<?> save(@RequestBody CompanyDTO companyDTO) {
        try {
            CompanyDTO savedCompany = companyService.save(companyDTO);
            return ResponseEntity.ok(savedCompany);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving company: " + e.getMessage());
        }
    }

    // Mettre à jour une company
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody CompanyDTO companyDTO) {
        try {
            return companyService.findById(id)
                    .map(existingCompany -> {
                        existingCompany.setName(companyDTO.getName());
                        existingCompany.setDescription(companyDTO.getDescription());
                        existingCompany.setDomain(companyDTO.getDomain());
                        existingCompany.setEmail(companyDTO.getEmail());
                        existingCompany.setPhone(companyDTO.getPhone());
                        existingCompany.setAddress(companyDTO.getAddress());
                        existingCompany.setCity(companyDTO.getCity());
                        existingCompany.setState(companyDTO.getState());
                        existingCompany.setCountry(companyDTO.getCountry());
                        existingCompany.setPostalCode(companyDTO.getPostalCode());
                        existingCompany.setWebsite(companyDTO.getWebsite());
                        existingCompany.setEnabled(companyDTO.getEnabled());
                        existingCompany.setVerified(companyDTO.getVerified());
                        existingCompany.setSsoEnabled(companyDTO.getSsoEnabled());
                        existingCompany.setSubscriptionStatus(companyDTO.getSubscriptionStatus());
                        existingCompany.setLogoUrl(companyDTO.getLogoUrl());
                        existingCompany.setSiret(companyDTO.getSiret());
                        existingCompany.setVat(companyDTO.getVat());
                        existingCompany.setPlanId(companyDTO.getPlanId());

                        CompanyDTO updated = companyService.save(existingCompany);
                        return ResponseEntity.ok(updated);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating company: " + e.getMessage());
        }
    }

    // Récupérer une company par ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        try {
            return companyService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching company by ID: " + e.getMessage());
        }
    }

    // Récupérer toutes les companies
    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            List<CompanyDTO> companies = companyService.findAll();
            return ResponseEntity.ok(companies);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching companies: " + e.getMessage());
        }
    }

    // Supprimer une company par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        try {
            if (!companyService.findById(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
            companyService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting company: " + e.getMessage());
        }
    }

    // Récupérer une company par email
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getByEmail(@PathVariable String email) {
        try {
            return companyService.findByEmail(email)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching company by email: " + e.getMessage());
        }
    }

    // Récupérer une company par nom
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getByName(@PathVariable String name) {
        try {
            return companyService.findByName(name)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching company by name: " + e.getMessage());
        }
    }
}
