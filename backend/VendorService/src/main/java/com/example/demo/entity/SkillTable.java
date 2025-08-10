package com.example.demo.entity;

import com.example.demo.DTO.ProposalStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skill_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class SkillTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id")
    private Integer skillId;

    @Column(name = "skill_name", nullable = false, unique = true)
    
    private String skillName;

    @Column(name = "skill_description")
    private String skillDescription;
}
