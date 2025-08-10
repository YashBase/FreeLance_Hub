package com.example.demo.controller;

import com.example.demo.DTO.ClientDashboardSummaryDTO;
import com.example.demo.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client/dashboard")
@RequiredArgsConstructor
public class ClientDashboardController {

    private final ClientDashboardService clientDashboardService;

    /**
     * Get client dashboard summary by clientId.
     *
     * Example:
     * GET /api/client/dashboard/1
     *
     * @param clientId the client ID
     * @return ClientDashboardSummaryDTO containing completed tasks, total payments, and average rating
     */
    @GetMapping("/{clientId}")
    public ResponseEntity<ClientDashboardSummaryDTO> getClientDashboard(@PathVariable Integer clientId) {
        ClientDashboardSummaryDTO dashboardSummary = clientDashboardService.getClientDashboardSummary(clientId);
        return ResponseEntity.ok(dashboardSummary);
    }
}
