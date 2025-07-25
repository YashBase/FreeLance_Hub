package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int role_id;

    private String rname;

    // Getters and Setters
    public int getRole_id() { return role_id; }
    public void setRole_id(int role_id) { this.role_id = role_id; }

    public String getRname() { return rname; }
    public void setRname(String rname) { this.rname = rname; }
}
