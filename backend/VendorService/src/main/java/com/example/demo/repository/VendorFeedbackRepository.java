package com.example.demo.repository;

import com.example.demo.entity.VendorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface VendorFeedbackRepository extends JpaRepository<VendorFeedback, Integer> {

    // Find all feedback for a given vendor
    List<VendorFeedback> findByVendorVendorId(Integer vendorId);

    // Average rating for vendor
    @org.springframework.data.jpa.repository.Query("SELECT COALESCE(AVG(vf.rating), 0) FROM VendorFeedback vf WHERE vf.vendor.vendorId = :vendorId")
    BigDecimal getAverageRatingByVendorId(Integer vendorId);
}