package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    // Fetch tasks by vendorId where the linked proposal is accepted
    @Query("""
      SELECT t FROM Task t
      JOIN t.proposal p
      WHERE p.vendor.vendorId = :vendorId
        AND p.status = 'accepted'
      """)
    List<Task> findTasksByVendorIdAndAcceptedProposal(Integer vendorId);
    
    List<Task> findByProposalVendorVendorId(Integer vendorId);
    
    // Count tasks assigned to vendor (via proposal)
    long countByProposalVendorVendorId(Integer vendorId);

    // Count tasks by status per vendor
    long countByProposalVendorVendorIdAndStatus(Integer vendorId, String status);

    // Optionally list tasks by vendor and status for additional use
    List<Task> findByProposalVendorVendorIdAndStatus(Integer vendorId, String status);
}
