import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Navbar.css'; 

const Navbar = () => {
  const { getTotalQuantity } = useCart();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
      </div>
      <div className="cart">
        <Link to="/cart">
          <img src="/images/shopping-cart.png" alt="Cart" /> ({getTotalQuantity()})
        </Link>
        <Link to="/admin/login" className="admin-login-link">
          Admin Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
