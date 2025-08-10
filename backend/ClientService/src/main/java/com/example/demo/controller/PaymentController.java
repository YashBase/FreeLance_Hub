package com.example.demo.controller;



import com.example.demo.entity.Payment;
import com.example.demo.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Endpoint for client to make payment for a completed task.
     * 
     * Example:
     * POST /api/payment/make?clientId=1&vendorId=2&taskId=3&amount=500.00
     *
     * @param clientId Client making the payment
     * @param vendorId Vendor receiving payment
     * @param taskId Task for which payment is made
     * @param amount Payment amount
     * @return Saved Payment entity
     */
    @PostMapping("/make")
    public ResponseEntity<Payment> makePayment(
            @RequestParam Integer clientId,
            @RequestParam Integer vendorId,
            @RequestParam Integer taskId,
            @RequestParam BigDecimal amount) {

        Payment payment = paymentService.makePayment(clientId, vendorId, taskId, amount);
        return ResponseEntity.ok(payment);
    }

    /**
     * Endpoint for client to view their payment history.
     * 
     * Example:
     * GET /api/payment/history/{clientId}
     *
     * @param clientId Client ID
     * @return List of Payment entities made by the client
     */
    @GetMapping("/history/{clientId}")
    public ResponseEntity<List<Payment>> getPaymentHistoryByClient(@PathVariable Integer clientId) {
        List<Payment> paymentHistory = paymentService.getPaymentHistoryByClient(clientId);
        return ResponseEntity.ok(paymentHistory);
    }
}
