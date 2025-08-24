package com.example.demo.controller;

import com.example.demo.DTO.VendorDashboardSummaryDTO;
import com.example.demo.services.VendorDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendor/dashboard")
@RequiredArgsConstructor
public class VendorDashboardController {

    private final VendorDashboardService vendorDashboardService;

    /**
     * Get the vendor dashboard summary by vendorId.
     * @param vendorId Vendor's ID (typically from authenticated session)
     * @return Dashboard summary DTO
     */
    @GetMapping("/{vendorId}")
    public ResponseEntity<VendorDashboardSummaryDTO> getDashboardSummary(@PathVariable Integer vendorId) {
        VendorDashboardSummaryDTO summary = vendorDashboardService.getVendorDashboardSummary(vendorId);
        return ResponseEntity.ok(summary);
    }
}
