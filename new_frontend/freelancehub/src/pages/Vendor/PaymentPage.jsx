// src/pages/vendor/VendorPaymentsPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorPayments } from "../../features/vendor/paymentSlice";
import VendorSidebar from "../../components/vendorSidebar";
import { motion } from "framer-motion";
import {
  Wallet,
  Loader2,
  BadgeCheck,
  XCircle,
  Clock,
  IndianRupee,
} from "lucide-react";

export default function VendorPaymentsPage() {
  const dispatch = useDispatch();

  // 🔑 Vendor from auth slice
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?.vendorId ?? user?.id ?? user?.userId ?? null;

  const { payments, loading, error } = useSelector(
    (state) => state.vendorPayments
  );

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchVendorPayments(vendorId));
    }
  }, [vendorId, dispatch]);

  // 🎨 Status badge styling
  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            <BadgeCheck className="w-3 h-3" /> Paid
          </span>
        );
      case "failed":
      case "cancelled":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r hidden md:block">
        <VendorSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <motion.h1
          className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Wallet className="w-8 h-8 text-blue-600" />
          My Payments
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            <span className="ml-3 text-gray-600 text-lg">
              Loading your payments...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Payments List */}
        {!loading && payments?.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {payments.map((payment) => (
              <motion.div
                key={payment.paymentId}
                className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl border transition"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Payment #{payment.paymentId}
                  </h2>
                  {statusBadge(payment.status)}
                </div>
                <p className="flex items-center text-gray-700 font-medium">
                  <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
                  {payment.amount}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {payment.date
                    ? new Date(payment.date).toLocaleDateString()
                    : "N/A"}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading && (
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Wallet className="w-16 h-16 mb-4 text-gray-400" />
              <p className="text-lg">No payments found yet.</p>
              <p className="text-sm">Once you receive payments, they’ll appear here.</p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
