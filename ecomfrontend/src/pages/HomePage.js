import React from 'react';
import ProductList from '../components/ProductList';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page"> 
      <h1 className='hometitle'>Welcome to Darshan's Ecom</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;