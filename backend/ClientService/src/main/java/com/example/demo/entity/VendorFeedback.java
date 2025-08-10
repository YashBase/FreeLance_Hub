package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.qos.logback.core.net.server.Client;

@Entity
@Table(name = "vendorfeedback_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venfeed_id")
    private Integer venfeedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    @JsonIgnore
    private VendorTable vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    @JsonIgnore
    private ClientTable client;

    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

    // No feedback text column in your table, so omitted here

}
