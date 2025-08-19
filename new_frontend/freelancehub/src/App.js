// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/Client/ClientDashboard';
import RequirementPage from './pages/Client/RequirementPage';
import VendorDashboard from './pages/Vendor/VendorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard'; // ✅ Import admin dashboard
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProposalPage from './pages/Client/ProposalPage';
import TaskPage from './pages/Client/TaskPage';
import PaymentPage from './pages/Client/PaymentPage';
import FeedbackPage from './pages/Client/FeedBackPage';
import Requirement from './pages/Vendor/RequirementPage';
import Proposal from './pages/Vendor/ProposalPage';
import Tasks from './pages/Vendor/TaskPage';
import Payments from './pages/Vendor/PaymentPage';
import Feedback from './pages/Vendor/FeedbackPage'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, roleId } = useSelector((state) => state.auth);

  if (!user) {
    // If no user, go to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && roleId !== allowedRole) {
    // If logged in but wrong role, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Client Module (roleId = 1) */}
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute allowedRole={1}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requirements"
          element={
            <ProtectedRoute allowedRole={1}>
              <RequirementPage />
            </ProtectedRoute>
          }
        />
                <Route
          path="/proposals"
          element={
            <ProtectedRoute allowedRole={1}>
              <ProposalPage />
            </ProtectedRoute>
          }
        />
                        <Route
          path="/Tasks"
          element={
            <ProtectedRoute allowedRole={1}>
              <TaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRole={1}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
                                        <Route
          path="/feedback"
          element={
            <ProtectedRoute allowedRole={1}>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />

        {/* Vendor Module (roleId = 2) */}
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute allowedRole={2}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/vendor-requirements"
          element={
            <ProtectedRoute allowedRole={2}>
              <Requirement />
            </ProtectedRoute>
          }
        />
          <Route
          path="/vendor-proposals"
          element={
            <ProtectedRoute allowedRole={2}>
              <Proposal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-tasks"
          element={
            <ProtectedRoute allowedRole={2}>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-payments"
          element={
            <ProtectedRoute allowedRole={2}>
              <Payments />
            </ProtectedRoute>
          }
        />
                <Route
          path="/vendor-feedback"
          element={
            <ProtectedRoute allowedRole={2}>
              <Feedback />
            </ProtectedRoute>
          }
        />
        

        {/* Admin Module (roleId = 3) */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole={3}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Route → Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
