package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "client_table")
public class ClientTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Integer clientId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserTable user;

    @Column(name = "profile_img")
    private String profileImg;

    // Private constructor to be used by Builder
    private ClientTable(Builder builder) {
        this.clientId = builder.clientId;
        this.user = builder.user;
        this.profileImg = builder.profileImg;
    }

    // Default constructor (needed by JPA)
    public ClientTable() {}

    // Getters
    public Integer getClientId() {
        return clientId;
    }

    public UserTable getUser() {
        return user;
    }

    public String getProfileImg() {
        return profileImg;
    }

    // Builder class
    public static class Builder {
        private Integer clientId;
        private UserTable user;
        private String profileImg;

        public Builder clientId(Integer clientId) {
            this.clientId = clientId;
            return this;
        }

        public Builder user(UserTable user) {
            this.user = user;
            return this;
        }

        public Builder profileImg(String profileImg) {
            this.profileImg = profileImg;
            return this;
        }

        public ClientTable build() {
            return new ClientTable(this);
        }
    }

    // Static method to get a new builder instance
    public static Builder builder() {
        return new Builder();
    }
}
