import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            Welcome to Darshan's Ecom. We provide the best quality products to our customers. Your satisfaction is our priority.
          </p>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/admin/login">Admin Login</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: info@darshansecom.com</li>
            <li>Phone: +1 (555) 555-5555</li>
            <li>Address: 300 Regina St, North - Waterloo</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow Me</h3>
          <div className="social-icons">
            <a href="https://github.com/mistrydarshan222/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> GitHub
            </a>
            <a href="https://www.linkedin.com/in/darshanmistry4/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
        </div>

        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Darshan's Ecom. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
