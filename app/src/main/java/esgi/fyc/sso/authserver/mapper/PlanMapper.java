package esgi.fyc.sso.authserver.mapper;

import esgi.fyc.sso.authserver.dto.PlanDTO;
import esgi.fyc.sso.authserver.model.Plan;
import org.springframework.stereotype.Component;

@Component
public class PlanMapper {

    public PlanDTO toDto(Plan plan) {
        if (plan == null) {
            return null;
        }
        PlanDTO dto = new PlanDTO();
        dto.setId(plan.getId());
        dto.setName(plan.getName());
        dto.setDescription(plan.getDescription());
        dto.setPrice(plan.getPrice());
        dto.setMaxUsers(plan.getMaxUsers());
        dto.setMaxRealms(plan.getMaxRealms());
        dto.setFeatures(plan.getFeatures());
        dto.setCreatedAt(plan.getCreatedAt());
        dto.setUpdatedAt(plan.getUpdatedAt());
        return dto;
    }

    public Plan toEntity(PlanDTO dto) {
        if (dto == null) {
            return null;
        }
        Plan plan = new Plan();
        plan.setId(dto.getId());
        plan.setName(dto.getName());
        plan.setDescription(dto.getDescription());
        plan.setPrice(dto.getPrice());
        plan.setMaxUsers(dto.getMaxUsers());
        plan.setMaxRealms(dto.getMaxRealms());
        plan.setFeatures(dto.getFeatures());
        plan.setCreatedAt(dto.getCreatedAt());
        plan.setUpdatedAt(dto.getUpdatedAt());
        return plan;
    }

}
