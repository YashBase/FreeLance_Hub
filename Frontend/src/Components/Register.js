import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [role, setRole] = useState('Client');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName,
      userPassword,
      email,
      contact,
      role: {
        rname: role
      }
    };

    try {
      console.log("User Data: ", userData);
      const response = await axios.post("http://localhost:8080/api/register", userData);
      alert(response.data || "Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      alert("Registration failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Contact</label>
          <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="Client">Client</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
