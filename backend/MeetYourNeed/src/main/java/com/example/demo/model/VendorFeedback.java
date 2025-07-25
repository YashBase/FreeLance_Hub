package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vendorfeedback_table")
public class VendorFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venfeed_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private Double rating;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Vendor getVendor() { return vendor; }
    public void setVendor(Vendor vendor) { this.vendor = vendor; }

    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
