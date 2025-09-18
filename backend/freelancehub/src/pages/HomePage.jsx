import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Rocket, LogIn, UserPlus} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white min-h-screen">
      {/* Navbar */}
      <motion.nav
        className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-md sticky top-0 z-50 border-b border-white/10"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl font-bold text-cyan-400 tracking-wide"
          whileHover={{ scale: 1.05 }}
        >
          FreelanceHub
        </motion.h1>
        <div className="flex gap-4">
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md font-medium"
          >
            <LogIn size={18} /> Login
          </motion.button>
          <motion.button
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md font-medium"
          >
            <UserPlus size={18} /> Sign Up
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Connect, Collaborate, <span className="text-cyan-400">Succeed</span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          FreelanceHub is the place where talented professionals meet businesses to bring ideas to life. Post projects, hire experts, and grow together.
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-500"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 border border-cyan-400 rounded-lg font-semibold shadow-lg hover:bg-cyan-400 hover:text-black transition-all"
          >
            Login
          </button>
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white/5">
        <motion.h3
          className="text-3xl font-bold text-center mb-12 text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          How It Works
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Briefcase size={40} className="text-cyan-400" />,
              title: "Post Your Project",
              desc: "Describe your needs and let skilled freelancers bid for your work."
            },
            {
              icon: <Users size={40} className="text-cyan-400" />,
              title: "Hire Professionals",
              desc: "Review profiles, ratings, and portfolios to select the perfect fit."
            },
            {
              icon: <Rocket size={40} className="text-cyan-400" />,
              title: "Get Things Done",
              desc: "Collaborate effectively and see your project come to life."
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white/10 rounded-xl shadow-lg border border-white/10 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

     
    </div>
  );
}
