package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

import com.example.demo.DTO.ProposalStatus;

@Entity
@Table(name = "proposals_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proposal_id")
    private Integer proposalId;

    @Column(name = "req_id", nullable = false)
    private Integer reqId;

    @Column(name = "vendor_id", nullable = false)
    private Integer vendorId;

    @Lob
    @Column(name = "summary")
    private String summary;

    // matches DB check constraint values: 'pending','accepted','rejected'
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProposalStatus status;

}
