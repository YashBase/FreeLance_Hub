// src/pages/vendor/TaskPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAcceptedTasks,
  fetchAllTasks,
  updateTaskStatus,
} from "../../features/vendor/taskSlice"; // ✅ updated slice import
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { ClipboardCheck, ClipboardList, Loader2 } from "lucide-react";

export default function TaskPage() {
  const dispatch = useDispatch();

  // ✅ VendorId from auth slice
  const { user } = useSelector((state) => state.auth);
  const vendorId = user?.vendorId ?? user?.id ?? user?.userId ?? null;

  const { acceptedTasks, allTasks, loading, error } = useSelector(
    (state) => state.vendorTasks
  );

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchAcceptedTasks(vendorId));
      dispatch(fetchAllTasks(vendorId));
    }
  }, [dispatch, vendorId]);

  // ✅ Update status handler
  const handleUpdateStatus = (taskId, newStatus) => {
    if (!taskId) {
      console.error("❌ TaskId is missing!");
      return;
    }
    dispatch(updateTaskStatus({ taskId: Number(taskId), newStatus }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-6 ml-64">
        <motion.h1
          className="text-3xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Vendor Tasks
        </motion.h1>

        {loading && (
          <div className="flex items-center text-gray-600">
            <Loader2 className="animate-spin mr-2" /> Loading tasks...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg shadow mb-4">
            {error}
          </div>
        )}

        {/* Accepted Tasks Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <ClipboardCheck className="text-green-600" /> Accepted Tasks
          </h2>
          {acceptedTasks.length === 0 ? (
            <p className="text-gray-500">No accepted tasks found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedTasks.map((task) => (
                <motion.div
                  key={task.taskId}
                  className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-xl transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {task.taskName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {task.taskDescription}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Requirement:</span>{" "}
                    {task.requirementTitle}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Client:</span>{" "}
                    {task.clientName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span className="text-blue-600">{task.status}</span>
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(task.taskId, "Completed")}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(task.taskId, "In Progress")}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      In Progress
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* All Tasks Section */}
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <ClipboardList className="text-blue-600" /> All Tasks
          </h2>
          {allTasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTasks.map((task) => (
                <motion.div
                  key={task.taskId}
                  className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-xl transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {task.taskName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {task.taskDescription}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Requirement:</span>{" "}
                    {task.requirementTitle}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Client:</span>{" "}
                    {task.clientName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span className="text-blue-600">{task.status}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
