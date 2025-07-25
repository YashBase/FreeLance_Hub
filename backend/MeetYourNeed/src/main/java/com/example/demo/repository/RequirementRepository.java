package com.example.demo.repository;

import com.example.demo.model.Requirement;
import com.example.demo.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequirementRepository extends JpaRepository<Requirement, Integer> {
    List<Requirement> findByClient(Client client);  // For logged-in client
}
