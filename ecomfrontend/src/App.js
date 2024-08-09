import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';
import Cart from './components/Cart';
import ShopPage from './pages/ShopPage';
import AdminLogin from './pages/AdminLogin';
import Checkout from './components/Checkout';
import Footer from './components/Footer_Menu';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
