package com.example.demo.DTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequirementRequest {
    private String title;
    private String description;
    private BigDecimal budget;
    private List<Integer> skillIds; // Skills to attach
}


    
    
	
    
