package com.example.demo.service;

import com.example.demo.DTO.ClientDashboardSummaryDTO;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.VendorFeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ClientDashboardService {

    private final TaskRepository taskRepository;
    private final PaymentRepository paymentRepository;
    private final VendorFeedbackRepository vendorFeedbackRepository;

    public ClientDashboardSummaryDTO getClientDashboardSummary(Integer clientId) {
        long completedTasks = taskRepository.countCompletedTasksByClient(clientId);
        BigDecimal totalPayments = paymentRepository.totalPaymentsMadeByClient(clientId);
        BigDecimal averageRating = vendorFeedbackRepository.averageRatingGivenByClient(clientId);

        return new ClientDashboardSummaryDTO(completedTasks, totalPayments, averageRating);
    }
}
