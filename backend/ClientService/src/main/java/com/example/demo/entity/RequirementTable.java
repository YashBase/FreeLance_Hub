package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "requirement_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequirementTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    private Integer reqId;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private ClientTable client;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "budget", nullable = false, precision = 10, scale = 2)
    private BigDecimal budget;

    @Column(name = "status")
    private Integer status; // You can map to an enum if needed
}
