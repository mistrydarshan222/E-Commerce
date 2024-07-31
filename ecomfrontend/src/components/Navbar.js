import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const { getTotalQuantity } = useCart();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/path-to-your-logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div className="cart">
        <Link to="/cart">
          <img src="/images/shopping-cart.png" alt="Cart" /> ({getTotalQuantity()})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
