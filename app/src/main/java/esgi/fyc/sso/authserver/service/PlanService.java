package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.PlanDTO;
import esgi.fyc.sso.authserver.mapper.PlanMapper;
import esgi.fyc.sso.authserver.model.Plan;
import esgi.fyc.sso.authserver.repository.PlanRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final PlanMapper planMapper;

    public PlanService(PlanRepository planRepository, PlanMapper planMapper) {
        this.planRepository = planRepository;
        this.planMapper = planMapper;
    }

    public PlanDTO createPlan(PlanDTO planDTO) {
        try {
            Plan plan = planMapper.toEntity(planDTO);
            Plan savedPlan = planRepository.save(plan);
            return planMapper.toDto(savedPlan);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create plan: " + e.getMessage(), e);
        }
    }

    public List<PlanDTO> getAllPlans() {
        try {
            return planRepository.findAll()
                    .stream()
                    .map(planMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            // Return empty list if something goes wrong
            return Collections.emptyList();
        }
    }

    public Optional<PlanDTO> getPlanById(Integer id) {
        try {
            return planRepository.findById(id)
                    .map(planMapper::toDto);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<PlanDTO> updatePlan(Integer id, PlanDTO planDTO) {
        try {
            return planRepository.findById(id)
                    .map(existingPlan -> {
                        existingPlan.setName(planDTO.getName());
                        existingPlan.setDescription(planDTO.getDescription());
                        existingPlan.setPrice(planDTO.getPrice());
                        existingPlan.setMaxUsers(planDTO.getMaxUsers());
                        existingPlan.setMaxRealms(planDTO.getMaxRealms());
                        existingPlan.setFeatures(planDTO.getFeatures());
                        Plan updatedPlan = planRepository.save(existingPlan);
                        return planMapper.toDto(updatedPlan);
                    });
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void deletePlan(Integer id) {
        try {
            planRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete plan with ID " + id + ": " + e.getMessage(), e);
        }
    }

    public Optional<PlanDTO> getPlanByName(String name) {
        try {
            return planRepository.findByName(name)
                    .map(planMapper::toDto);
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
