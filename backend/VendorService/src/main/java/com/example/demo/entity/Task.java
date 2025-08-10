package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ProposalStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

// ----------- ENTITIES -----------

@Entity
@Table(name = "task_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer taskId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "proposal_id", nullable = false)
  @JsonIgnore
  private Proposal proposal;

  @Column(name = "task_name")
  private String taskName;

  @Column(name = "task_description")
  private String taskDescription;

  @Column(name = "start_date")
  @Temporal(TemporalType.DATE)
  private Date startDate;

  @Column(name = "end_date")
  @Temporal(TemporalType.DATE)
  private Date endDate;

  @Column(name = "status")
  private String status;
}

