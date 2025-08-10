package com.example.demo.services;

import com.example.demo.entity.Payment;
import com.example.demo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    /**
     * Get all payments received by a vendor.
     */
    public List<Payment> getPaymentsByVendorId(Integer vendorId) {
        return paymentRepository.findByVendorVendorId(vendorId);
    }
}
