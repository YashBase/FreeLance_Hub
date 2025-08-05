package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.model.Client;
import com.example.demo.model.LoginInfo;
import com.example.demo.service.UserService;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginInfo loginData) {
        String email = loginData.getEmail();
        String password = loginData.getPassword();
        
//        System.out.println("User Login details "+email+" "+password);
       
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        User user = userOptional.get();
        System.out.println("User Details "+user.toString());
        if (userOptional.isPresent()) {
            
            if (user.getUserPassword().equals(user.getUserPassword())) {
            	System.out.println(user.toString());
                return ResponseEntity.ok(user);
            } else {
                //return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
        } else {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
		return null;
    }

    // ✅ Corrected registration method
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
    	System.out.println("User Password "+user.getUserPassword());
        String result = userService.registerUser(user);
        System.out.print("user "+user.toString());

        if (result.equals("User registered successfully!")) {
            return ResponseEntity.ok("User registered successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }

    // ✅ GET USER BY EMAIL — used after login
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();

        // Check if user is a client and fetch clientId
        Client client = clientRepository.findByUser(user);
        Integer clientId = (client != null) ? client.getClientId() : null;

        // Prepare response map
        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getUserId());
        response.put("fullName", user.getUserName());
        response.put("email", user.getEmail());
        response.put("roleId", user.getRole() != null ? user.getRole().getRoleId() : null);
        response.put("clientId", clientId);

        return ResponseEntity.ok(response);
    }
}
