import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Hard-coded admin credentials
    if (admin.username === 'Darshan' && admin.password === '8967753') {
      // Store login state in local storage
      localStorage.setItem('adminLoggedIn', true);
      // Redirect to Admin Dashboard
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" value={admin.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={admin.password} onChange={handleChange} required />
          </div>
          <button className="submit" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
