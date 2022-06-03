import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import '../styles/components/NavBar.css';

function NavBar(props) {
  console.log(props);
  const { props: { name, role } } = props;

  const handleClick = () => {
    localStorage.clear();

    window.location.href = '/login';
  };

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
        { role !== 'administrator' && (
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to={ `/${role}/orders` }
          >
            <h5>
              MEUS PEDIDOS
            </h5>
          </Link>
        )}
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

        <Button
          dataTestId="customer_products__element-navbar-link-logout"
          text="Sair"
          className="logout"
          onClick={ handleClick }
        />
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
