package com.example.demo.repository;

import com.example.demo.entity.VendorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface VendorFeedbackRepository extends JpaRepository<VendorFeedback, Integer> {

    /**
     * Find all feedback submitted by a specific client (for viewing client feedback history)
     */
    List<VendorFeedback> findByClientClientId(Integer clientId);

    /**
     * Find all feedback received for a specific vendor
     */
    List<VendorFeedback> findByVendorVendorId(Integer vendorId);
    
    /**
     * Average rating given by the client.
     */
    @Query("SELECT COALESCE(AVG(vf.rating), 0) FROM VendorFeedback vf WHERE vf.client.clientId = :clientId")
    BigDecimal averageRatingGivenByClient(Integer clientId);
}
