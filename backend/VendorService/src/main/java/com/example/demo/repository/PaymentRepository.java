package com.example.demo.repository;

import com.example.demo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // ✅ Find all payments for a specific vendor
    List<Payment> findByVendorVendorId(Integer vendorId);

    // ✅ Find payments for a vendor by status (e.g., PAID or PENDING)
    List<Payment> findByVendorVendorIdAndStatus(Integer vendorId, String status);

    // ✅ Sum of all payments received by vendor
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.vendor.vendorId = :vendorId")
    BigDecimal getTotalPaymentsByVendorId(Integer vendorId);

    // ✅ Sum of payments received by vendor filtered by status
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.vendor.vendorId = :vendorId AND p.status = :status")
    BigDecimal getTotalPaymentsByVendorIdAndStatus(Integer vendorId, String status);
}
