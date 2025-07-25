package com.example.demo.controller;

import com.example.demo.model.Requirement;
import com.example.demo.model.Proposal;
import com.example.demo.service.ClientService;

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

    // ✅ 5. Submit feedback for a vendor
    @PostMapping("/feedback")
    public ResponseEntity<String> giveFeedback(
            @RequestParam int vendorId,
            @RequestParam int clientId,
            @RequestParam double rating
    ) {
        String result = clientService.giveVendorFeedback(vendorId, clientId, rating);
        return ResponseEntity.ok(result);
    }
}
