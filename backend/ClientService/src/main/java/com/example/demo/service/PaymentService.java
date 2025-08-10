package com.example.demo.service;



import com.example.demo.entity.ClientTable;
import com.example.demo.entity.Payment;
import com.example.demo.entity.TaskTable;
import com.example.demo.entity.VendorTable;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.VendorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ClientRepository clientRepository;
    private final VendorRepository vendorRepository;
    private final TaskRepository taskRepository;

    /**
     * Client makes payment for a completed task.
     * 
     * @param clientId Client making payment
     * @param vendorId Vendor receiving payment
     * @param taskId Task for which payment is made
     * @param amount Amount paid
     * @return Saved Payment entity
     */
    @Transactional
    public Payment makePayment(Integer clientId, Integer vendorId, Integer taskId, BigDecimal amount) {

        ClientTable client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        VendorTable vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        TaskTable task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        // Optional: Add business logic to check if task is actually completed, client/vendor match, etc.

        Payment payment = Payment.builder()
                .client(client)
                .vendor(vendor)
                .task(task)
                .amount(amount)
                .date(new Date()) // use current date
                .build();

        return paymentRepository.save(payment);
    }

    /**
     * Client views their payment history with details
     * 
     * @param clientId Client ID
     * @return List of payments made by the client
     */
    public List<Payment> getPaymentHistoryByClient(Integer clientId) {
        return paymentRepository.findByClientClientId(clientId);
    }
}
