import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Home, User, DollarSign, CheckCircle, Settings, LogOut, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const getInitials = name => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const userInfo = useSelector(state => state.auth.user);
  const clientName = userInfo?.userName || "Client Name";
  const profileImage = userInfo?.profileImageUrl || null;

  const links = [
    { name: 'Dashboard', path: '/client-dashboard', icon: Home },
    { name: 'Proposals', path: '/proposals', icon: User },
    { name: 'Payments', path: '/payments', icon: DollarSign },
    { name: 'Tasks', path: '/tasks', icon: CheckCircle },
    { name: 'Requirements', path: '/requirements', icon: FileText },
    { name: 'Feedback', path: '/feedback', icon: Settings },
    { name: 'Logout', path: '/logout', icon: LogOut },
  ];

  return (
    <motion.div
      animate={{ width: sidebarOpen ? 250 : 80 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white shadow-lg flex flex-col p-5 space-y-6 fixed h-full z-20 overflow-hidden"
    >
      {/* Profile image/initials - clicking toggles sidebar */}
      <div className="flex flex-col items-center mb-7">
        <div
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-blue-300 cursor-pointer transition-transform duration-300 hover:scale-105"
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
            <span className="text-2xl font-bold text-blue-700">
              {getInitials(clientName)}
            </span>
          )}
        </div>
        {sidebarOpen && (
          <span className="mt-3 font-semibold text-gray-800 text-lg truncate text-center">
            {clientName}
          </span>
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
                isActive ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={24} className="text-gray-700" />
              {sidebarOpen && (
                <Link to={link.path} className="ml-4 text-gray-700 font-medium">
                  {link.name}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Sidebar;
