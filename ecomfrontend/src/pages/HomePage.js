import React from 'react';
import ProductList from '../components/ProductList';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page"> 
      <h1>Welcome to Our Store</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;