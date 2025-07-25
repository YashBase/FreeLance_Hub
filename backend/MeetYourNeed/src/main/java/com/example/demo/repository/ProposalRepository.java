package com.example.demo.repository;

import com.example.demo.model.Proposal;
import com.example.demo.model.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Integer> {
    List<Proposal> findByRequirement(Requirement requirement);
}
