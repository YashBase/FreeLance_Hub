package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.VendorTable;



@Repository
public interface VendorRepository extends JpaRepository<VendorTable, Integer> {
}
