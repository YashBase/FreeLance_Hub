package com.example.demo.services;

import com.example.demo.DTO.VendorTaskDTO;
import com.example.demo.entity.Client;
import com.example.demo.entity.RequirementTable;
import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.TaskRepository;
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
     * Return all accepted tasks assigned to a vendor (DTO)
     */
    public List<VendorTaskDTO> getAcceptedTasksForVendor(Integer vendorId) {
        List<Task> tasks = taskRepository.findTasksByVendorIdAndAcceptedProposal(vendorId);

        return tasks.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Return all tasks for a vendor in DTO format
     */
    public List<VendorTaskDTO> getAllTasksForVendor(Integer vendorId) {
        return taskRepository.findByProposalVendorVendorId(vendorId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update status of a task (returns Task entity)
     */
    @Transactional
    public Task updateTaskStatus(Integer taskId, String newStatus) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        validateStatusTransition(task.getStatus(), newStatus);

        task.setStatus(newStatus);

        return taskRepository.save(task);
    }

    /**
     * Update status of a task and return DTO
     */
    @Transactional
    public VendorTaskDTO updateTaskStatusDTO(Integer taskId, String newStatus) {
        Task updatedTask = updateTaskStatus(taskId, newStatus);
        return mapToDTO(updatedTask);
    }

    /**
     * Validate allowed status transitions
     */
    private void validateStatusTransition(String currentStatus, String newStatus) {
        if (currentStatus.equalsIgnoreCase(newStatus)) return;

        switch (currentStatus.toLowerCase()) {
            case "pending":
                if (!newStatus.equalsIgnoreCase("in progress")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Invalid status transition from 'pending' to '" + newStatus + "'. Allowed: 'in progress'");
                }
                break;
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
     * Map Task entity to DTO
     */
    private VendorTaskDTO mapToDTO(Task task) {
        RequirementTable req = task.getProposal().getRequirement();
        Client client = req.getClient();
        User clientUser = client.getUser();

        return new VendorTaskDTO(
                task.getTaskId(),
                task.getTaskName(),
                req.getTitle(),
                clientUser.getUserName(),
                task.getEndDate(),
                task.getStatus(),
                task.getTaskDescription() // map description
        );
    }
}
