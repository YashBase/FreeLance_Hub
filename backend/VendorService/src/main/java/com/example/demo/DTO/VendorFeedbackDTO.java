package com.example.demo.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VendorFeedbackDTO {

    private BigDecimal rating;
    private String clientName;
    private String taskLink;  // URL or some identifier, we'll form a link with the taskId
}
