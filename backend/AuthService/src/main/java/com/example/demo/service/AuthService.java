package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.DTO.SessionResponse;
import com.example.demo.entities.ClientTable;
import com.example.demo.entities.Role;
import com.example.demo.entities.UserTable;
import com.example.demo.entities.VendorTable;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.VendorRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private VendorRepository vendorRepository;

    // Role ID constants (match your DB IDs)
    private static final int ROLE_CLIENT_ID = 1;
    private static final int ROLE_VENDOR_ID = 2;

    @Transactional(readOnly = true)
    public SessionResponse login(LoginRequest request) {
        UserTable user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (user.getStatus() != UserTable.Status.active) {
            throw new RuntimeException("Account is inactive");
        }

        // ⚠ Plain-text password check (should use hashing in production)
        if (request.getPassword() == null || !request.getPassword().equals(user.getUserPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        Integer clientId = null;
        Integer vendorId = null;
        Integer roleId = (user.getRole() != null) ? user.getRole().getRoleId() : null;
        String roleName = (user.getRole() != null) ? user.getRole().getRoleName() : null;

        if (ROLE_CLIENT_ID == roleId) {
            clientId = clientRepository.findByUser(user)
                    .map(ClientTable::getClientId)
                    .orElse(null);
        } else if (ROLE_VENDOR_ID == roleId) {
            vendorId = vendorRepository.findByUser(user)
                    .map(VendorTable::getVendorId)
                    .orElse(null);
        }

        return new SessionResponse.Builder()
                .userId(user.getUserId())
                .roleId(roleId)
                .clientId(clientId)
                .vendorId(vendorId)
                .email(user.getEmail())
                .userName(user.getUserName())
                .roleName(roleName)
                .build();
    }

    @Transactional
    public SessionResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // ✅ Fetch role using roleId from request
        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Invalid role ID"));

        // ✅ Build User entity
        UserTable user = new UserTable.Builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .userPassword(request.getPassword()) // ⚠ Hash in production
                .status(UserTable.Status.active)
                .role(role)
                .build();

        userRepository.save(user);

        Integer clientId = null;
        Integer vendorId = null;
        Integer roleId = role.getRoleId();

        // ✅ Create related entity depending on roleId
        if (ROLE_CLIENT_ID == roleId) {
            ClientTable client = new ClientTable.Builder()
                    .user(user)
                    .profileImg(request.getProfileImg())
                    .build();
            clientRepository.save(client);
            clientId = client.getClientId();
        } else if (ROLE_VENDOR_ID == roleId) {
            VendorTable vendor = new VendorTable.Builder()
                    .user(user)
                    .experience(request.getExperience())
                    .rating(0.0)
                    .build();
            vendorRepository.save(vendor);
            vendorId = vendor.getVendorId();
        }

        // ✅ Return session details
        return new SessionResponse.Builder()
                .userId(user.getUserId())
                .roleId(roleId)
                .clientId(clientId)
                .vendorId(vendorId)
                .email(user.getEmail())
                .userName(user.getUserName())
                .roleName(role.getRoleName())
                .build();
    }
}
