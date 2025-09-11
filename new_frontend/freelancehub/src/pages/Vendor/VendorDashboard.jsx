// src/pages/vendor/VendorDashboard.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorDashboard,
  selectVendorDashboard,
  selectVendorDashboardLoading,
  selectVendorDashboardError,
} from "../../features/vendor/dashboardSlice";
import Sidebar from "../../components/vendorSidebar";
import { motion } from "framer-motion";
import {
  FileText,
  Layers,
  CheckCircle,
  Clock,
  ListChecks,
  DollarSign,
  Star,
} from "lucide-react";

export default function VendorDashboard() {
  const dispatch = useDispatch();

  // ✅ Get logged-in vendor from authSlice
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?.userId; // assuming authSlice stores userId for vendor

  const dashboard = useSelector(selectVendorDashboard);
  const loading = useSelector(selectVendorDashboardLoading);
  const error = useSelector(selectVendorDashboardError);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchVendorDashboard(vendorId)); // ✅ pass vendorId to API call
    }
  }, [dispatch, vendorId]);

  // ✅ Stats configuration
  const stats = [
    {
      label: "Total Matched Requirements",
      value: dashboard?.totalMatchedRequirementsSeen,
      icon: FileText,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Total Proposals Submitted",
      value: dashboard?.totalProposalsSubmitted,
      icon: Layers,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Proposals Accepted",
      value: dashboard?.proposalsAccepted,
      icon: CheckCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Total Tasks Assigned",
      value: dashboard?.totalTasksAssigned,
      icon: ListChecks,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "Tasks In Progress",
      value: dashboard?.tasksInProgress,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Tasks Completed",
      value: dashboard?.tasksCompleted,
      icon: CheckCircle,
      color: "bg-teal-100 text-teal-700",
    },
    {
      label: "Total Payments Received",
      value: `₹${dashboard?.totalPaymentsReceived || 0}`,
      icon: DollarSign,
      color: "bg-pink-100 text-pink-700",
    },
    {
      label: "Average Client Rating",
      value: dashboard?.averageClientRating?.toFixed(2) ?? "N/A",
      icon: Star,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-[250px]" : "ml-[80px]"
        } p-6`}
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold mb-6"
        >
          Vendor Dashboard
        </motion.h2>

        {loading && <p className="text-gray-500">Loading dashboard...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && dashboard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-xl shadow flex flex-col items-center ${stat.color}`}
                  >
                    <Icon size={32} className="mb-2" />
                    <p className="text-gray-700 font-semibold">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">
                      {stat.value ?? 0}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
