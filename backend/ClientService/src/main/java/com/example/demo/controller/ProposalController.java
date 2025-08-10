package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Proposal;
import com.example.demo.service.ProposalService;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    /**
     * Get all proposals for the logged-in client's requirements.
     *
     * @param clientId the logged-in client id (can be retrieved from JWT/session in real apps)
     * @return list of proposals
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Proposal>> getProposalsForClient(@PathVariable int clientId) {
        List<Proposal> proposals = proposalService.getProposalsForClientRequirements(clientId);
        return ResponseEntity.ok(proposals);
    }

    /**
     * Accept a proposal by id.
     *
     * @param proposalId      the proposal id to accept
     * @param clientId        the logged-in client id
     * @return the updated accepted proposal
     */
    @PostMapping("/{proposalId}/accept")
    public ResponseEntity<Proposal> acceptProposal(
            @PathVariable int proposalId,
            @RequestParam int clientId) {

        Proposal acceptedProposal = proposalService.acceptProposal(proposalId, clientId);
        return ResponseEntity.ok(acceptedProposal);
    }

    /**
     * Reject a proposal by id.
     *
     * @param proposalId      the proposal id to reject
     * @param clientId        the logged-in client id
     * @return the updated rejected proposal
     */
    @PostMapping("/{proposalId}/reject")
    public ResponseEntity<Proposal> rejectProposal(
            @PathVariable int proposalId,
            @RequestParam int clientId) {

        Proposal rejectedProposal = proposalService.rejectProposal(proposalId, clientId);
        return ResponseEntity.ok(rejectedProposal);
    }
}
