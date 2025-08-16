package com.example.demo.service;

import com.example.demo.DTO.PaymentDTO;
import com.example.demo.entity.ClientTable;
import com.example.demo.entity.Payment;
import com.example.demo.entity.TaskTable;
import com.example.demo.entity.VendorTable;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.VendorRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ClientRepository clientRepository;
    private final VendorRepository vendorRepository;
    private final TaskRepository taskRepository;

    // Explicit constructor
    public PaymentService(PaymentRepository paymentRepository,
                          ClientRepository clientRepository,
                          VendorRepository vendorRepository,
                          TaskRepository taskRepository) {
        this.paymentRepository = paymentRepository;
        this.clientRepository = clientRepository;
        this.vendorRepository = vendorRepository;
        this.taskRepository = taskRepository;
    }

    @Transactional
    public PaymentDTO makePayment(Integer clientId, Integer vendorId, Integer taskId, BigDecimal amount) {

        ClientTable client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        VendorTable vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        TaskTable task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        Payment payment = Payment.builder()
                .client(client)
                .vendor(vendor)
                .task(task)
                .amount(amount)
                .date(new Date())
                .build();

        Payment saved = paymentRepository.save(payment);

        return new PaymentDTO(
                saved.getPaymentId(),
                saved.getTask().getTaskName(),
                saved.getTask().getTaskId(),
                saved.getVendor().getVendorId(),
                saved.getAmount(),
                saved.getDate()
        );
    }

    public List<PaymentDTO> getPaymentHistoryByClient(Integer clientId) {
        List<Payment> payments = paymentRepository.findByClientClientId(clientId);

        return payments.stream()
                .map(p -> new PaymentDTO(
                        p.getPaymentId(),
                        p.getTask().getTaskName(),
                        p.getTask().getTaskId(),
                        p.getVendor().getVendorId(),
                        p.getAmount(),
                        p.getDate()
                ))
                .collect(Collectors.toList());
    }
}
