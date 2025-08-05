package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.model.Role;
import com.example.demo.model.Client;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ClientRepository clientRepository;

    /**
     * Registers a new user after checking for unique email and valid role.
     * If the role is 'Client', also creates an entry in client_table.
     */
    public String registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered!";
        }

        Optional<Role> role = roleRepository.findByRname(user.getRole().getRname());
        if (!role.isPresent()) {
            return "Invalid role!";
        }

        user.setRole(role.get());
        User savedUser = userRepository.save(user); // Save and get generated userId

        // ✅ If the user is a Client, also add entry to client_table
        if (role.get().getRname().equalsIgnoreCase("Client")) {
            Client client = new Client();
            client.setUser(savedUser);
            client.setProfileImg("default.png"); // or set to null if not needed
            clientRepository.save(client);
        }

        return "User registered successfully!";
    }

    /**
     * Attempts to log in a user with email and password.
     */
   /* public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmailAndUserPassword(email, password);
    } */

    /**
     * Retrieves user object by email.
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Returns user details and clientId if user is a client.
     * Used after login to enrich Redux store.
     */
   /* public Map<String, Object> getUserWithClientId(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();

            response.put("userId", user.getUserId());
            response.put("fullName", user.getUserName());
            response.put("email", user.getEmail());
            response.put("contact", user.getContact());

            // Include role name and role ID
            if (user.getRole() != null) {
                response.put("role", user.getRole().getRname());
                response.put("roleId", user.getRole().getRoleId());
            } else {
                response.put("role", null);
                response.put("roleId", null);
            }

            // Check if the user is a client and include clientId
            if (user.getRole() != null && user.getRole().getRname().equalsIgnoreCase("Client")) {
                Client client = clientRepository.findByUser(user);
                if (client != null) {
                    response.put("clientId", client.getClientId());
                } else {
                    System.out.println("❌ No client record found for user: " + email);
                }
            }

            return response;
        }

        return null;
    } */
    
    
    public User getById(int uid) {
    	return userRepository.findById(uid).get();
    }
}
