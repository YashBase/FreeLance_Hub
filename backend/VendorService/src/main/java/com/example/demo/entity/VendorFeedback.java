package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

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
    private VendorTable vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

    /**
     * Feedback text is not explicitly specified in your schema dump, 
     * but typically stored somewhere. 
     * Since not present, we will omit any feedback text field as per your schema.
     */
}