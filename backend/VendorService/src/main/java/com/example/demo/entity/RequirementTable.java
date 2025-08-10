package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import com.example.demo.DTO.ProposalStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "requirement_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder 
@Getter
@Setter// Ignore Hibernate internal props for JSON serialization
public class RequirementTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    private Integer reqId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    @JsonIgnore
    private Client client;


    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "budget", nullable = false, precision = 10, scale = 2)
    private BigDecimal budget;

    @Column(name = "status")
    private Integer status;

    @OneToMany(mappedBy = "requirement", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore // Avoid serializing the skill list by default (optional)
    private List<RequirementSkillTable> requirementSkills;
}
