package com.example.demo.repository;


import com.example.demo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // Find all payments made by a specific client for any vendor
    List<Payment> findByClientClientId(Integer clientId);
    
    /**
     * Sum of payments made by the client.
     */
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.client.clientId = :clientId")
    BigDecimal totalPaymentsMadeByClient(Integer clientId);
    
    List<Payment> findByStatus(String status);   // find pending/paid


}
