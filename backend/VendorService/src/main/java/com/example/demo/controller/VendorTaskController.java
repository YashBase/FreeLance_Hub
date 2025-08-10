package com.example.demo.controller;


import com.example.demo.DTO.VendorTaskDTO;
import com.example.demo.services.VendorTaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor/tasks")
@AllArgsConstructor
public class VendorTaskController {

    private final VendorTaskService vendorTaskService;

    /**
     * Get all accepted tasks assigned to the vendor.
     * 
     * @param vendorId The vendor's ID (could also be retrieved from auth token/session in real app)
     * @return List of tasks as DTOs
     */
    @GetMapping("/{vendorId}")
    public ResponseEntity<List<VendorTaskDTO>> getAcceptedTasks(@PathVariable Integer vendorId) {
        List<VendorTaskDTO> tasks = vendorTaskService.getAcceptedTasksForVendor(vendorId);
        return ResponseEntity.ok(tasks);
    }
}
