// Layout.js
import React from 'react';
import Footer from '/Footer'; // Adjust the path if needed
import './Layout.css'; // You can style your layout here if needed

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
       
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
