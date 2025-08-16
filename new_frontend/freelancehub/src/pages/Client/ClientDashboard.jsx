// src/pages/client/ClientDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientDashboard } from '../../features/client/dashboardSlice';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar'; // import reusable Sidebar
import { CheckCircle, DollarSign, BarChart2 } from 'lucide-react';

const ClientDashboard = () => {
  const dispatch = useDispatch();

  // Get logged-in client info from Redux
  const { user } = useSelector((state) => state.auth);
  const clientId = user?.userId; // replace 'userId' with actual field if different

  const { data = {}, loading, error } = useSelector((state) => state.clientDashboard || {});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchClientDashboard(clientId));
    }
  }, [dispatch, clientId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className="flex-1 p-8 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 250 : 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Dashboard</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-100 rounded-xl shadow flex flex-col items-center">
                <CheckCircle size={32} className="text-blue-600 mb-2" />
                <p className="text-gray-700 font-semibold">Total Completed Tasks</p>
                <p className="text-2xl font-bold text-blue-700">{data.totalCompletedTasks}</p>
              </div>

              <div className="p-6 bg-green-100 rounded-xl shadow flex flex-col items-center">
                <DollarSign size={32} className="text-green-600 mb-2" />
                <p className="text-gray-700 font-semibold">Total Payments Made</p>
                <p className="text-2xl font-bold text-green-700">{data.totalPaymentsMade}</p>
              </div>

              <div className="p-6 bg-yellow-100 rounded-xl shadow flex flex-col items-center">
                <BarChart2 size={32} className="text-yellow-600 mb-2" />
                <p className="text-gray-700 font-semibold">Average Rating Given</p>
                <p className="text-2xl font-bold text-yellow-700">{data.averageRatingGiven}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientDashboard;
