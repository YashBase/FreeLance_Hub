// src/pages/client/ClientPaymentPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentsByClient,
  createPendingPayment,
  confirmPayment,
  clearPaymentState,
} from "../../features/client/paymentSlice";
import Sidebar from "../../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function ClientPaymentPage() {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payment);
  const auth = useSelector((state) => state.auth);

  const [taskId, setTaskId] = useState("");
  const [amount, setAmount] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(null);

  // 🔹 Load client’s payments
  useEffect(() => {
    if (auth.user?.userId) {
      dispatch(fetchPaymentsByClient(auth.user.userId));
    }
  }, [dispatch, auth.user?.userId]);

  // 🔹 Clear messages after 3s
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        dispatch(clearPaymentState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const parsedTaskId = parseInt(taskId, 10);
    const parsedAmount = parseFloat(amount);

    if (!parsedTaskId || !parsedAmount || isNaN(parsedTaskId) || isNaN(parsedAmount)) {
      return alert("Please enter valid numbers for Task ID and Amount");
    }

    dispatch(createPendingPayment({ taskId: parsedTaskId, amount: parsedAmount }))
      .unwrap()
      .then(() => setSuccess("✅ Pending payment created successfully!"))
      .catch(() => {});

    setTaskId("");
    setAmount("");
  };

  const handleConfirmPayment = (paymentId) => {
    dispatch(confirmPayment(paymentId))
      .unwrap()
      .then(() => setSuccess("✅ Payment confirmed successfully!"))
      .catch(() => {});
  };

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className="flex-1 p-8 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 250 : 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl border"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
              <DollarSign className="text-green-600 w-8 h-8" />
              Manage Payments
            </h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowForm(!showForm)}
              className="p-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              {showForm ? <Minus size={18} /> : <Plus size={18} />}
            </motion.button>
          </div>

          {/* Payment Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handlePaymentSubmit}
                className="bg-gray-50 p-6 rounded-xl shadow-md mb-6 space-y-4 border"
              >
                <div>
                  <label className="block mb-1 font-semibold">Task ID</label>
                  <input
                    type="number"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
                >
                  {loading ? "Processing..." : "Create Pending Payment"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Messages */}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-green-600 font-semibold mb-4"
            >
              <CheckCircle2 className="w-5 h-5" /> {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-600 font-semibold mb-4"
            >
              <AlertCircle className="w-5 h-5" />{" "}
              {typeof error === "string" ? error : JSON.stringify(error)}
            </motion.div>
          )}

          {/* Payment History */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Payment History</h2>
          {loading && payments.length === 0 && <p>Loading...</p>}
          {!loading && payments.length === 0 && (
            <p className="text-gray-500">No payments made yet.</p>
          )}

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {Array.isArray(payments) &&
              payments.map((payment, index) => {
                const key = payment.paymentId ?? index;
                const paymentDate = payment.date || payment.createdAt;

                return (
                  <motion.div
                    key={key}
                    variants={cardVariants}
                    whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
                    className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
                  >
                    <p className="text-gray-700">
                      <span className="font-semibold">Task ID:</span> {payment.taskId}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Vendor ID:</span> {payment.vendorId}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Amount:</span> ${payment.amount}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      <span className="font-semibold">Date:</span>{" "}
                      {paymentDate
                        ? new Date(paymentDate).toLocaleString()
                        : "N/A"}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      {payment.status === "PAID" && (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle2 className="w-4 h-4" /> Paid
                        </span>
                      )}
                      {payment.status === "PENDING" && (
                        <span className="flex items-center gap-1 text-yellow-600 text-sm">
                          <Clock className="w-4 h-4" /> Pending
                        </span>
                      )}
                    </div>

                    {payment.status === "PENDING" && (
                      <motion.button
                        onClick={() => handleConfirmPayment(payment.paymentId)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 w-full bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700"
                      >
                        Confirm Payment
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
