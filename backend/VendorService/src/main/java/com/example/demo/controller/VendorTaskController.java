package com.example.demo.controller;

import com.example.demo.DTO.VendorTaskDTO;
import com.example.demo.entity.Task;
import com.example.demo.services.VendorTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor/tasks")
@RequiredArgsConstructor
public class VendorTaskController {

    private final VendorTaskService vendorTaskService;

    /**
     * Get accepted tasks for a vendor (DTO view)
     */
    @GetMapping("/accepted/{vendorId}")
    public ResponseEntity<List<VendorTaskDTO>> getAcceptedTasks(@PathVariable Integer vendorId) {
        return ResponseEntity.ok(vendorTaskService.getAcceptedTasksForVendor(vendorId));
    }

    /**
     * Update status of a task
     */
    @PutMapping("/{taskId}/status")
    public ResponseEntity<Task> updateTaskStatus(
            @PathVariable Integer taskId,
            @RequestParam String newStatus
    ) {
        return ResponseEntity.ok(vendorTaskService.updateTaskStatus(taskId, newStatus));
    }

    /**
     * Get all tasks assigned to a vendor
     */
    @GetMapping("/{vendorId}")
    public ResponseEntity<List<Task>> getAllTasks(@PathVariable Integer vendorId) {
        return ResponseEntity.ok(vendorTaskService.getTasksByVendorId(vendorId));
    }
}
