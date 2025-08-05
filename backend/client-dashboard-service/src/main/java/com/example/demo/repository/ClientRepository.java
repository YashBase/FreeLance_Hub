package com.example.demo.repository;

import com.example.demo.model.Client;
import com.example.demo.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Optional<Client> findByClientId(int clientId);
    
    @Query("select c from Client c where c.user = ?1")
    public Client getByUser(User user);
}
