package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.PostRequirementRequest;
import com.example.demo.DTO.RequirementResponse;
import com.example.demo.service.RequirementService;

@RestController
@RequestMapping("/api/requirements")
public class RequirementController {

    @Autowired
    private RequirementService requirementService;

    // Endpoint to post a new requirement
    @PostMapping("/post/{clientId}")
    public ResponseEntity<RequirementResponse> postRequirement(
            @RequestBody PostRequirementRequest request,
            @PathVariable("clientId") Integer clientId) {

        RequirementResponse response = requirementService.postRequirement(request, clientId);
        return ResponseEntity.ok(response);
    }

    // Endpoint to get all requirements for the logged-in client
    @GetMapping("/my/{clientId}")
    public ResponseEntity<List<RequirementResponse>> getMyRequirements(@PathVariable("clientId") Integer clientId) {
        List<RequirementResponse> responses = requirementService.getMyRequirements(clientId);
        return ResponseEntity.ok(responses);
    }
}
