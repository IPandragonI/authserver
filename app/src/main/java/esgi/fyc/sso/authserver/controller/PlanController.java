package esgi.fyc.sso.authserver.controller;

import esgi.fyc.sso.authserver.dto.PlanDTO;
import esgi.fyc.sso.authserver.service.PlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    // Create a new plan
    @PostMapping
    public ResponseEntity<?> createPlan(@RequestBody PlanDTO planDTO) {
        try {
            PlanDTO createdPlan = planService.createPlan(planDTO);
            return ResponseEntity.ok(createdPlan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create plan: " + e.getMessage());
        }
    }

    // Get all plans
    @GetMapping
    public ResponseEntity<?> getAllPlans() {
        try {
            List<PlanDTO> plans = planService.getAllPlans();
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve plans: " + e.getMessage());
        }
    }

    // Get plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPlanById(@PathVariable Integer id) {
        try {
            Optional<PlanDTO> planOpt = planService.getPlanById(id);
            if (planOpt.isPresent()) {
                return ResponseEntity.ok(planOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Plan not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve plan: " + e.getMessage());
        }
    }

    // Get plan by name
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getPlanByName(@PathVariable String name) {
        try {
            Optional<PlanDTO> planOpt = planService.getPlanByName(name);
            if (planOpt.isPresent()) {
                return ResponseEntity.ok(planOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Plan not found with name: " + name);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve plan: " + e.getMessage());
        }
    }

    // Update plan by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlan(@PathVariable Integer id, @RequestBody PlanDTO planDTO) {
        try {
            Optional<PlanDTO> updatedPlanOpt = planService.updatePlan(id, planDTO);
            if (updatedPlanOpt.isPresent()) {
                return ResponseEntity.ok(updatedPlanOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Plan not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update plan: " + e.getMessage());
        }
    }

    // Delete plan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable Integer id) {
        try {
            planService.deletePlan(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete plan: " + e.getMessage());
        }
    }
}
