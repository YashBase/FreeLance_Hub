package com.example.demo.services;

import com.example.demo.DTO.ProposalStatus;
import com.example.demo.DTO.VendorDashboardSummaryDTO;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class VendorDashboardService {

    private final RequirementRepository requirementRepository;
    private final ProposalRepository proposalRepository;
    private final TaskRepository taskRepository;
    private final PaymentRepository paymentRepository;
    private final VendorFeedbackRepository vendorFeedbackRepository;

    public VendorDashboardSummaryDTO getVendorDashboardSummary(Integer vendorId) {
        // Total matched requirements - adjust with matching logic if possible, else total count
        long totalMatchedRequirements = requirementRepository.count();

        long totalProposalsSubmitted = proposalRepository.countByVendorVendorId(vendorId);

        long proposalsAccepted = proposalRepository.countByVendorVendorIdAndStatus(vendorId, ProposalStatus.accepted);

        long totalTasksAssigned = taskRepository.countByProposalVendorVendorId(vendorId);

        long tasksInProgress = taskRepository.countByProposalVendorVendorIdAndStatus(vendorId, "in progress");

        long tasksCompleted = taskRepository.countByProposalVendorVendorIdAndStatus(vendorId, "completed");

        BigDecimal totalPaymentsReceived = paymentRepository.getTotalPaymentsByVendorId(vendorId);

        BigDecimal averageClientRating = vendorFeedbackRepository.getAverageRatingByVendorId(vendorId);

        return new VendorDashboardSummaryDTO(
                totalMatchedRequirements,
                totalProposalsSubmitted,
                proposalsAccepted,
                totalTasksAssigned,
                tasksInProgress,
                tasksCompleted,
                totalPaymentsReceived,
                averageClientRating
        );
    }
}
