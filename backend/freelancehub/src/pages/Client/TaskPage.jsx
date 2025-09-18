// src/pages/TaskPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { ClipboardList, Loader2, AlertCircle } from "lucide-react";
import { fetchClientTasks } from "../../features/client/taskSlice"; // Adjust path if needed

export default function TaskPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // ✅ Get user from auth slice
  const { tasks, loading, error } = useSelector(state => state.tasks);
  console.log("TaskPage rendered. User:", user);
console.log("Redux tasks state:", { tasks, loading, error });


  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
      console.log("useEffect triggered with user:", user);
    if (user?.roleId === 1 && user?.clientId) {
      console.log("Dispatching fetchClientTasks for clientId:", user.clientId);
      dispatch(fetchClientTasks({ clientId: user.clientId }));
    }
  }, [dispatch, user]);

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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <ClipboardList className="text-blue-600" size={28} />
            Assigned Tasks
          </h2>

          {/* Loading & Error States */}
          {loading && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading tasks...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle size={20} />
              <span>Error: {error}</span>
            </div>
          )}

          {/* Task List */}
          {!loading && !error && (
            <>
              {tasks.length === 0 ? (
                <p className="text-gray-600">No tasks available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.taskId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {task.taskName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {task.taskDescription}
                      </p>

                      {/* Status Badge */}
                      <div className="mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === "started"
                              ? "bg-blue-100 text-blue-600"
                              : task.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      {/* Date Range */}
                      <p className="text-xs text-gray-500 mt-3">
                        📅 {task.startDate} → {task.endDate}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

