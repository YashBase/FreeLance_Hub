package com.example.demo.controller;

import com.example.demo.DTO.PaymentDTO;
import com.example.demo.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // When task is completed → create pending payment
    @PostMapping("/pending/{taskId}")
    public ResponseEntity<PaymentDTO> createPendingPayment(
            @PathVariable Integer taskId,
            @RequestParam BigDecimal amount) {
        return ResponseEntity.ok(paymentService.createPendingPayment(taskId, amount));
    }

    // Client confirms & pays
    @PutMapping("/confirm/{paymentId}")
    public ResponseEntity<PaymentDTO> confirmPayment(@PathVariable Integer paymentId) {
        return ResponseEntity.ok(paymentService.confirmPayment(paymentId));
    }

    // Client payment history
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByClient(@PathVariable Integer clientId) {
        return ResponseEntity.ok(paymentService.getPaymentsByClient(clientId));
    }
}
