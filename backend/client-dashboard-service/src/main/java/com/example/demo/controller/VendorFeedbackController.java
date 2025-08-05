package com.example.demo.controller;

import com.example.demo.model.VendorFeedback;
import com.example.demo.service.VendorFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendor-feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorFeedbackController {

    @Autowired
    private VendorFeedbackService vendorFeedbackService;

    // ✅ Submit Feedback
    @PostMapping("/submit")
    public ResponseEntity<VendorFeedback> submitFeedback(
            @RequestParam int vendorId,
            @RequestParam int clientId,
            @RequestParam double rating
    ) {
        VendorFeedback saved = vendorFeedbackService.submitFeedback(vendorId, clientId, rating);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get Average Rating
    @GetMapping("/average-rating/{vendorId}")
    public ResponseEntity<Double> getAverageRating(@PathVariable int vendorId) {
        double avgRating = vendorFeedbackService.getAverageRatingForVendor(vendorId);
        return ResponseEntity.ok(avgRating);
    }
}
