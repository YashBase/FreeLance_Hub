import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Login from './Components/Login';
import Register from './Components/Register';
import HowItWorks from './Components/HowItWorks';

import ClientDashboard from './pages/ClientDashboard';  // ✅ Import the new page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* ✅ Client Dashboard Route */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
