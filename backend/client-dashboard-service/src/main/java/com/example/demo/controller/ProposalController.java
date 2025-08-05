package com.example.demo.controller;

import com.example.demo.dto.ProposalDTO;
import com.example.demo.model.Proposal;
import com.example.demo.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ProposalController {

    @Autowired
    private ProposalRepository proposalRepository;

    @GetMapping("/{clientId}/proposals")
    public List<ProposalDTO> getProposalsByClientId(@PathVariable int clientId) {
        List<Proposal> proposals = proposalRepository.findProposalsByClientId(clientId);

        return proposals.stream().map(p -> {
            ProposalDTO dto = new ProposalDTO();
            dto.setProposalId(p.getProposalId());
            dto.setSummary(p.getSummary());
            dto.setStatus(p.getStatus());
            dto.setRequirementTitle(p.getRequirement().getTitle());
            return dto;
        }).collect(Collectors.toList());
    }
}
