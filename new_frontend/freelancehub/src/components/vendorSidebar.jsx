import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Home, FileText, DollarSign, CheckCircle, Users, Star, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const VendorSidebar = ({ sidebarOpen = true, setSidebarOpen = () => {} }) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth.user);
  const vendorName = userInfo?.userName || 'Vendor Name';
  const profileImage = userInfo?.profileImageUrl || null;

  const links = [
    { name: 'Dashboard', path: '/vendor-dashboard', icon: Home },
    { name: 'Requirements', path: '/vendor-requirements', icon: FileText },
    { name: 'Proposals', path: '/vendor-proposals', icon: CheckCircle },
    { name: 'Tasks', path: '/vendor-tasks', icon: Users },
    { name: 'Payments', path: '/vendor-payments', icon: DollarSign },
    { name: 'Feedback', path: '/vendor-feedback', icon: Star },
    { name: 'Logout', path: '/logout', icon: LogOut },
  ];

  return (
    <motion.div
      initial={{ width: 250 }}
      animate={{ width: sidebarOpen ? 250 : 80 }} // ✅ Only width changes
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-white shadow-lg flex flex-col p-5 space-y-6 fixed h-full z-20 overflow-hidden"
    >
      {/* Profile image/initials - clicking toggles sidebar */}
      <div className="flex flex-col items-center mb-7">
        <div
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-green-300 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Collapse/Expand Sidebar"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-green-700">
              {getInitials(vendorName)}
            </span>
          )}
        </div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 font-semibold text-gray-800 text-lg truncate text-center"
          >
            {vendorName}
          </motion.span>
        )}
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3">
        {links.map((link, index) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center cursor-pointer p-2 rounded-md transition-all duration-300 ${
                isActive ? 'bg-green-100' : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={24} className="text-gray-700" />
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: sidebarOpen ? 1 : 0,
                    x: sidebarOpen ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className="ml-4 text-gray-700 font-medium"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default VendorSidebar;
