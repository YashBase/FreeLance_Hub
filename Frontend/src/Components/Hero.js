import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate(); // Step 1: Hook for navigation

  const handleClick = () => {
    navigate('/register'); //  Step 2: Redirect to Register
  };

  return (
    <section className="hero">
      <h1>Welcome to MeetYourNeed (WorkNest)</h1>
      <p>
        A secure freelancing platform connecting clients and vendors across writing,
        design, web development & more.
      </p>
      <button className="hero-btn" onClick={handleClick}>Get Started</button>
    </section>
  );
};

export default Hero;
