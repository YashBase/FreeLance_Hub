package com.example.demo.service;


import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Proposal;
import com.example.demo.entity.RequirementTable;
import com.example.demo.entity.TaskTable;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.RequirementRepository;
import com.example.demo.repository.TaskRepository;

@Service
public class ProposalService {

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private RequirementRepository requirementRepository;

    @Autowired
    private TaskRepository taskRepository;
    /**
     * Fetches all proposals for the requirements of a specific client.
     *
     * @param loggedInClientId The ID of the logged-in client.
     * @return A list of proposals for the client's requirements.
     */
    public List<Proposal> getProposalsForClientRequirements(int loggedInClientId) {
        return proposalRepository.findByRequirementClientId(loggedInClientId);
    }

    /**
     * Accepts a proposal, which automatically rejects other proposals for the same requirement
     * and closes the requirement.
     *
     * @param proposalId       The ID of the proposal to accept.
     * @param loggedInClientId The ID of the client performing the action.
     * @return The updated, accepted proposal.
     * @throws IllegalStateException    if the requirement does not belong to the logged-in client.
     * @throws IllegalArgumentException if the proposal is not found.
     */
    @Transactional
    public Proposal acceptProposal(int proposalId, int loggedInClientId) {
        Proposal acceptedProposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new IllegalArgumentException("Proposal not found with id: " + proposalId));

        RequirementTable requirement = acceptedProposal.getRequirement();

        if (requirement.getClient().getClientId() != loggedInClientId) {
            throw new IllegalStateException("You are not authorized to accept this proposal.");
        }

        // Set the accepted proposal's status
        acceptedProposal.setStatus("accepted");
        proposalRepository.save(acceptedProposal);

        // Reject all other proposals for the same requirement
        List<Proposal> otherProposals = proposalRepository.findByRequirementReqId(requirement.getReqId());
        for (Proposal other : otherProposals) {
            if (other.getProposalId() != acceptedProposal.getProposalId()) {
                other.setStatus("rejected");
                proposalRepository.save(other);
            }
        }

        // Update the requirement status to 1 (closed)
        requirement.setStatus(1);
        requirementRepository.save(requirement);

        // The vendor will see the change in their dashboard.
        // A new task will be created for the vendor based on this acceptance.
        // The vendor-side logic will handle task creation.

        return acceptedProposal;
    }

    /**
     * Rejects a specific proposal.
     *
     * @param proposalId       The ID of the proposal to reject.
     * @param loggedInClientId The ID of the client performing the action.
     * @return The updated, rejected proposal.
     * @throws IllegalStateException    if the requirement does not belong to the logged-in client.
     * @throws IllegalArgumentException if the proposal is not found.
     */
    @Transactional
    public Proposal rejectProposal(int proposalId, int loggedInClientId) {
        Proposal proposalToReject = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new IllegalArgumentException("Proposal not found with id: " + proposalId));

        if (proposalToReject.getRequirement().getClient().getClientId() != loggedInClientId) {
            throw new IllegalStateException("You are not authorized to reject this proposal.");
        }

        proposalToReject.setStatus("rejected");
        return proposalRepository.save(proposalToReject);
    }
    
    @Transactional
    public Proposal acceptProposal(Integer proposalId) {
        // 1️⃣ Fetch proposal
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new RuntimeException("Proposal not found"));

        // 2️⃣ Update proposal status
        proposal.setStatus("accepted");
        proposalRepository.save(proposal);

        // 3️⃣ Create task
        TaskTable task = TaskTable.builder()
                .proposal(proposal)
                .taskName(proposal.getRequirement().getTitle())
                .taskDescription(proposal.getSummary())
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(7)) // default deadline
                .status(TaskTable.TaskStatus.started)
                .build();

        taskRepository.save(task);

        return proposal;
    }
}