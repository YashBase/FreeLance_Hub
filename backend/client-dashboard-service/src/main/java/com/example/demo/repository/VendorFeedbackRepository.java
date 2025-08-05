package com.example.demo.repository;

import com.example.demo.model.VendorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendorFeedbackRepository extends JpaRepository<VendorFeedback, Integer> {
    List<VendorFeedback> findByVendor_VendorId(int vendorId);
}
