import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post("http://localhost:8080/api/login", loginData);

      const user = response.data;
      dispatch(loginSuccess(user)); // ✅ Save to Redux

      alert("Login successful!");

      // ✅ Navigate based on role
      const role = user?.role?.rname?.toLowerCase();
      if (role === "client") {
        navigate("/client/dashboard");
      } else if (role === "vendor") {
        navigate("/vendor/dashboard"); // You can set this up later
      } else {
        alert("Invalid role, please contact admin.");
      }

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert("Login failed: Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="col-md-6 mx-auto">
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
