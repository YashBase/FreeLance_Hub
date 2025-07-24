package com.example.demo.controller;



import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // 👈 Allow React frontend
public class AuthController {

    @Autowired
    private UserService userService;

    // ✅ Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String result = userService.registerUser(user);
        if (result.equals("User registered successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // ✅ Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        Optional<User> user = userService.loginUser(loginData.getEmail(), loginData.getPassword());

        if (user.isPresent()) {
            // Return role + message
            return ResponseEntity.ok("Login successful as " + user.get().getRole());
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
