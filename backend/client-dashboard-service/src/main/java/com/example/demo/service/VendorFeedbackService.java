package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.Vendor;
import com.example.demo.model.VendorFeedback;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.VendorFeedbackRepository;
import com.example.demo.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorFeedbackService {

    @Autowired
    private VendorFeedbackRepository feedbackRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ClientRepository clientRepository;

    public VendorFeedback submitFeedback(int vendorId, int clientId, double rating) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        VendorFeedback feedback = new VendorFeedback();
        feedback.setVendor(vendor);
        feedback.setClient(client);
        feedback.setRating(rating);

        return feedbackRepository.save(feedback);
    }

    public double getAverageRatingForVendor(int vendorId) {
        List<VendorFeedback> feedbacks = feedbackRepository.findByVendor_VendorId(vendorId);
        return feedbacks.stream()
                .mapToDouble(VendorFeedback::getRating)
                .average()
                .orElse(0.0);
    }
}
