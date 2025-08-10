package com.example.demo.services;

import com.example.demo.DTO.*;
import com.example.demo.entity.*;
import com.example.demo.repository.ProposalRepository;
import com.example.demo.repository.RequirementRepository;
import com.example.demo.repository.VendorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProposalService {
    Proposal submitProposal(Integer vendorId, Integer reqId, String summary);

    Optional<Proposal> getProposalById(Integer proposalId);

    List<Proposal> getProposalsByVendor(Integer vendorId);

    List<Proposal> getProposalsByRequirement(Integer reqId);


    @Service
    @RequiredArgsConstructor
    class Impl implements ProposalService {

        private final ProposalRepository proposalRepository;
        private final RequirementRepository requirementRepository;
        private final VendorRepository vendorRepository;

        @Override
        @Transactional
        public Proposal submitProposal(Integer vendorId, Integer reqId, String summary) {
            // 1) ensure vendor exists
            if (!vendorRepository.existsById(vendorId)) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found");
            }

            // 2) ensure requirement exists
            RequirementTable req = requirementRepository.findById(reqId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Requirement not found"));

            // 3) prevent duplicate proposal for same req & vendor
            Optional<Proposal> existing = proposalRepository.findByReqIdAndVendorId(reqId, vendorId);
            if (existing.isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "You have already submitted a proposal for this requirement");
            }

            // 4) create proposal with status pending
            Proposal p = Proposal.builder()
                    .reqId(reqId)
                    .vendorId(vendorId)
                    .summary(summary)
                    .status(ProposalStatus.pending)
                    .build();

            return proposalRepository.save(p);
        }

        @Override
        public Optional<Proposal> getProposalById(Integer proposalId) {
            return proposalRepository.findById(proposalId);
        }

        @Override
        public List<Proposal> getProposalsByVendor(Integer vendorId) {
            return proposalRepository.findByVendorId(vendorId);
        }

        @Override
        public List<Proposal> getProposalsByRequirement(Integer reqId) {
            return proposalRepository.findByReqId(reqId);
        }

    }
}
