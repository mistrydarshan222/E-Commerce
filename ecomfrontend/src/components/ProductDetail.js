import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import CartContext from '../contexts/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product: { ...product, quantity: 1 } });
    navigate('/cart'); // Redirect to cart page
  };

  const buyNow = () => {
    dispatch({ type: 'ADD_TO_CART', product: { ...product, quantity: 1 } });
    navigate('/checkout'); // Redirect to checkout page
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Shop</span> &gt; <span>{product.name}</span>
      </div>
      <div className="product-detail-content">
        <div className="product-image">
          <img src={`${process.env.REACT_APP_BACKEND_URL}${product.imageUrl}`} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <div className="options">
            <div className="size">
              <h3>Size</h3>
              <div className="size-options">
                <button>US-8</button>
                <button>US-9</button>
                <button>US-10</button>
              </div>
            </div>
            <div className="color">
              <h3>Color</h3>
              <div className="color-options">
                <button className="color-blue"></button>
                <button className="color-beige"></button>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
            <button className="buy-now-button" onClick={buyNow}>Buy Now</button>
          </div>
          <div className="additional-info">
            <p>Category: <span>{product.category.name}</span></p>         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
