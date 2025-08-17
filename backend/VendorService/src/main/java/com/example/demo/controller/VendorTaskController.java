package com.example.demo.controller;

import com.example.demo.DTO.VendorTaskDTO;
import com.example.demo.services.VendorTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor/tasks")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VendorTaskController {

    private final VendorTaskService vendorTaskService;

    /**
     * ✅ Get accepted tasks for a vendor
     */
    @GetMapping("/accepted/{vendorId}")
    public ResponseEntity<List<VendorTaskDTO>> getAcceptedTasks(@PathVariable Integer vendorId) {
        return ResponseEntity.ok(vendorTaskService.getAcceptedTasksForVendor(vendorId));
    }

    /**
     * ✅ Get all tasks (DTO)
     */
    @GetMapping("/{vendorId}")
    public ResponseEntity<List<VendorTaskDTO>> getAllTasks(@PathVariable Integer vendorId) {
        return ResponseEntity.ok(vendorTaskService.getAllTasksForVendor(vendorId));
    }

    /**
     * ✅ Update status of a task and return updated DTO
     */
    @PutMapping("/{taskId}/status")
    public ResponseEntity<VendorTaskDTO> updateTaskStatus(
            @PathVariable Integer taskId,
            @RequestParam String newStatus
    ) {
        return ResponseEntity.ok(vendorTaskService.updateTaskStatusDTO(taskId, newStatus));
    }
}
