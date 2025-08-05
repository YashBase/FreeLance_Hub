package com.example.demo.controller;

import com.example.demo.model.Client;
import com.example.demo.model.Requirement;
import com.example.demo.model.RequirementDummy;
import com.example.demo.model.User;
import com.example.demo.service.ClientService;
import com.example.demo.service.RequirementService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requirement")
@CrossOrigin(origins = "http://localhost:3000")
public class RequirementController {

    @Autowired
    private RequirementService requirementService;
    
    @Autowired
    private ClientService clientService;
    
    @Autowired
    private UserService userService;

    // ✅ 1. Add requirement
    @PostMapping("/add")
    public ResponseEntity<Requirement> addRequirement(@RequestBody RequirementDummy req) {
        User u = userService.getById(req.getUserid());
        Client c = clientService.getByUser(u);
        Requirement r = new Requirement();
        r.setTitle(req.getTitle());
        r.setDescription(req.getDescription());
        r.setBudget(req.getBudget());
        r.setClient(c);
        
        Requirement saved = requirementService.addRequirement(r);
        
        return ResponseEntity.ok(saved);
    }

    // ✅ 2. Get requirements by client ID
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Requirement>> getByClientId(@PathVariable int clientId) {
        List<Requirement> list = requirementService.getRequirementsByClientId(clientId);
        return ResponseEntity.ok(list);
    }

    // ✅ 3. Update requirement
    @PutMapping("/update")
    public ResponseEntity<Requirement> updateRequirement(@RequestBody Requirement req) {
        Requirement updated = requirementService.updateRequirement(req);
        return ResponseEntity.ok(updated);
    }

    // ✅ 4. Delete requirement
    @DeleteMapping("/delete/{reqId}")
    public ResponseEntity<String> deleteRequirement(@PathVariable int reqId) {
        requirementService.deleteRequirement(reqId);
        return ResponseEntity.ok("Requirement deleted successfully");
    }
}
