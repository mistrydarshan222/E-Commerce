import React, { useContext, useState } from 'react';
import CartContext from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState({
    name: 'Darshan Mistry',
    email: 'iam@darshanmistry.in',
    address: '300 Regina St, North - Waterloo',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '1111 1111 1111 1111',
    expiryDate: '12/25',
    cvv: '123',
  });

  const handleCheckout = () => {
    alert('Checkout process initiated. (No payment processing in this example)');
    console.log('User Info:', userInfo);
    console.log('Payment Info:', paymentInfo);
    console.log('Order Summary:', cart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-form-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <label>
            Name:
            <input type="text" name="name" value={userInfo.name} disabled />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={userInfo.email} disabled />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={userInfo.address} disabled />
          </label>
          <h2>Payment Information</h2>
          <label>
            Card Number:
            <input type="text" name="cardNumber" value={paymentInfo.cardNumber} disabled />
          </label>
          <label>
            Expiry Date:
            <input type="text" name="expiryDate" value={paymentInfo.expiryDate} disabled />
          </label>
          <label>
            CVV:
            <input type="text" name="cvv" value={paymentInfo.cvv} disabled />
          </label>
          <button type="button" onClick={handleCheckout}>
            Place Order
          </button>
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item._id}>
                  <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${item.imageUrl}`} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="total-price">Total: ${calculateTotal()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
