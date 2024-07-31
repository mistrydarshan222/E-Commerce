import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CartContext from '../contexts/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product: { ...product, quantity: 1 } });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container product-details">
      <div className="image-section">
        <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />
      </div>
      <div className="info-section">
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        <p className="category">Category: {product.category.name}</p>
        <p className="description">{product.description}</p>
        <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
