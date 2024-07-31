import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';
import Cart from './components/Cart';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductPage />} /> {/* Add this route */}
        <Route path="/shop" element={<ShopPage />}  />
      </Routes>
    </Router>
  );
}

export default App;
