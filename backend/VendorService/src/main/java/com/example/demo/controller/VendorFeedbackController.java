package com.example.demo.controller;

import com.example.demo.DTO.VendorFeedbackDTO;
import com.example.demo.services.VendorFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vendor/feedback")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VendorFeedbackController {

    private final VendorFeedbackService vendorFeedbackService;

    /**
     * Get all feedback for a vendor (DTO view)
     */
    @GetMapping("/{vendorId}")
    public ResponseEntity<List<VendorFeedbackDTO>> getFeedbackForVendor(@PathVariable Integer vendorId) {
        return ResponseEntity.ok(vendorFeedbackService.getFeedbackForVendor(vendorId));
    }

    /**
     * Get average rating for a vendor
     */
    @GetMapping("/{vendorId}/average-rating")
    public ResponseEntity<BigDecimal> getAverageRating(@PathVariable Integer vendorId) {
        BigDecimal avgRating = vendorFeedbackService.getAverageRatingForVendor(vendorId);
        if (avgRating == null) {
            return ResponseEntity.noContent().build(); // 204 if no rating
        }
        return ResponseEntity.ok(avgRating);
    }
}
