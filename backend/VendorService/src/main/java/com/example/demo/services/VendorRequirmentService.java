package com.example.demo.services;


import com.example.demo.entity.RequirementTable;
import com.example.demo.repository.RequirementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorRequirmentService {

    private final RequirementRepository requirementRepository;

    public List<RequirementTable> getMatchedRequirements(Integer vendorId,
                                                          BigDecimal minBudget,
                                                          BigDecimal maxBudget,
                                                          String sortBy) {
        return requirementRepository.findMatchedRequirements(vendorId, minBudget, maxBudget, sortBy);
    }
}
