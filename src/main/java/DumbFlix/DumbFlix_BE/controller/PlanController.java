package DumbFlix.DumbFlix_BE.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DumbFlix.DumbFlix_BE.dto.response.PlanResponse;
import DumbFlix.DumbFlix_BE.entity.subsPayment.Plan;
import DumbFlix.DumbFlix_BE.service.PlanService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/plans")
public class PlanController {   

    @Valid
    private PlanService planService;

    @GetMapping
    public ResponseEntity<List<PlanResponse>> getPlans() {
        List<PlanResponse> planResponses = planService.getAllPlans().getBody();
        return ResponseEntity.ok(planResponses);
    }

    @PostMapping
    public ResponseEntity<PlanResponse> createCategory(@RequestBody PlanResponse request) {
        Plan plans = new Plan();
        plans.setName(request.getName());
        plans.setPrice(request.getPrice());
        plans.setDurationDays(request.getDurationDays());
        plans.setDescription(request.getDescription());

        PlanResponse planResponse = planService.createPlan(plans);
        return ResponseEntity.ok(planResponse);
    }

    @PutMapping("/{planId}")
    public ResponseEntity<PlanResponse> updatePlan(@PathVariable Long planId, @RequestBody PlanResponse request) {
        Plan plans = new Plan();
        plans.setName(request.getName());
        plans.setPrice(request.getPrice());
        plans.setDurationDays(request.getDurationDays());
        plans.setDescription(request.getDescription());

        PlanResponse planResponse = planService.updatePlan(planId, plans);
        return ResponseEntity.ok(planResponse);
    }

    @DeleteMapping("/{planId}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long planId) {
        planService.deletePlan(planId);
        return ResponseEntity.noContent().build();
    }
}
