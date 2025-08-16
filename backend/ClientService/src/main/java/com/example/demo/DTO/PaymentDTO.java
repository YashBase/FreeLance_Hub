package com.example.demo.DTO;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentDTO {
    public PaymentDTO(Integer paymentId2, String taskName2, Integer taskId2, Integer vendorId2, BigDecimal amount2,
			java.util.Date date2) {
		// TODO Auto-generated constructor stub
	}
	private Integer paymentId;
    private String taskName;
    private Integer taskId;
    private Integer vendorId;
    private BigDecimal amount;
    private Date date;
}
