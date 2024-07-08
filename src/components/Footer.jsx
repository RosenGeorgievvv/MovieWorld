import React from "react";
import {FaInstagram, FaFacebook} from 'react-icons/fa';
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaFacebook />
        </a>
      </div>
      <div className="footer-center">
        <p>© All rights reserved.</p>
        <p>Built by Rosen Georgiev</p>
      </div>
    </div>
  );
};

export default Footer;
