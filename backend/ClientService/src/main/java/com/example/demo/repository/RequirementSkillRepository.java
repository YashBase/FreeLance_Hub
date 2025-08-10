package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.RequirementSkillTable;
import com.example.demo.entity.RequirementTable;

import java.util.List;


@Repository
public interface RequirementSkillRepository extends JpaRepository<RequirementSkillTable, Integer> {
    List<RequirementSkillTable> findByRequirement(RequirementTable requirement);
}
