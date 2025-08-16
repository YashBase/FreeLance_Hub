// src/pages/client/ClientPaymentPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentHistory,
  makePayment,
  clearPaymentState,
  clearError,
} from "../../features/client/paymentSlice";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { DollarSign, Plus, Minus } from "lucide-react";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const { history, loading, error, success } = useSelector(
    (state) => state.payment
  );
  const auth = useSelector((state) => state.auth);
  const [vendorId, setVendorId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [amount, setAmount] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (auth.user?.userId) {
      dispatch(fetchPaymentHistory());
    }
  }, [dispatch, auth.user?.userId]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearPaymentState());
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

const handlePaymentSubmit = (e) => {
  e.preventDefault();

  // Convert to correct types here:
  const parsedVendorId = parseInt(vendorId, 10);
  const parsedTaskId = parseInt(taskId, 10);
  const parsedAmount = parseFloat(amount);

  if (
    !parsedVendorId ||
    !parsedTaskId ||
    !parsedAmount ||
    isNaN(parsedVendorId) ||
    isNaN(parsedTaskId) ||
    isNaN(parsedAmount)
  ) {
    return alert("Please enter valid numbers for Vendor ID, Task ID, and Amount");
  }

  dispatch(makePayment({
    vendorId: parsedVendorId,
    taskId: parsedTaskId,
    amount: parsedAmount,
  }));

  setVendorId("");
  setTaskId("");
  setAmount("");
};


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <DollarSign size={20} /> Make Payment
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              {showForm ? <Minus size={16} /> : <Plus size={16} />}
            </button>
          </div>

          {/* Payment Form */}
          {showForm && (
            <form
              onSubmit={handlePaymentSubmit}
              className="bg-gray-50 p-6 rounded-xl shadow-md mb-6 space-y-4"
            >
              <div>
                <label className="block mb-1 font-semibold">Vendor ID</label>
                <input
                  type="number"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Task ID</label>
                <input
                  type="number"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-semibold mb-4"
            >
              Payment successful!
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 font-semibold mb-4"
            >
              {typeof error === "string" ? error : JSON.stringify(error)}
            </motion.div>
          )}

          {/* Payment History Grid */}
          <h2 className="text-xl font-bold mb-4">Your Payment History</h2>
          {loading && history.length === 0 && <p>Loading...</p>}
          {!loading && history.length === 0 && <p>No payments made yet.</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(history) &&
              history.map((payment, index) => {
                const key = payment.paymentId ?? index;
                const paymentDate = payment.date || payment.createdAt;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-xl p-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <p>
                      <span className="font-semibold">Vendor ID:</span>{" "}
                      {payment.vendorId}
                    </p>
                    <p>
                      <span className="font-semibold">Task ID:</span>{" "}
                      {payment.taskId}
                    </p>
                    <p>
                      <span className="font-semibold">Amount:</span> ${payment.amount}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {paymentDate ? new Date(paymentDate).toLocaleString() : "N/A"}
                    </p>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
