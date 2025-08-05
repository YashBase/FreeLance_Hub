package com.example.demo.service;

import com.example.demo.model.Vendor;
import com.example.demo.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public Optional<Vendor> getVendorByUserId(int userId) {
        return vendorRepository.findByUser_UserId(userId);
    }

    public Optional<Vendor> getVendorById(int vendorId) {
        return vendorRepository.findById(vendorId);
    }

    public Vendor updateRating(int vendorId, double rating) {
        Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);
        if (vendorOpt.isPresent()) {
            Vendor v = vendorOpt.get();
            v.setRating(rating);
            return vendorRepository.save(v);
        }
        throw new RuntimeException("Vendor not found");
    }
}
