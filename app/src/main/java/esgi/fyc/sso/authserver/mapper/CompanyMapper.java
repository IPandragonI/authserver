package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.CompanyDTO;
import esgi.fyc.sso.authserver.model.Company;
import esgi.fyc.sso.authserver.model.Plan;
import esgi.fyc.sso.authserver.repository.PlanRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CompanyMapper {

    private final PlanRepository planRepository;

    public CompanyMapper(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public CompanyDTO toDto(Company company) {
        if (company == null) {
            return null;
        }
        CompanyDTO dto = new CompanyDTO();
        dto.setId(company.getId());
        dto.setName(company.getName());
        dto.setDescription(company.getDescription());
        dto.setDomain(company.getDomain());
        dto.setEmail(company.getEmail());
        dto.setPhone(company.getPhone());
        dto.setAddress(company.getAddress());
        dto.setCity(company.getCity());
        dto.setState(company.getState());
        dto.setCountry(company.getCountry());
        dto.setPostalCode(company.getPostalCode());
        dto.setWebsite(company.getWebsite());
        dto.setEnabled(company.getEnabled());
        dto.setVerified(company.getVerified());
        dto.setSsoEnabled(company.getSsoEnabled());
        dto.setSubscriptionStatus(company.getSubscriptionStatus());
        dto.setTrialEndsAt(company.getTrialEndsAt());
        dto.setSubscriptionEndsAt(company.getSubscriptionEndsAt());
        dto.setLogoUrl(company.getLogoUrl());
        dto.setSiret(company.getSiret());
        dto.setVat(company.getVat());
        dto.setCreatedAt(company.getCreatedAt());
        dto.setUpdatedAt(company.getUpdatedAt());
        dto.setPlanId(company.getPlan() != null ? company.getPlan().getId() : null);
        return dto;
    }

    public Company toEntity(CompanyDTO dto) {
        if (dto == null) {
            return null;
        }
        Company company = new Company();
        company.setId(dto.getId());
        company.setName(dto.getName());
        company.setDescription(dto.getDescription());
        company.setDomain(dto.getDomain());
        company.setEmail(dto.getEmail());
        company.setPhone(dto.getPhone());
        company.setAddress(dto.getAddress());
        company.setCity(dto.getCity());
        company.setState(dto.getState());
        company.setCountry(dto.getCountry());
        company.setPostalCode(dto.getPostalCode());
        company.setWebsite(dto.getWebsite());
        company.setEnabled(dto.getEnabled());
        company.setVerified(dto.getVerified());
        company.setSsoEnabled(dto.getSsoEnabled());
        company.setSubscriptionStatus(dto.getSubscriptionStatus());
        company.setTrialEndsAt(dto.getTrialEndsAt());
        company.setSubscriptionEndsAt(dto.getSubscriptionEndsAt());
        company.setLogoUrl(dto.getLogoUrl());
        company.setSiret(dto.getSiret());
        company.setVat(dto.getVat());
        company.setCreatedAt(dto.getCreatedAt());
        company.setUpdatedAt(dto.getUpdatedAt());

        if (dto.getPlanId() != null) {
            Optional<Plan> planOpt = planRepository.findById(dto.getPlanId());
            planOpt.ifPresent(company::setPlan);
        } else {
            company.setPlan(null);
        }

        return company;
    }

}
