package com.example.demo.repository;

import com.example.demo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // Find all payments for a specific vendor
    List<Payment> findByVendorVendorId(Integer vendorId);
    


    // Sum of payments received by vendor
    // Spring Data JPA does not support sum aggregation by default so we need a custom query:

    @org.springframework.data.jpa.repository.Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.vendor.vendorId = :vendorId")
    java.math.BigDecimal getTotalPaymentsByVendorId(Integer vendorId);
}
