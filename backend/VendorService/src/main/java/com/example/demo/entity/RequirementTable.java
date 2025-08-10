package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "requirement_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder // Ignore Hibernate internal props for JSON serialization
public class RequirementTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    private Integer reqId;

    @Column(name = "client_id", nullable = false)
    private Integer clientId;

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
