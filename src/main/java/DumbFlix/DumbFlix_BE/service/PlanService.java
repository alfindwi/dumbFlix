package DumbFlix.DumbFlix_BE.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import DumbFlix.DumbFlix_BE.dto.response.PlanResponse;
import DumbFlix.DumbFlix_BE.entity.subsPayment.Plan;
import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import DumbFlix.DumbFlix_BE.repository.PlanRepository;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public ResponseEntity<List<PlanResponse>> getAllPlans() {
        List<Plan> planResponses = planRepository.findAll();
        List<PlanResponse> planResponse = planResponses.stream().map(plan -> new PlanResponse(plan.getPlanId(),
                plan.getName(), plan.getPrice(), plan.getDurationDays(), plan.getDescription()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(planResponse);
    }

    public PlanResponse createPlan(Plan plan) {
        if (plan == null || plan.getName() == null || plan.getPrice() == null || plan.getDurationDays() == null
                || plan.getDescription() == null) {
            throw new FuncErrorException("All fields are required");
        }

        if (planRepository.findByName(plan.getName()).isPresent()) {
            throw new FuncErrorException("Plan already exists");
        }

        Plan savedPlan = planRepository.save(plan);
        return new PlanResponse(savedPlan.getPlanId(), savedPlan.getName(), savedPlan.getPrice(),
                savedPlan.getDurationDays(), savedPlan.getDescription());
    }

    public PlanResponse updatePlan(Long planId, Plan plan) {
        Plan existingPlan = planRepository.findById(planId)
                .orElseThrow(() -> new FuncErrorException("Plan not found"));

        existingPlan.setName(plan.getName());
        existingPlan.setPrice(plan.getPrice());
        existingPlan.setDurationDays(plan.getDurationDays());
        existingPlan.setDescription(plan.getDescription());

        Plan updatedPlan = planRepository.save(existingPlan);
        return new PlanResponse(updatedPlan.getPlanId(), updatedPlan.getName(), updatedPlan.getPrice(),
                updatedPlan.getDurationDays(), updatedPlan.getDescription());
    }

    public void deletePlan(Long planId) {
        planRepository.deleteById(planId);
    }
}
