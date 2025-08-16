package com.example.demo.controller;

import com.example.demo.entity.VendorFeedback;
import com.example.demo.service.VendorFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VendorFeedbackController {

    private final VendorFeedbackService vendorFeedbackService;

    /**
     * Endpoint for client to submit feedback and rating for a vendor on a completed task.
     *
     * @param clientId  ID of the client submitting feedback
     * @param vendorId  ID of the vendor receiving feedback
     * @param rating    Rating given by the client
     * @return Saved VendorFeedback entity
     */
    @PostMapping("/submit")
    public ResponseEntity<VendorFeedback> submitFeedback(
            @RequestParam Integer clientId,
            @RequestParam Integer vendorId,
            @RequestParam BigDecimal rating
    ) {
        VendorFeedback savedFeedback = vendorFeedbackService.submitFeedback(clientId, vendorId, rating);
        return ResponseEntity.ok(savedFeedback);
    }

    /**
     * Endpoint for client to view all feedback they have submitted.
     *
     * @param clientId ID of the client
     * @return List of VendorFeedback entries submitted by the client
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<VendorFeedback>> getFeedbackHistoryByClient(@PathVariable Integer clientId) {
        List<VendorFeedback> feedbackList = vendorFeedbackService.getFeedbackHistoryByClient(clientId);
        return ResponseEntity.ok(feedbackList);
    }

  
}
