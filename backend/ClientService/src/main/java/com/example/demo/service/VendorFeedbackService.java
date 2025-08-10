package com.example.demo.service;

import com.example.demo.entity.ClientTable;
import com.example.demo.entity.VendorFeedback;
import com.example.demo.entity.VendorTable;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.VendorFeedbackRepository;
import com.example.demo.repository.VendorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorFeedbackService {

    private final VendorFeedbackRepository vendorFeedbackRepository;
    private final VendorRepository vendorRepository;
    private final ClientRepository clientRepository;

    /**
     * Client submits feedback and rating on a completed task.
     * Only vendorId and clientId are linked as per DB.
     * 
     * @param clientId Client submitting the feedback
     * @param vendorId Vendor receiving the feedback
     * @param rating Rating given by client
     * @return saved VendorFeedback entity
     */
    @Transactional
    public VendorFeedback submitFeedback(Integer clientId, Integer vendorId, BigDecimal rating) {

        VendorTable vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        // Optional: You could check if task is completed and client/vendor relationship valid before saving

        ClientTable client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        VendorFeedback feedback = VendorFeedback.builder()
                .vendor(vendor)
                .client(client)  // now types match
                .rating(rating)
                .build();

        return vendorFeedbackRepository.save(feedback);
    }

    /**
     * Client views all feedback they have submitted (feedback history)
     */
    public List<VendorFeedback> getFeedbackHistoryByClient(Integer clientId) {
        return vendorFeedbackRepository.findByClientClientId(clientId);
    }

    /**
     * Vendor views all feedback received (optional use)
     */
    public List<VendorFeedback> getFeedbackForVendor(Integer vendorId) {
        return vendorFeedbackRepository.findByVendorVendorId(vendorId);
    }
}
