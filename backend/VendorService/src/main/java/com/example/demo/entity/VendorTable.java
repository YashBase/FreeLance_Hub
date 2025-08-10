package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import com.example.demo.DTO.ProposalStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "vendor_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class VendorTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vendor_id")
    private Integer vendorId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

    @OneToMany(mappedBy = "vendor", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<VendorSkillsTable> vendorSkills;
}
