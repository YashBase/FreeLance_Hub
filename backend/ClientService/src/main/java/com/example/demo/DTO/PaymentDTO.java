package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
public class PaymentDTO {
    private Integer paymentId;
    private String taskName;
    private Integer taskId;
    private Integer vendorId;
    private BigDecimal amount;
    private Date date;
    private String status;   // NEW: "PENDING", "PAID"
}
