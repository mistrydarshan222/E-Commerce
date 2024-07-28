import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useDropzone } from 'react-dropzone';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: null });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

  const handleFileChange = (acceptedFiles) => {
    setForm({ ...form, image: acceptedFiles[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

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
        hleaders: {
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
    console.log(product);
    setEditMode(true);
    setCurrentProductId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileChange });

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option key="Demo" value="Demo">Demo</option>
          {categories.map(category => (
             
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image, or click to select one</p>
        </div>
        <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
        {editMode && <button type="button" onClick={resetForm}>Cancel Edit</button>}
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
              <button onClick={() => handleUpdate(product)}>Update</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
