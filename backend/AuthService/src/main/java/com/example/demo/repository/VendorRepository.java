package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.UserTable;
import com.example.demo.entities.VendorTable;

public interface VendorRepository extends JpaRepository<VendorTable, Integer> {
    Optional<VendorTable> findByUser(UserTable user);
}
