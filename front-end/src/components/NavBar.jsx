import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar/index.css';

function NavBar(user) {
  const [sessionUser] = useState(user);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <nav>
      <div className="flex-container">
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
          className="produtos"
        >
          <h5>
            PRODUTOS
          </h5>
        </Link>

        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          <h5>
            MEUS PEDIDOS
          </h5>
        </Link>
      </div>

      <div className="flex-container">
        <div
          className="name"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          <h5>
            { (sessionUser) ? sessionUser.name : null }
          </h5>
        </div>

        <Link
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          className="logout"
          onClick={ handleLogout }
        >
          <h5>
            Sair
          </h5>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
