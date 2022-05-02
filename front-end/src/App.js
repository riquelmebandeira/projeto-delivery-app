import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CustomerProducts from './pages/CustomerProducts';

function App() {
  return (
    <Routes>
      <Route index path="/login" element="<Login />" />
      <Route path="/register" element="<Register />" />

      <Route path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="/customer/checkout" element="<CustomerCheckout />" />
      <Route path="/customer/orders" element="<CustomerOrders />">
        <Route path=":orderId" element="<CustomerOrdersDetails />" />
      </Route>

      <Route path="/seller/orders" element="<SellerOrders />">
        <Route path=":orderId" element="<SellerOrderDetails />" />
      </Route>

      <Route path="/admin/manage" element="<AdminManage />" />
    </Routes>
  );
}

export default App;
