import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/NavBar.css';

function NavBar(props) {
  console.log(props);
  const { props: { name, role } } = props;

  return (
    <nav>
      <div className="flex-container">
        { role === 'customer' && (
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
            className="produtos"
          >
            <h5>
              PRODUTOS
            </h5>
          </Link>
        )}
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to={ `/${role}/orders` }
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
            { name }
          </h5>
        </div>

        <Link
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          className="logout"
          onClick={ () => { localStorage.clear(); } }
        >
          <h5>
            Sair
          </h5>
        </Link>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default NavBar;
