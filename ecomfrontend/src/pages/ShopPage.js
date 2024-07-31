import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './ShopPage.css'; // Ensure the correct CSS file is imported

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        console.log('Products:', response.data); // Debug log
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="shop-page">
      <h2>Shop</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product">
            <img src={`${process.env.REACT_APP_BACKEND_URL}${product.imageUrl}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="category">Category: {product.category ? product.category.name : 'N/A'}</p>
            <p className="price">${product.price}</p>
            <Link to={`/product/${product._id}`} className="details-button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
