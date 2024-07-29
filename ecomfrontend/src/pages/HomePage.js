import React from 'react';
import ProductList from '../components/ProductList';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-page"> {/* Apply the CSS class */}
      <h1>Welcome to Our Store</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;
