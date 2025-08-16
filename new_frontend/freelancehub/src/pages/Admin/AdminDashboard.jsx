import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchDashboardCounts, 
    fetchNonAdminUsers, 
    updateUserStatus,
    fetchFilteredUsers
} from "../../features/admin/adminSlice";
import { motion } from "framer-motion";
import { User, Users, CheckCircle, XCircle, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Search Bar Component (Spacebar to search)
const UserSearch = ({ searchTerm, setSearchTerm, onSearch }) => (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow">
        <Search className="w-5 h-5 text-gray-400"/>
        <input
            type="text"
            placeholder="Search by name or email"
            className="outline-none px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === " ") {
                    onSearch();
                }
            }}
        />
    </div>
);

// Filter Buttons Component
const UserFilter = ({ filterRole, setFilterRole }) => (
    <div className="flex space-x-2">
        <button
            onClick={() => setFilterRole("all")}
            className={`px-3 py-1 rounded-lg font-medium ${filterRole === "all" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border"}`}
        >
            All
        </button>
        <button
            onClick={() => setFilterRole("client")}
            className={`px-3 py-1 rounded-lg font-medium ${filterRole === "client" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border"}`}
        >
            Clients
        </button>
        <button
            onClick={() => setFilterRole("vendor")}
            className={`px-3 py-1 rounded-lg font-medium ${filterRole === "vendor" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border"}`}
        >
            Vendors
        </button>
    </div>
);

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { counts, users, loading, error, adminInfo } = useSelector(state => state.admin || {});
    
    const [filterRole, setFilterRole] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchDashboardCounts());
        dispatch(fetchNonAdminUsers());
    }, [dispatch]);

    // Function to trigger search
    const handleSearch = () => {
        if ((searchTerm && searchTerm.trim().length > 0) || filterRole !== "all") {
            dispatch(fetchFilteredUsers({ role: filterRole, search: searchTerm }));
        } else {
            // If search is empty and filter is all, fetch all non-admin users
            dispatch(fetchNonAdminUsers());
        }
    };

    // Fetch filtered users automatically when filterRole changes
    useEffect(() => {
        handleSearch();
    }, [filterRole]);

    const handleStatusChange = (userId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";

        dispatch(updateUserStatus({ userId, status: newStatus }));

        const updatedCounts = { ...counts };
        if (newStatus === "inactive") {
            updatedCounts.activeUsers -= 1;
            updatedCounts.inactiveUsers += 1;
        } else {
            updatedCounts.activeUsers += 1;
            updatedCounts.inactiveUsers -= 1;
        }
        dispatch({ type: "admin/setCounts", payload: updatedCounts });
    };

    const handleLogout = () => {
        console.log("Logging out...");
        // Clear any admin session info if needed
        navigate("/"); // Redirect to homepage
    };

    if (loading) return (
        <p className="text-center text-gray-500 mt-10 text-lg animate-pulse">Loading...</p>
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <motion.div
                className="w-64 bg-white shadow-lg flex flex-col p-6 space-y-8"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col items-center space-y-4">
                    <User className="w-16 h-16 text-blue-500" />
                    <p className="text-lg font-semibold text-gray-700">{adminInfo?.name || "Admin"}</p>
                    <p className="text-sm text-gray-500">{adminInfo?.email || "admin@example.com"}</p>
                </div>

                <div className="mt-8 flex flex-col space-y-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-500 font-medium hover:text-red-600 transition"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-8">
                <motion.div 
                    className="text-2xl font-semibold text-gray-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome, {adminInfo?.name || "Admin"}!
                </motion.div>

                {error && (
                    <motion.p 
                        className="text-red-600 text-center font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Error: {error}
                    </motion.p>
                )}

                {/* Dashboard Counts */}
                <motion.div 
                    className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-lg transition">
                        <Users className="w-8 h-8 text-blue-500" />
                        <div>
                            <p className="text-gray-500 text-sm">Total Users</p>
                            <p className="text-lg font-semibold">{counts?.totalUsers ?? 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-lg transition">
                        <User className="w-8 h-8 text-green-500" />
                        <div>
                            <p className="text-gray-500 text-sm">Total Clients</p>
                            <p className="text-lg font-semibold">{counts?.clients ?? 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-lg transition">
                        <User className="w-8 h-8 text-purple-500" />
                        <div>
                            <p className="text-gray-500 text-sm">Total Vendors</p>
                            <p className="text-lg font-semibold">{counts?.vendors ?? 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-lg transition">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <div>
                            <p className="text-gray-500 text-sm">Active Users</p>
                            <p className="text-lg font-semibold">{counts?.activeUsers ?? 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-lg transition">
                        <XCircle className="w-8 h-8 text-red-400" />
                        <div>
                            <p className="text-gray-500 text-sm">Inactive Users</p>
                            <p className="text-lg font-semibold">{counts?.inactiveUsers ?? 0}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Filter + Search Section */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <UserSearch 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        onSearch={handleSearch} 
                    />
                    <UserFilter filterRole={filterRole} setFilterRole={setFilterRole} />
                </motion.div>

                {/* Users List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">Users</h2>
                    {users && users.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            {users.map(u => (
                                <motion.div
                                    key={u.userId}
                                    className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{u.userName || "N/A"}</p>
                                        <p className="text-gray-500 text-sm">{u.email || "N/A"}</p>
                                        <p className={`text-sm font-medium mt-1 ${u.status === "active" ? "text-green-500" : "text-red-500"}`}>
                                            {u.status || "inactive"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleStatusChange(u.userId, u.status)}
                                        className="px-3 py-1 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600 transition"
                                    >
                                        Toggle
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <p className="text-gray-500">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
