import React, { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const handleCheckout = () => {
    alert('Checkout process initiated. (No payment processing in this example)');
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
