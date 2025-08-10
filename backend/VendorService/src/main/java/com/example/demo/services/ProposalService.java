package com.example.demo.services;

import com.example.demo.DTO.ProposalStatus;
import com.example.demo.entity.Proposal;
import com.example.demo.entity.RequirementTable;
import com.example.demo.entity.VendorTable;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.RequirementRepository;
import com.example.demo.repository.VendorRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

public interface ProposalService {
    Proposal submitProposal(Integer vendorId, Integer reqId, String summary);

    Optional<Proposal> getProposalById(Integer proposalId);

    List<Proposal> getProposalsByVendor(Integer vendorId);

    List<Proposal> getProposalsByRequirement(Integer reqId);
}

/**
 * Service Implementation for ProposalService
 */
@Service
@RequiredArgsConstructor
class ProposalServiceImpl implements ProposalService {

    private final ProposalRepository proposalRepository;
    private final RequirementRepository requirementRepository;
    private final VendorRepository vendorRepository;

    @Override
    @Transactional
    public Proposal submitProposal(Integer vendorId, Integer reqId, String summary) {
        // 1) Fetch vendor entity
        VendorTable vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        // 2) Fetch requirement entity
        RequirementTable req = requirementRepository.findById(reqId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Requirement not found"));

        // 3) Prevent duplicate proposals
        Optional<Proposal> existing = proposalRepository.findByRequirementReqIdAndVendorVendorId(reqId, vendorId);
        if (existing.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "You have already submitted a proposal for this requirement");
        }

        // 4) Create and save proposal
        Proposal p = Proposal.builder()
                .requirement(req)
                .vendor(vendor)
                .summary(summary)
                .status(ProposalStatus.pending) // Ensure Proposal entity handles enum/string properly
                .build();

        return proposalRepository.save(p);
    }

    @Override
    public Optional<Proposal> getProposalById(Integer proposalId) {
        return proposalRepository.findById(proposalId);
    }

    @Override
    public List<Proposal> getProposalsByVendor(Integer vendorId) {
        return proposalRepository.findByVendorVendorId(vendorId);
    }

    @Override
    public List<Proposal> getProposalsByRequirement(Integer reqId) {
        return proposalRepository.findByRequirementReqId(reqId);
    }
}
