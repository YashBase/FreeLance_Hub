package com.example.demo.repository;

import com.example.demo.model.Proposal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProposalRepository extends JpaRepository<Proposal, Integer> {
    // Custom methods can be added later if needed
	@Query("SELECT p FROM Proposal p WHERE p.requirement.client.clientId = :clientId")
	List<Proposal> findProposalsByClientId(@Param("clientId") int clientId);

}
