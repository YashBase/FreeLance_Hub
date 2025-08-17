package com.example.demo.controller;

import com.example.demo.entity.Payment;
import com.example.demo.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor/payments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Get all payments for a vendor
     */
    @GetMapping("/{vendorId}")
    public ResponseEntity<List<Payment>> getPaymentsByVendorId(@PathVariable Integer vendorId) {
        return ResponseEntity.ok(paymentService.getPaymentsByVendorId(vendorId));
    }
}
