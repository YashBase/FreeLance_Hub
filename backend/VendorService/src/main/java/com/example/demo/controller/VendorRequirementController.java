package com.example.demo.controller;



import com.example.demo.entity.RequirementTable;
import com.example.demo.services.VendorRequirmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vendor")
@RequiredArgsConstructor
public class VendorRequirementController {

    private final VendorRequirmentService vendorRequirementService;

    /**
     * Get matched requirements for a vendor with optional filters and sorting.
     * Example:
     * GET /api/vendor/5/requirements?minBudget=1000&maxBudget=5000&sortBy=budget
     */
    @GetMapping("/{vendorId}/requirements")
    public ResponseEntity<List<RequirementTable>> getMatchedRequirements(
            @PathVariable Integer vendorId,
            @RequestParam(required = false) BigDecimal minBudget,
            @RequestParam(required = false) BigDecimal maxBudget,
            @RequestParam(required = false, defaultValue = "budget") String sortBy
    ) {
        List<RequirementTable> requirements = vendorRequirementService.getMatchedRequirements(
                vendorId, minBudget, maxBudget, sortBy
        );
        return ResponseEntity.ok(requirements);
    }
}
