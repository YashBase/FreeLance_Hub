package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vendor_table")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vendor_id")
    private int vendorId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int experience;

    private Double rating;

    // Getters and Setters
    public int getVendorId() { return vendorId; }
    public void setVendorId(int vendorId) { this.vendorId = vendorId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
