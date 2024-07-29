import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './ProductList.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    api.get('/products')
      .then(response => {
        if (selectedCategory) {
          setProducts(response.data.filter(product => product.category === selectedCategory));
        } else {
          setProducts(response.data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [selectedCategory]);

  useEffect(() => {
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="product-list">
      
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id} className="product">
            <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`} className="details-button">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
