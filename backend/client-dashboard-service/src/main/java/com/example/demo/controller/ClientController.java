package com.example.demo.controller;

import com.example.demo.model.Requirement;
import com.example.demo.model.Proposal;
import com.example.demo.model.Task;
import com.example.demo.model.VendorFeedback;
import com.example.demo.service.ClientService;
import com.example.demo.service.RequirementService;
import com.example.demo.service.TaskService;
import com.example.demo.service.VendorFeedbackService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private RequirementService requirementService;

    @Autowired
    private VendorFeedbackService vendorFeedbackService;

    @Autowired
    private TaskService taskService; // ✅ New

    // ✅ 0. Add a new requirement
    @PostMapping("/requirements")
    public ResponseEntity<String> addRequirement(@RequestBody Requirement requirement) {
        requirementService.addRequirement(requirement);
        return ResponseEntity.ok("Requirement added successfully!");
    }

    // ✅ 1. Get all requirements by client email
    @GetMapping("/requirements/{email}")
    public ResponseEntity<List<Requirement>> getRequirements(@PathVariable String email) {
        List<Requirement> requirements = clientService.getRequirementsByClientEmail(email);
        return ResponseEntity.ok(requirements);
    }

    // ✅ 2. Get all proposals received by this client
    @GetMapping("/proposals/{email}")
    public ResponseEntity<List<Proposal>> getProposals(@PathVariable String email) {
        List<Proposal> proposals = clientService.getProposalsByClientEmail(email);
        return ResponseEntity.ok(proposals);
    }

    // ✅ 3. Accept a proposal
    @PostMapping("/accept-proposal/{proposalId}")
    public ResponseEntity<String> acceptProposal(@PathVariable int proposalId) {
        String result = clientService.acceptProposal(proposalId);
        return ResponseEntity.ok(result);
    }

    // ✅ 4. Reject a proposal
    @PostMapping("/reject-proposal/{proposalId}")
    public ResponseEntity<String> rejectProposal(@PathVariable int proposalId) {
        String result = clientService.rejectProposal(proposalId);
        return ResponseEntity.ok(result);
    }

    // ✅ 5. Submit actual vendor feedback
    @PostMapping("/submit-feedback")
    public ResponseEntity<VendorFeedback> submitFeedback(
            @RequestParam int vendorId,
            @RequestParam int clientId,
            @RequestParam double rating
    ) {
        VendorFeedback feedback = vendorFeedbackService.submitFeedback(vendorId, clientId, rating);
        return ResponseEntity.ok(feedback);
    }

    // ✅ 6. Get tasks assigned to the client
    @GetMapping("/tasks/{email}")
    public ResponseEntity<List<Task>> getClientTasks(@PathVariable String email) {
        List<Task> tasks = taskService.getTasksByClientEmail(email);
        return ResponseEntity.ok(tasks);
    }
}
