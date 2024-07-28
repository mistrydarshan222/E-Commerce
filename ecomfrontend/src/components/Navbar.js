import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getTotalQuantity } = useCart();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({getTotalQuantity()})</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;
