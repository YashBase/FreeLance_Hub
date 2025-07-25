package com.example.demo.repository;

import com.example.demo.model.VendorFeedback;
import com.example.demo.model.Client;
import com.example.demo.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendorFeedbackRepository extends JpaRepository<VendorFeedback, Integer> {
    List<VendorFeedback> findByClient(Client client);
    List<VendorFeedback> findByVendor(Vendor vendor);
}
