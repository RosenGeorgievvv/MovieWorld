import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <p>© All rights reserved.</p>
        <p>Built by Rosen Georgiev</p>
      </div>
      <div className="footer-center">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaFacebook />
        </a>
      </div>
    </div>
  );
};

export default Footer;
