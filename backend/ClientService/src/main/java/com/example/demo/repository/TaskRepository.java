package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TaskTable;

@Repository
public interface TaskRepository extends JpaRepository<TaskTable, Integer> {
	   @Query("SELECT t FROM TaskTable t " +
	           "WHERE t.proposal.requirement.client.clientId = :clientId " +
	           "AND (:status IS NULL OR t.status = :status) " +
	           "AND (:keyword IS NULL OR LOWER(t.taskName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    List<TaskTable> searchTasks(
	            @Param("clientId") Integer clientId,
	            @Param("status") TaskTable.TaskStatus status,
	            @Param("keyword") String keyword
	    );
	   
	   /**
	     * Count number of tasks completed for proposals that belong to client's requirements.
	     */
	    @Query("SELECT COUNT(t) FROM TaskTable t WHERE t.proposal.requirement.client.clientId = :clientId AND t.status = 'completed'")
	    long countCompletedTasksByClient(Integer clientId);
}


