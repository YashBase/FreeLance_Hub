package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user_table")
public class UserTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "contact", unique = true)
    private String contact;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "enum('active','inactive') default 'active'")
    private Status status = Status.active;

    public enum Status {
        active, inactive
    }

    public UserTable() {
    }

    public UserTable(Integer userId, String userName, String userPassword, Role role,
                     String contact, String email, Status status) {
        this.userId = userId;
        this.userName = userName;
        this.userPassword = userPassword;
        this.role = role;
        this.contact = contact;
        this.email = email;
        this.status = status;
    }

    // Builder-based constructor
    private UserTable(Builder builder) {
        this.userId = builder.userId;
        this.userName = builder.userName;
        this.userPassword = builder.userPassword;
        this.role = builder.role;
        this.contact = builder.contact;
        this.email = builder.email;
        this.status = builder.status;
    }

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserPassword() { return userPassword; }
    public void setUserPassword(String userPassword) { this.userPassword = userPassword; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    // ---------- Builder ----------
    public static class Builder {
        private Integer userId;
        private String userName;
        private String userPassword;
        private Role role;
        private String contact;
        private String email;
        private Status status = Status.active;

        public Builder userId(Integer userId) {
            this.userId = userId;
            return this;
        }

        public Builder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public Builder userPassword(String userPassword) {
            this.userPassword = userPassword;
            return this;
        }

        public Builder role(Role role) {
            this.role = role;
            return this;
        }

        public Builder contact(String contact) {
            this.contact = contact;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder status(Status status) {
            this.status = status;
            return this;
        }

        public UserTable build() {
            return new UserTable(this);
        }
    }

    @Override
    public String toString() {
        return "UserTable{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", contact='" + contact + '\'' +
                ", status=" + status +
                ", role=" + (role != null ? role.getRoleName() : null) +
                '}';
    }
}
