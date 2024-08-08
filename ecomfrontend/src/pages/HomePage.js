import React from 'react';
import ProductList from '../components/ProductList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <img src="/images/herosection.png" alt="Hero" className="hero-image" />
        <div className="hero-content">
          <h1>Welcome to Darshan's Ecom</h1>
          <p>Your one-stop shop for all your needs</p>
          <button className="shop-now-button">Shop Now</button>
        </div>
      </div>

      <div className="explore-section">
        <h2>Explore Our Store</h2>
        <img src="/images/explore.png" alt="Explore Our Store" className="explore-image" />
      </div>

      <div className="product-list-section">
        <h2>Hot Deals</h2>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
