package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.Requirement;
import com.example.demo.model.Proposal;
import com.example.demo.model.Task;
import com.example.demo.model.Vendor;
import com.example.demo.model.VendorFeedback;

import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.RequirementRepository;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.VendorFeedbackRepository;
import com.example.demo.repository.VendorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private RequirementRepository requirementRepository;

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private VendorFeedbackRepository vendorFeedbackRepository;

    @Autowired
    private VendorRepository vendorRepository;

    // ✅ 1. Get client by email
    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findAll().stream()
            .filter(c -> c.getUser().getEmail().equalsIgnoreCase(email))
            .findFirst();
    }

    // ✅ 2. Get all requirements by client email
    public List<Requirement> getRequirementsByClientEmail(String email) {
        return getClientByEmail(email)
                .map(client -> requirementRepository.findByClient(client))
                .orElse(Collections.emptyList());
    }

    // ✅ 3. Get all proposals received by this client
    public List<Proposal> getProposalsByClientEmail(String email) {
        List<Requirement> requirements = getRequirementsByClientEmail(email);
        List<Proposal> allProposals = new ArrayList<>();

        for (Requirement req : requirements) {
            allProposals.addAll(proposalRepository.findByRequirement(req));
        }

        return allProposals;
    }

    // ✅ 4. Accept a proposal (with status check & task creation)
    public String acceptProposal(int proposalId) {
        Optional<Proposal> optionalProposal = proposalRepository.findById(proposalId);

        if (optionalProposal.isPresent()) {
            Proposal proposal = optionalProposal.get();

            // 🔒 Check status before accepting
            if (!proposal.getStatus().equalsIgnoreCase("pending")) {
                return "This proposal is already " + proposal.getStatus() + ".";
            }

            proposal.setStatus("accepted");
            proposalRepository.save(proposal);

            // Auto-create task
            Task task = new Task();
            task.setProposal(proposal);
            task.setTaskName("Initial Task");
            task.setTaskDescription("Auto-created task after proposal acceptance");
            task.setStartDate(new Date());

            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DAY_OF_MONTH, 7);
            task.setEndDate(cal.getTime());

            taskRepository.save(task);

            return "Proposal accepted and task created.";
        }

        return "Proposal not found.";
    }

    // ✅ 5. Reject a proposal (with status check)
    public String rejectProposal(int proposalId) {
        Optional<Proposal> optionalProposal = proposalRepository.findById(proposalId);

        if (optionalProposal.isPresent()) {
            Proposal proposal = optionalProposal.get();

            if (!proposal.getStatus().equalsIgnoreCase("pending")) {
                return "This proposal is already " + proposal.getStatus() + ".";
            }

            proposal.setStatus("rejected");
            proposalRepository.save(proposal);
            return "Proposal rejected.";
        }

        return "Proposal not found.";
    }

    // ✅ 6. Give Feedback to a Vendor (with rating validation)
    public String giveVendorFeedback(int vendorId, int clientId, double rating) {
        if (rating < 1 || rating > 5) {
            return "Rating must be between 1 and 5.";
        }

        Optional<Client> client = clientRepository.findById(clientId);
        Optional<Vendor> vendor = vendorRepository.findById(vendorId);

        if (client.isPresent() && vendor.isPresent()) {
            VendorFeedback feedback = new VendorFeedback();
            feedback.setClient(client.get());
            feedback.setVendor(vendor.get());
            feedback.setRating(rating);

            vendorFeedbackRepository.save(feedback);
            return "Feedback submitted!";
        }

        return "Client or Vendor not found.";
    }
}
