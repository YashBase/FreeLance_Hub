package com.example.demo.repository;

import com.example.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Integer> {
    // prevent duplicates: find by reqId & vendorId
    Optional<Proposal> findByReqIdAndVendorId(Integer reqId, Integer vendorId);

    List<Proposal> findByVendorId(Integer vendorId);

    List<Proposal> findByReqId(Integer reqId);
}
