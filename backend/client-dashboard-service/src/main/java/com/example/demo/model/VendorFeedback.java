package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vendor_feedback_table")
public class VendorFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venfeed_id")
    private int venfeedId;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private double rating;

    // Getters and Setters
    public int getVenfeedId() {
        return venfeedId;
    }

    public void setVenfeedId(int venfeedId) {
        this.venfeedId = venfeedId;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
