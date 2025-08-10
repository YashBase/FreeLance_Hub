package com.example.demo.repository;

import com.example.demo.entity.SkillTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<SkillTable, Integer> {

}
