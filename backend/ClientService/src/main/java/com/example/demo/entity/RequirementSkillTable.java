package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "requirementskill_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequirementSkillTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reqskill_id")
    private Integer reqSkillId;

    @ManyToOne
    @JoinColumn(name = "req_id", nullable = false)
    private RequirementTable requirement;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private SkillTable skill;
}
