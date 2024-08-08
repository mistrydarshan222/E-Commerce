import React, { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const adjustQuantity = (id, quantity) => {
    dispatch({ type: 'ADJUST_QUANTITY', id, quantity });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}${item.imageUrl}`} alt={item.name} />
                    <span>{item.name}</span>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => adjustQuantity(item._id, e.target.value)}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item._id)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-actions">
            <button className="update-cart-button">Update Cart</button>
            <button className="back-to-home-button" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
          <div className="cart-summary">
            <h2>Cart Totals</h2>
            <p>Total: ${calculateTotal()}</p>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
