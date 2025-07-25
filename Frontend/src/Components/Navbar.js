import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2c3e50' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">MeetYourNeed</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/how-it-works">How It Works</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/register">Register</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
