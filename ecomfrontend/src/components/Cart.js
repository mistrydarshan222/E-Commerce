import React, { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const adjustQuantity = (id, quantity) => {
    dispatch({ type: 'ADJUST_QUANTITY', id, quantity });
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <p>
                  Quantity: <input type="number" value={item.quantity} onChange={(e) => adjustQuantity(item._id, e.target.value)} />
                </p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
