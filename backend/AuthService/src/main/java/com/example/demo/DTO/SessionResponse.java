package com.example.demo.DTO;

public class SessionResponse {
    private Integer userId;
    private Integer roleId;
    private Integer clientId;
    private Integer vendorId;
    private String email;
    private String userName;
    private String roleName;

    private SessionResponse(Builder builder) {
        this.userId = builder.userId;
        this.roleId = builder.roleId;
        this.clientId = builder.clientId;
        this.vendorId = builder.vendorId;
        this.email = builder.email;
        this.userName = builder.userName;
        this.roleName = builder.roleName;
    }

    public Integer getUserId() { return userId; }
    public Integer getRoleId() { return roleId; }
    public Integer getClientId() { return clientId; }
    public Integer getVendorId() { return vendorId; }
    public String getEmail() { return email; }
    public String getUserName() { return userName; }
    public String getRoleName() { return roleName; }

    public static class Builder {
        private Integer userId;
        private Integer roleId;
        private Integer clientId;
        private Integer vendorId;
        private String email;
        private String userName;
        private String roleName;

        public Builder userId(Integer userId) {
            this.userId = userId;
            return this;
        }
        public Builder roleId(Integer roleId) {
            this.roleId = roleId;
            return this;
        }
        public Builder clientId(Integer clientId) {
            this.clientId = clientId;
            return this;
        }
        public Builder vendorId(Integer vendorId) {
            this.vendorId = vendorId;
            return this;
        }
        public Builder email(String email) {
            this.email = email;
            return this;
        }
        public Builder userName(String userName) {
            this.userName = userName;
            return this;
        }
        public Builder roleName(String roleName) {
            this.roleName = roleName;
            return this;
        }

        public SessionResponse build() {
            return new SessionResponse(this);
        }
    }
}
