import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useDropzone } from 'react-dropzone';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: null });

  useEffect(() => {
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (acceptedFiles) => {
    setForm({ ...form, image: acceptedFiles[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    api.post('/admin/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => setProducts([...products, response.data]))
    .catch(error => console.error('Error creating product:', error));
  };

  const handleUpdate = (id) => {
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    api.put(`/admin/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setProducts(products.map(product => (product._id === id ? response.data : product)));
    })
    .catch(error => console.error('Error updating product:', error));
  };

  const handleDelete = (id) => {
    api.delete(`/admin/products/${id}`)
    .then(() => setProducts(products.filter(product => product._id !== id)))
    .catch(error => console.error('Error deleting product:', error));
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const category = { name: form.category };
    api.post('/admin/categories', category)
    .then(response => setCategories([...categories, response.data]))
    .catch(error => console.error('Error creating category:', error));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileChange });

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} />
        <select name="category" onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image, or click to select one</p>
        </div>
        <button type="submit">Add Product</button>
      </form>
      <form onSubmit={handleCategorySubmit} className="admin-form">
        <input type="text" name="category" placeholder="New Category" onChange={handleChange} />
        <button type="submit">Add Category</button>
      </form>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id} className="admin-product">
            <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button onClick={() => handleUpdate(product._id)}>Update</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
