package com.example.demo.repository;



import com.example.demo.entity.VendorTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Repository interface for VendorTable entity
@Repository
public interface VendorRepository extends JpaRepository<VendorTable, Integer> {
    // Add custom queries if needed, e.g., find by userId or by rating
}
