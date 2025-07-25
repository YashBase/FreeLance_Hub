package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "client_table")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private int clientId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "profile_img")
    private String profileImg;

    // Getters and Setters
    public int getClientId() { return clientId; }
    public void setClientId(int clientId) { this.clientId = clientId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getProfileImg() { return profileImg; }
    public void setProfileImg(String profileImg) { this.profileImg = profileImg; }
}
