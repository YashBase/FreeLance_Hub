package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.ClientTable;
import com.example.demo.entities.UserTable;

@Repository
public interface ClientRepository extends JpaRepository<ClientTable, Integer> {
    Optional<ClientTable> findByUser(UserTable user);
}