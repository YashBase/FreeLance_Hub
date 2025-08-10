package com.example.demo.DTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequirementResponse {
    private Integer reqId;
    private String title;
    private String description;
    private BigDecimal budget;
    private Integer status;
    private List<String> skills;
}
