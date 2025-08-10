package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.PostRequirementRequest;
import com.example.demo.DTO.RequirementResponse;

import com.example.demo.entity.ClientTable;
import com.example.demo.entity.RequirementSkillTable;
import com.example.demo.entity.RequirementTable;
import com.example.demo.entity.SkillTable;

import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.RequirementRepository;
import com.example.demo.repository.RequirementSkillRepository;
import com.example.demo.repository.SkillRepository;

@Service
public class RequirementService {

    @Autowired
    private RequirementRepository requirementRepository;

    @Autowired
    private RequirementSkillRepository requirementSkillRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ClientRepository clientRepository;

    // Post Requirement
    public RequirementResponse postRequirement(PostRequirementRequest request, Integer loggedInClientId) {
        ClientTable client = clientRepository.findById(loggedInClientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        RequirementTable requirement = RequirementTable.builder()
                .client(client)
                .title(request.getTitle())
                .description(request.getDescription())
                .budget(request.getBudget())
                .status(0) // default status (e.g., 0 for pending)
                .build();

        requirementRepository.save(requirement);

        // Add skills
        List<String> skillNames = new ArrayList<>();
        for (Integer skillId : request.getSkillIds()) {
            SkillTable skill = skillRepository.findById(skillId)
                    .orElseThrow(() -> new RuntimeException("Skill not found"));
            RequirementSkillTable reqSkill = RequirementSkillTable.builder()
                    .requirement(requirement)
                    .skill(skill)
                    .build();
            requirementSkillRepository.save(reqSkill);
            skillNames.add(skill.getSkillName());
        }

        return RequirementResponse.builder()
                .reqId(requirement.getReqId())
                .title(requirement.getTitle())
                .description(requirement.getDescription())
                .budget(requirement.getBudget())
                .status(requirement.getStatus())
                .skills(skillNames)
                .build();
    }

    // View My Requirements
    public List<RequirementResponse> getMyRequirements(Integer loggedInClientId) {
        ClientTable client = clientRepository.findById(loggedInClientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        List<RequirementTable> requirements = requirementRepository.findByClient(client);

        List<RequirementResponse> responses = new ArrayList<>();
        for (RequirementTable req : requirements) {
            List<String> skillNames = requirementSkillRepository.findByRequirement(req)
                    .stream()
                    .map(r -> r.getSkill().getSkillName())
                    .toList();

            responses.add(RequirementResponse.builder()
                    .reqId(req.getReqId())
                    .title(req.getTitle())
                    .description(req.getDescription())
                    .budget(req.getBudget())
                    .status(req.getStatus())
                    .skills(skillNames)
                    .build());
        }
        return responses;
    }
}
