package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vendor_table")
public class VendorTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vendor_id")
    private Integer vendorId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserTable user;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "rating")
    private Double rating;

    // Constructors
    public VendorTable(Integer vendorId, UserTable user, Integer experience, Double rating) {
        this.vendorId = vendorId;
        this.user = user;
        this.experience = experience;
        this.rating = rating;
    }

    public VendorTable() {
        // Default constructor
    }

    // Getters and Setters
    public Integer getVendorId() {
        return vendorId;
    }

    public void setVendorId(Integer vendorId) {
        this.vendorId = vendorId;
    }

    public UserTable getUser() {
        return user;
    }

    public void setUser(UserTable user) {
        this.user = user;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    // --------------------
    // Builder Pattern
    // --------------------
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Integer vendorId;
        private UserTable user;
        private Integer experience;
        private Double rating;

        public Builder vendorId(Integer vendorId) {
            this.vendorId = vendorId;
            return this;
        }

        public Builder user(UserTable user) {
            this.user = user;
            return this;
        }

        public Builder experience(Integer experience) {
            this.experience = experience;
            return this;
        }

        public Builder rating(Double rating) {
            this.rating = rating;
            return this;
        }

        public VendorTable build() {
            return new VendorTable(vendorId, user, experience, rating);
        }
    }
}
