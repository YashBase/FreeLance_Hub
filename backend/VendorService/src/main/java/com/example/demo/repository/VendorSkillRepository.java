package com.example.demo.repository;

import com.example.demo.entity.VendorSkillsTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorSkillRepository extends JpaRepository<VendorSkillsTable, Integer> {

    // Find all skills for a vendor
    List<VendorSkillsTable> findByVendorVendorId(Integer vendorId);

    // Custom method to find mapping by vendor and skill
    VendorSkillsTable findByVendorVendorIdAndSkillSkillId(Integer vendorId, Integer skillId);

    // Delete by vendor and skill
    void deleteByVendorVendorIdAndSkillSkillId(Integer vendorId, Integer skillId);
}
