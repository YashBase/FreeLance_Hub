package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "requirement_table")
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    private int reqId;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private String title;

    private String description;

    private BigDecimal budget;

    // Getters and Setters
    public int getReqId() { return reqId; }
    public void setReqId(int reqId) { this.reqId = reqId; }

    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getBudget() { return budget; }
    public void setBudget(BigDecimal budget) { this.budget = budget; }
}
