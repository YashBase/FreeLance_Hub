package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.Requirement;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.RequirementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequirementService {

    @Autowired
    private RequirementRepository requirementRepository;

    @Autowired
    private ClientRepository clientRepository;

    // ✅ Add a new requirement
    public Requirement addRequirement(Requirement req) {
        if (req.getClient() == null || req.getClient().getClientId() == 0) {
            throw new IllegalArgumentException("Client must be provided with a valid client ID");
        }

        Optional<Client> clientOpt = clientRepository.findByClientId(req.getClient().getClientId());
        if (clientOpt.isEmpty()) {
            throw new IllegalArgumentException("Client not found for ID: " + req.getClient().getClientId());
        }

        req.setClient(clientOpt.get());
        return requirementRepository.save(req);
    }

    // ✅ Get all requirements for a given client
    public List<Requirement> getRequirementsByClientId(int clientId) {
        return requirementRepository.findByClient_ClientId(clientId);
    }

    // ✅ Update requirement
    public Requirement updateRequirement(Requirement updated) {
        Optional<Requirement> existing = requirementRepository.findById(updated.getReqId());
        if (existing.isPresent()) {
            Requirement r = existing.get();
            r.setTitle(updated.getTitle());
            r.setDescription(updated.getDescription());
            r.setBudget(updated.getBudget());
            return requirementRepository.save(r);
        } else {
            throw new IllegalArgumentException("Requirement not found for ID: " + updated.getReqId());
        }
    }

    // ✅ Delete requirement
    public void deleteRequirement(int reqId) {
        if (requirementRepository.existsById(reqId)) {
            requirementRepository.deleteById(reqId);
        } else {
            throw new IllegalArgumentException("Requirement not found for ID: " + reqId);
        }
    }
}
