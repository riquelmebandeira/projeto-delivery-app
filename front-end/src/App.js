import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerProducts from './pages/CustomerProducts';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      {/* rota Comum */}
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />

      {/* rota Customer */}
      <Route path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="/customer/checkout" element="<CustomerCheckout />" />
      <Route path="/customer/orders" element="<CustomerOrders />">
        <Route path=":orderId" element="<CustomerOrdersDetails />" />
      </Route>
      {/* Rota Vendor */}
      <Route path="/seller/orders" element="<SellerOrders />">
        <Route path=":orderId" element="<SellerOrderDetails />" />
      </Route>
      {/* Rota Admin */}
      <Route path="/admin/manage" element="<AdminManage />" />
      <Route path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
