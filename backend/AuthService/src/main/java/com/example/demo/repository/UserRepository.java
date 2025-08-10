package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.UserTable;

@Repository
public interface UserRepository extends JpaRepository<UserTable, Integer> {
    Optional<UserTable> findByEmail(String email);
}