package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "requirementskill_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequirementSkillTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reqskill_id")
    private Integer reqskillId;

    @ManyToOne(fetch = FetchType.LAZY)  // fetch lazy is recommended for associations
    @JoinColumn(name = "req_id", nullable = false)
    private RequirementTable requirement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    @JsonIgnore
    private SkillTable skill;
}
