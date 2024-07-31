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
          setProducts(response.data.filter(product => product.category.name === selectedCategory).slice(0, 3));
        } else {
          setProducts(response.data.slice(0, 3));
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
      <div className="category-filter">
        <ul>
          <li className={!selectedCategory ? 'selected' : ''} onClick={() => setSelectedCategory('')}>All</li>
          {categories.map(category => (
            <li
              key={category._id}
              className={selectedCategory === category.name ? 'selected' : ''}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product">
            <img src={`${process.env.REACT_APP_BACKEND_URL}${product.imageUrl}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="category">Category: {product.category.name}</p>
            <p className="price">${product.price}</p>
            <Link to={`/product/${product._id}`} className="details-button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
