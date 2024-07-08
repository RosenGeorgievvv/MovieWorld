import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#catalog">Catalog</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <ul className="auth-links">
        <li><a href="#login">Login</a></li>
        <li><a href="#register">Register</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
