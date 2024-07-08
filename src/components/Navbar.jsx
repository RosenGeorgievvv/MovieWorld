import React from 'react';
import { Link } from 'react-router-dom';

import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <ul className="auth-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
