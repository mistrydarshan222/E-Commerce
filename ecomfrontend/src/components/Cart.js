import React, { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const adjustQuantity = (id, quantity) => {
    dispatch({ type: 'ADJUST_QUANTITY', id, quantity });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map(item => (
              <li key={item._id} className="cart-item">
                <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="quantity">
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => adjustQuantity(item._id, e.target.value)}
                    />
                  </div>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total: ${calculateTotal()}</p>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
