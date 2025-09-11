package com.example.demo.service;

import com.example.demo.DTO.PaymentDTO;
import com.example.demo.entity.ClientTable;
import com.example.demo.entity.Payment;
import com.example.demo.entity.TaskTable;
import com.example.demo.entity.TaskTable.TaskStatus;
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

    public PaymentService(PaymentRepository paymentRepository,
                          ClientRepository clientRepository,
                          VendorRepository vendorRepository,
                          TaskRepository taskRepository) {
        this.paymentRepository = paymentRepository;
        this.clientRepository = clientRepository;
        this.vendorRepository = vendorRepository;
        this.taskRepository = taskRepository;
    }

    /**
     * Auto-create a pending payment when task is marked completed
     */
    @Transactional
    public PaymentDTO createPendingPayment(Integer taskId, BigDecimal amount) {
        TaskTable task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        if (task.getStatus() != TaskStatus.completed) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task is not completed yet");
        }


        ClientTable client = task.getProposal().getRequirement().getClient();
        VendorTable vendor = task.getProposal().getVendor();

        Payment payment = Payment.builder()
                .task(task)
                .client(client)
                .vendor(vendor)
                .amount(amount)
                .date(new Date())
                .status("PENDING") // Initially pending
                .build();

        Payment saved = paymentRepository.save(payment);

        return new PaymentDTO(
                saved.getPaymentId(),
                task.getTaskName(),
                task.getTaskId(),
                vendor.getVendorId(),
                saved.getAmount(),
                saved.getDate(),
                saved.getStatus()
        );
    }

    /**
     * Confirm & pay pending payment
     */
    @Transactional
    public PaymentDTO confirmPayment(Integer paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found"));

        if (!"PENDING".equalsIgnoreCase(payment.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment is not pending");
        }

        payment.setStatus("PAID");
        Payment updated = paymentRepository.save(payment);

        return new PaymentDTO(
                updated.getPaymentId(),
                updated.getTask().getTaskName(),
                updated.getTask().getTaskId(),
                updated.getVendor().getVendorId(),
                updated.getAmount(),
                updated.getDate(),
                updated.getStatus()
        );
    }

    /**
     * View client’s payments
     */
    public List<PaymentDTO> getPaymentsByClient(Integer clientId) {
        return paymentRepository.findByClientClientId(clientId).stream()
                .map(p -> new PaymentDTO(
                        p.getPaymentId(),
                        p.getTask().getTaskName(),
                        p.getTask().getTaskId(),
                        p.getVendor().getVendorId(),
                        p.getAmount(),
                        p.getDate(),
                        p.getStatus()
                ))
                .collect(Collectors.toList());
    }

}
