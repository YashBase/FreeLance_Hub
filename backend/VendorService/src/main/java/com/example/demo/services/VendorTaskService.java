package com.example.demo.services;



import com.example.demo.DTO.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VendorTaskService {

    private final TaskRepository taskRepository;

    /**
     * Return all accepted tasks assigned to a vendor, wrapped in DTO.
     */
    public List<VendorTaskDTO> getAcceptedTasksForVendor(Integer vendorId) {
        List<Task> tasks = taskRepository.findTasksByVendorIdAndAcceptedProposal(vendorId);

        return tasks.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private VendorTaskDTO mapToDTO(Task task) {
        RequirementTable req = task.getProposal().getRequirement();
        Client client = req.getClient();
        User clientUser = client.getUser();

        return new VendorTaskDTO(
                task.getTaskName(),
                req.getTitle(),
                clientUser.getUserName(),
                task.getEndDate(),
                task.getStatus()
        );
    }
    /**
     * Update the status of a task, enforcing allowed transitions:
     * 'started' -> 'in progress' -> 'completed'
     */
    @Transactional
    public Task updateTaskStatus(Integer taskId, String newStatus) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        validateStatusTransition(task.getStatus(), newStatus);

        task.setStatus(newStatus);

        return taskRepository.save(task);
    }

    private void validateStatusTransition(String currentStatus, String newStatus) {
        if (currentStatus.equalsIgnoreCase(newStatus)) {
            return; // no change
        }

        switch (currentStatus.toLowerCase()) {
            case "started":
                if (!newStatus.equalsIgnoreCase("in progress")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Invalid status transition from 'started' to '" + newStatus + "'. Allowed: 'in progress'");
                }
                break;
            case "in progress":
                if (!newStatus.equalsIgnoreCase("completed")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Invalid status transition from 'in progress' to '" + newStatus + "'. Allowed: 'completed'");
                }
                break;
            case "completed":
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Task is already completed. No further status updates allowed.");
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Unknown current task status: " + currentStatus);
        }
    }

    /**
     * Get all tasks assigned to a vendor.
     */
    public List<Task> getTasksByVendorId(Integer vendorId) {
        return taskRepository.findByProposalVendorVendorId(vendorId);
    }
}
