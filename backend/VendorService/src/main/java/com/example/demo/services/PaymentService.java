package com.example.demo.services;

import com.example.demo.DTO.PaymentDTO;
import com.example.demo.entity.Payment;
import com.example.demo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    /**
     * Get all payments for a given vendor and map to DTO
     */
    public List<PaymentDTO> getPaymentsByVendorId(Integer vendorId) {
        List<Payment> payments = paymentRepository.findByVendorVendorId(vendorId);

        return payments.stream()
                .map(p -> new PaymentDTO(
                        p.getPaymentId(),
                        p.getDate(),
                        p.getAmount(),
                        p.getStatus()
                ))
                .collect(Collectors.toList());
    }

    /**
     * Get total payments received by vendor
     */
    public BigDecimal getTotalPaymentsByVendorId(Integer vendorId) {
        return paymentRepository.getTotalPaymentsByVendorId(vendorId);
    }

    /**
     * Get payments for vendor filtered by status
     */
    public List<PaymentDTO> getPaymentsByVendorIdAndStatus(Integer vendorId, String status) {
        return paymentRepository.findByVendorVendorIdAndStatus(vendorId, status)
                .stream()
                .map(p -> new PaymentDTO(
                        p.getPaymentId(),
                        p.getDate(),
                        p.getAmount(),
                        p.getStatus()
                ))
                .collect(Collectors.toList());
    }

    /**
     * Get total payments received by vendor filtered by status
     */
    public BigDecimal getTotalPaymentsByVendorIdAndStatus(Integer vendorId, String status) {
        return paymentRepository.getTotalPaymentsByVendorIdAndStatus(vendorId, status);
    }
}
