package com.example.demo.repository;

import com.example.demo.entity.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Integer> {

    // Find proposals for a vendor
    List<Proposal> findByVendorVendorId(Integer vendorId);

    // Find proposals for a requirement
    List<Proposal> findByRequirementReqId(Integer reqId);

    // Find a specific proposal for a requirement & vendor
    Optional<Proposal> findByRequirementReqIdAndVendorVendorId(Integer reqId, Integer vendorId);
    
    long countByVendorVendorId(Integer vendorId);

    long countByVendorVendorIdAndStatus(Integer vendorId, com.example.demo.DTO.ProposalStatus status);

    List<Proposal> findByVendorVendorIdAndStatus(Integer vendorId, com.example.demo.DTO.ProposalStatus status);
}
