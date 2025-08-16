import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, LogIn, Home } from 'lucide-react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      if (result.payload.roleId === 1) navigate('/client-dashboard');
      else if (result.payload.roleId === 2) navigate('/vendor-dashboard');
      else if (result.payload.roleId === 3) navigate('/admin-dashboard'); // ✅ Admin redirect
      else navigate('/'); // Default fallback
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-4">
      <motion.div
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.h2
          className="text-3xl font-bold text-center mb-6 text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <LogIn className="text-cyan-400" /> Welcome Back
        </motion.h2>

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-red-400 text-sm mb-4 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <motion.div
            className="flex items-center border border-white/20 rounded-lg px-3 py-2 shadow-sm bg-white/5 focus-within:ring-2 focus-within:ring-cyan-400 transition-all"
            whileFocus={{ scale: 1.02 }}
          >
            <Mail className="text-cyan-300 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            className="flex items-center border border-white/20 rounded-lg px-3 py-2 shadow-sm bg-white/5 focus-within:ring-2 focus-within:ring-cyan-400 transition-all"
            whileFocus={{ scale: 1.02 }}
          >
            <Lock className="text-cyan-300 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03, boxShadow: '0px 0px 15px rgba(6,182,212,0.7)' }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Logging in...
              </>
            ) : (
              <>
                <LogIn size={20} /> Login
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          className="mt-6 text-center text-sm text-gray-300 flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            Don’t have an account?{' '}
            <a
              href="/register"
              className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors"
            >
              Sign Up
            </a>
          </p>
          <a
            href="/"
            className="flex items-center justify-center gap-1 text-cyan-400 hover:underline hover:text-cyan-300 transition-colors"
          >
            <Home size={16} /> Back to Homepage
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
