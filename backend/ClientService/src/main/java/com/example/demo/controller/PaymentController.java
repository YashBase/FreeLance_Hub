package com.example.demo.controller;

import com.example.demo.DTO.PaymentDTO;
import com.example.demo.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

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
     * @return Saved PaymentDTO
     */
    @PostMapping("/make")
    public ResponseEntity<PaymentDTO> makePayment(
            @RequestParam Integer clientId,
            @RequestParam Integer vendorId,
            @RequestParam Integer taskId,
            @RequestParam BigDecimal amount) {

        PaymentDTO paymentDTO = paymentService.makePayment(clientId, vendorId, taskId, amount);
        return ResponseEntity.ok(paymentDTO);
    }

    /**
     * Endpoint for client to view their payment history.
     *
     * Example:
     * GET /api/payment/history/{clientId}
     *
     * @param clientId Client ID
     * @return List of PaymentDTOs made by the client
     */
    @GetMapping("/history/{clientId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentHistoryByClient(@PathVariable Integer clientId) {
        List<PaymentDTO> paymentHistory = paymentService.getPaymentHistoryByClient(clientId);
        return ResponseEntity.ok(paymentHistory);
    }
}
