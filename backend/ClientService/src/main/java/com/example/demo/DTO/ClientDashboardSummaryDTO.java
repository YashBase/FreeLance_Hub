package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ClientDashboardSummaryDTO {
    private long totalCompletedTasks;
    private BigDecimal totalPaymentsMade;
    private BigDecimal averageRatingGiven;
}
