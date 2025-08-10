package com.example.demo.DTO;

public class RegisterRequest {
    private String userName;
    private String email;
    private String contact;
    private String password;
    private Integer roleId; // instead of roleName
// "Client" or "Vendor"
    private String profileImg; // for client
    private Integer experience; // for vendor
	public RegisterRequest(String userName, String email, String contact, String password, Integer roleId,
			String profileImg, Integer experience) {
		super();
		this.userName = userName;
		this.email = email;
		this.contact = contact;
		this.password = password;
		this.roleId = roleId;
		this.profileImg = profileImg;
		this.experience = experience;
	}
	public RegisterRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getProfileImg() {
		return profileImg;
	}
	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}
	public Integer getExperience() {
		return experience;
	}
	public void setExperience(Integer experience) {
		this.experience = experience;
	}
    
    
}
