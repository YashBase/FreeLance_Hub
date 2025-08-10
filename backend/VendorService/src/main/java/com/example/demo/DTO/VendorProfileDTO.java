package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class VendorProfileDTO {
    private Integer vendorId;
    private String userName;
    private String contact;
    private String email;
    private List<Integer> skillIds;
}
