package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.TaskTable;
import com.example.demo.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/client/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/{clientId}")
    public ResponseEntity<List<TaskTable>> getClientTasks(
            @PathVariable Integer clientId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String keyword) {

        TaskTable.TaskStatus taskStatus = null;
        if (status != null) {
            try {
                taskStatus = TaskTable.TaskStatus.valueOf(status.toLowerCase());
            } catch (IllegalArgumentException e) {
                taskStatus = null; // invalid value, ignore
            }
        }

        List<TaskTable> tasks = taskService.searchTasks(clientId, taskStatus, keyword);
        return ResponseEntity.ok(tasks);
    }


    
}

