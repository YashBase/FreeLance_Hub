package com.example.demo.services;

import com.example.demo.DTO.VendorFeedbackDTO;
import com.example.demo.entity.VendorFeedback;
import com.example.demo.repository.VendorFeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorFeedbackService {

    private final VendorFeedbackRepository vendorFeedbackRepository;

    /**
     * Get all feedback DTO for the logged-in vendor.
     */
    public List<VendorFeedbackDTO> getFeedbackForVendor(Integer vendorId) {
        List<VendorFeedback> feedbackList = vendorFeedbackRepository.findByVendorVendorId(vendorId);

        return feedbackList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Calculate average rating for given vendor.
     * Returns null if no feedback present.
     */
    public BigDecimal getAverageRatingForVendor(Integer vendorId) {
        List<VendorFeedback> feedbackList = vendorFeedbackRepository.findByVendorVendorId(vendorId);
        if (feedbackList.isEmpty()) {
            return null;
        }

        BigDecimal sum = feedbackList.stream()
                .map(VendorFeedback::getRating)
                .filter(r -> r != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long count = feedbackList.stream()
                .map(VendorFeedback::getRating)
                .filter(r -> r != null)
                .count();

        if (count == 0) {
            return null;
        }

        return sum.divide(BigDecimal.valueOf(count), 2, BigDecimal.ROUND_HALF_UP);
    }

    /**
     * Helper to map VendorFeedback entity to DTO
     */
    private VendorFeedbackDTO mapToDTO(VendorFeedback feedback) {
        // Get client name from deep relationship: client -> user -> userName
        String clientName = null;
        if (feedback.getClient() != null && feedback.getClient().getUser() != null) {
            clientName = feedback.getClient().getUser().getUserName();
        }

        // Generate task link: we need to find task linked to this feedback's client & vendor if possible.
        // Since your schema does not directly connect feedback to task, this is a bit indirect.
        // Assuming one task per proposal accepted etc., here we can't directly get task ID from feedback.
        // So, for demo, provide a placeholder or consider function parameter later.

        String taskLink = generateTaskLinkForFeedback(feedback);

        return new VendorFeedbackDTO(
                feedback.getRating(),
                clientName,
                taskLink
        );
    }

    /**
     * Placeholder to generate a task link for feedback.
     * Without direct relationship, this is a limitation.
     * You may need additional joins or repository methods if you want exact tasks.
     */
    private String generateTaskLinkForFeedback(VendorFeedback feedback) {
        // For now, we return a placeholder or empty string.
        return "";  // Or construct URL like "/tasks/{taskId}" if you have taskId
    }
}
