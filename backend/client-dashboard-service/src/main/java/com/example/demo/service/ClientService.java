package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.Proposal;
import com.example.demo.model.Requirement;
import com.example.demo.model.User;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.RequirementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private RequirementRepository requirementRepository;

    @Autowired
    private ProposalRepository proposalRepository;
    
    
    public Client getByUser(User user) {
    	return clientRepository.getByUser(user);
    }
    

    // ✅ Get client by email (based on embedded User object)
    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findAll().stream()
                .filter(client -> client.getUser() != null && email.equalsIgnoreCase(client.getUser().getEmail()))
                .findFirst();
    }

    // ✅ 1. Get requirements by client email
    public List<Requirement> getRequirementsByClientEmail(String email) {
        return getClientByEmail(email)
                .map(client -> requirementRepository.findByClient_ClientId(client.getClientId()))
                .orElse(Collections.emptyList());
    }

    // ✅ 2. Get proposals by client email
    public List<Proposal> getProposalsByClientEmail(String email) {
        Optional<Client> optionalClient = getClientByEmail(email);

        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            int clientId = client.getClientId();

            // Get all requirements for this client
            List<Requirement> clientRequirements = requirementRepository.findByClient_ClientId(clientId);

            // Extract requirement IDs
            List<Integer> reqIds = clientRequirements.stream()
                    .map(Requirement::getReqId)
                    .toList();

            // Filter proposals that belong to the client's requirements
            List<Proposal> allProposals = proposalRepository.findAll();

            return allProposals.stream()
                    .filter(p -> p.getRequirement() != null && reqIds.contains(p.getRequirement().getReqId()))
                    .toList();
        }

        return Collections.emptyList();
    }

    // ✅ 3. Accept a proposal
    public String acceptProposal(int proposalId) {
        return proposalRepository.findById(proposalId)
                .map(p -> {
                    p.setStatus("accepted");
                    proposalRepository.save(p);
                    return "Proposal accepted successfully";
                })
                .orElse("Proposal not found");
    }

    // ✅ 4. Reject a proposal
    public String rejectProposal(int proposalId) {
        return proposalRepository.findById(proposalId)
                .map(p -> {
                    p.setStatus("rejected");
                    proposalRepository.save(p);
                    return "Proposal rejected successfully";
                })
                .orElse("Proposal not found");
    }

    // ✅ 5. Give feedback (non-persistent for demo only)
    public String giveVendorFeedback(int vendorId, int clientId, double rating) {
        return "Feedback submitted (demo only): vendorId = " + vendorId + ", clientId = " + clientId + ", rating = " + rating;
    }
}
