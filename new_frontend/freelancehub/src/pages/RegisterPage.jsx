// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Loader2, Home, ArrowRight, Users, Phone, Briefcase } from 'lucide-react';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, roleId, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    roleId: '',
    experience: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      userName: formData.userName,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
      roleId: Number(formData.roleId),
      experience: formData.roleId === "2" ? formData.experience : null
    };

    console.log('📤 Sending registration data:', payload);
    await dispatch(registerUser(payload));
  };

  useEffect(() => {
    if (user && roleId) {
      if (roleId === 1) {
        navigate('/client');
      } else if (roleId === 2) {
        navigate('/vendor');
      }
    }
  }, [user, roleId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-4">
      <motion.div
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-6 text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <UserPlus className="text-cyan-400" /> Create Account
        </motion.h2>

        {error && (
          <motion.p className="text-red-400 text-sm mb-4 text-center font-medium">
            {error}
          </motion.p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div className="flex items-center border border-white/20 rounded-lg px-3 py-2 bg-white/5">
            <UserPlus className="text-cyan-300 mr-2" size={20} />
            <input
              type="text"
              name="userName"
              placeholder="Username"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-white/20 rounded-lg px-3 py-2 bg-white/5">
            <Mail className="text-cyan-300 mr-2" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact */}
          <div className="flex items-center border border-white/20 rounded-lg px-3 py-2 bg-white/5">
            <Phone className="text-cyan-300 mr-2" size={20} />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-white/20 rounded-lg px-3 py-2 bg-white/5">
            <Lock className="text-cyan-300 mr-2" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-white/20 rounded-lg px-3 py-2 bg-white/5">
            <Lock className="text-cyan-300 mr-2" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="flex items-center border border-white/20 rounded-lg px-3 py-2 bg-white/5">
            <Users className="text-cyan-300 mr-2" size={20} />
            <select
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-white"
              required
            >
              <option value="">Select Role</option>
              <option value="1">Client</option>
              <option value="2">Vendor</option>
            </select>
          </div>

          {/* Experience - only for Vendor */}
          {formData.roleId === "2" && (
            <div className="flex items-center border border-white/20 rounded-lg px-3 py-2 bg-white/5">
              <Briefcase className="text-cyan-300 mr-2" size={20} />
              <input
                type="text"
                name="experience"
                placeholder="Experience (optional)"
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Registering...
              </>
            ) : (
              <>
                <ArrowRight size={20} /> Register
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center text-sm text-gray-300 flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-cyan-400 hover:underline">
              Login here
            </a>
          </p>
          <a href="/" className="flex items-center justify-center gap-1 text-cyan-400 hover:underline">
            <Home size={16} /> Back to Homepage
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
