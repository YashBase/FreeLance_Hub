package com.example.demo.services;



import com.example.demo.DTO.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
}
