package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.TaskTable;
import com.example.demo.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public List<TaskTable> searchTasks(Integer clientId, TaskTable.TaskStatus status, String keyword) {
        return taskRepository.searchTasks(clientId, status, keyword);
    }
}

