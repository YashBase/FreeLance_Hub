package com.example.demo.controller;



import com.example.demo.entity.*;
import com.example.demo.DTO.ProposalStatus;
import com.example.demo.services.ProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/proposals")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProposalController {

    private final ProposalService proposalService;

    /**
     * Vendor submits a proposal for a requirement
     */
    @PostMapping("/submit")
    public ResponseEntity<Proposal> submitProposal(
            @RequestParam Integer vendorId,
            @RequestParam Integer reqId,
            @RequestParam String summary
    ) {
        Proposal proposal = proposalService.submitProposal(
                vendorId, reqId, summary
        );
        return ResponseEntity.ok(proposal);
    }

    /**
     * Get proposal by ID
     */
    @GetMapping("/{proposalId}")
    public ResponseEntity<Proposal> getProposalById(@PathVariable Integer proposalId) {
        return proposalService.getProposalById(proposalId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get proposals submitted by a vendor
     */
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<Proposal>> getProposalsByVendor(@PathVariable Integer vendorId) {
        return ResponseEntity.ok(proposalService.getProposalsByVendor(vendorId));
    }

    /**
     * Get proposals for a requirement
     */
    @GetMapping("/requirement/{reqId}")
    public ResponseEntity<List<Proposal>> getProposalsByRequirement(@PathVariable Integer reqId) {
        return ResponseEntity.ok(proposalService.getProposalsByRequirement(reqId));
    }

}
