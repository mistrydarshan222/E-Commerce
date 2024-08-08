import React, { useContext, useState } from 'react';
import CartContext from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [userInfo] = useState({
    name: 'Darshan Mistry',
    email: 'iam@darshanmistry.in',
    address: '300 Regina St, North - Waterloo',
  });
  const [paymentInfo] = useState({
    cardNumber: '1111 1111 1111 1111',
    expiryDate: '12/25',
    cvv: '123',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    setShowPopup(true);
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
                  <img
                    className="product-image"
                    src={`${process.env.REACT_APP_BACKEND_URL}${item.imageUrl}`}
                    alt={item.name}
                  />
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

      {showPopup && (
        <div className="thank-you-popup">
          <div className="popup-content">
            <h2>Thank You for Your Order!</h2>
            <p className="order-confirmation-message">
              Your order has been placed successfully. Below are the details of your purchase.
            </p>
            <div className="popup-details">
              <div className="order-summary">
                <h3>Order Summary</h3>
                <ul>
                  {cart.map((item) => (
                    <li key={item._id}>
                      <img
                        className="product-image"
                        src={`${process.env.REACT_APP_BACKEND_URL}${item.imageUrl}`}
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="grand-total">
                  Grand Total: <span>${calculateTotal()}</span>
                </p>
              </div>
              <div className="order-details">
                <h3>Order Details</h3>
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Order Number:</strong> XX001123456</p>
                <p><strong>Payment Method:</strong> Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                <p><strong>Shipment ID:</strong> S01745</p>
                <p className="thank-you-message">
                  We appreciate your business and hope you enjoy your purchase. If you have any questions, feel free to contact us.
                </p>
              </div>
            </div>
            <button onClick={() => setShowPopup(false)} className="close-popup-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
