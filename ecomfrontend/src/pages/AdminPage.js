import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useDropzone } from 'react-dropzone';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: null });
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin/login');
    } else {
      fetchProducts();
      fetchCategories();
    }
  }, [navigate]);

  const fetchProducts = () => {
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchCategories = () => {
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (acceptedFiles) => {
    setForm({ ...form, image: acceptedFiles[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key !== 'image' || form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    if (editMode) {
      api.put(`/products/${currentProductId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        fetchProducts();
        resetForm();
      })
      .catch(error => console.error('Error updating product:', error));
    } else {
      api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        setProducts([...products, response.data]);
        resetForm();
      })
      .catch(error => console.error('Error creating product:', error));
    }
  };

  const handleUpdate = (product) => {
    setEditMode(true);
    setCurrentProductId(product._id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category ? product.category._id : '',
      stock: product.stock || '',
      image: null
    });
  };

  const handleDelete = (id) => {
    api.delete(`/products/${id}`)
    .then(() => setProducts(products.filter(product => product._id !== id)))
    .catch(error => console.error('Error deleting product:', error));
  };

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', stock: '', image: null });
    setEditMode(false);
    setCurrentProductId(null);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (currentCategoryId) {
      api.put(`/categories/${currentCategoryId}`, categoryForm)
        .then(response => {
          fetchCategories();
          resetCategoryForm();
        })
        .catch(error => console.error('Error updating category:', error));
    } else {
      api.post('/categories', categoryForm)
        .then(response => {
          setCategories([...categories, response.data]);
          resetCategoryForm();
        })
        .catch(error => console.error('Error creating category:', error));
    }
  };


  const handleCategoryUpdate = (category) => {
    setCurrentCategoryId(category._id);
    setCategoryForm({ name: category.name });
  };

  const handleCategoryDelete = (id) => {
    api.delete(`/categories/${id}`)
      .then(() => setCategories(categories.filter(category => category._id !== id)))
      .catch(error => console.error('Error deleting category:', error));
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '' });
    setCurrentCategoryId(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileChange });

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>
      
      <form onSubmit={handleSubmit} className="admin-product-form">
        <input type="text" className="admin-input" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input type="text" className="admin-input" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="number" className="admin-input" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <select className="admin-select" name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <input type="number" className="admin-input" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <div {...getRootProps()} className="admin-dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image, or click to select one</p>
        </div>
        <button type="submit" className="admin-button">{editMode ? 'Update Product' : 'Add Product'}</button>
        {editMode && <button type="button" className="admin-button cancel-button" onClick={resetForm}>Cancel Edit</button>}
      </form>

      <form onSubmit={handleCategorySubmit} className="admin-category-form">
        <input type="text" className="admin-input" name="name" placeholder="New Category" value={categoryForm.name} onChange={handleCategoryChange} />
        <button type="submit" className="admin-button">{currentCategoryId ? 'Update Category' : 'Add Category'}</button>
        {currentCategoryId && <button type="button" className="admin-button cancel-button" onClick={resetCategoryForm}>Cancel Edit</button>}
      </form>

      <h2 className="admin-subtitle">Products</h2>
      <ul className="admin-product-list">
        {products.map(product => (
          <li key={product._id} className="admin-product-item">
            <img className="admin-product-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.imageUrl}`} alt={product.name} />
            <div className="admin-product-info">
              <h3 className="admin-product-name">{product.name}</h3>
              <p className="admin-product-description">{product.description}</p>
              <p className="admin-product-category">Category: {product.category ? product.category.name : 'No category'}</p>
              <p className="admin-product-price">${product.price}</p>
              <button className="admin-button" onClick={() => handleUpdate(product)}>Update</button>
              <button className="admin-button delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="admin-subtitle">Categories</h2>
      <ul className="admin-category-list">
        {categories.map(category => (
          <li key={category._id} className="admin-category-item">
            <span className="admin-category-name">{category.name}</span>
            <div className="admin-category-actions">
              <button className="admin-button" onClick={() => handleCategoryUpdate(category)}>Update</button>
              <button className="admin-button delete-button" onClick={() => handleCategoryDelete(category._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
