import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header>
      <div>
        <Link to="/customer/products">
          <h5>
            Produtos
          </h5>
        </Link>

        <Link to="/customer/orders">
          <h5>
            Meus Pedidos
          </h5>
        </Link>
      </div>

      <div>
        <h5>
          Cicrano da Silva
        </h5>

        <Link to="/login">
          <h5>
            Sair
          </h5>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
