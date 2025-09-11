package com.example.demo.DTO;

import java.math.BigDecimal;
import java.util.Date; 

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class PaymentDTO {
    private Integer paymentId;
    private Date date;
    private BigDecimal amount;
    private String status;  // ✅ include status
}
