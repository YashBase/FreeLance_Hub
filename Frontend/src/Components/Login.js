import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice'; // Removed fetchUserByEmail

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post("http://localhost:8080/api/login", loginData, {
        headers: { "Content-Type": "application/json" }
      });

      const user = response.data;
      console.log("User details: ", user);
      localStorage.setItem("user",JSON.stringify(user))


      // ✅ Extract role name
      const roleName = user?.role?.rname?.toLowerCase() || "unknown";

      // ✅ Store user in Redux
      dispatch(loginSuccess({ ...user, roleName }));

      alert("✅ Login successful!");

      // ✅ Navigate based on role
      if (roleName === "client") {
        navigate("/client/dashboard");
      } else if (roleName === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        alert("🚫 Invalid role, please contact admin.");
      }

    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      alert("🚫 Login failed: Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="col-md-6 mx-auto">
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
