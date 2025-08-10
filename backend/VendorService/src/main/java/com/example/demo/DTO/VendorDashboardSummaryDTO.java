package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class VendorDashboardSummaryDTO {

    // Total matched requirements seen
    private long totalMatchedRequirementsSeen;

    // Total proposals submitted by vendor
    private long totalProposalsSubmitted;

    // Proposals accepted by vendor
    private long proposalsAccepted;

    // Total tasks assigned to vendor
    private long totalTasksAssigned;

    // Tasks in progress count
    private long tasksInProgress;

    // Tasks completed count
    private long tasksCompleted;

    // Total payments received
    private BigDecimal totalPaymentsReceived;

    // Average client rating
    private BigDecimal averageClientRating;

}
