package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Proposal;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Integer> {

    /**
     * Finds proposals for a specific client by their ID.
     * This query joins Proposal with Requirement to filter by client ID.
     */
    @Query("SELECT p FROM Proposal p WHERE p.requirement.client.clientId = :clientId")
    List<Proposal> findByRequirementClientId(@Param("clientId") int clientId);

    /**
     * Finds all proposals associated with a specific requirement ID.
     */
    List<Proposal> findByRequirementReqId(int reqId);
}