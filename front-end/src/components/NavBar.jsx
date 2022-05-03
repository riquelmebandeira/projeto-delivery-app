import React, { useEffect, useState } from 'react';
import '../styles/NavBar/index.css';
import { Link } from 'react-router-dom';

function NavBar() {
  const [sessionUser, setSessionUser] = useState('');

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    setSessionUser(userStorage);
  }, []);

  return (
    <header>
      <div className="flex-container">
        <Link data-testid="11" to="/customer/products" className="produtos">
          <h5>
            PRODUTOS
          </h5>
        </Link>

        <Link data-testid="12" to="/customer/orders">
          <h5>
            MEUS PEDIDOS
          </h5>
        </Link>
      </div>

      <div className="flex-container">
        <div className="name" data-testid="13">
          <h5>
            Cicrano da Silva
            { sessionUser.name }
          </h5>
        </div>

        <Link data-testid="14" to="/login" className="logout" onClick={ handleLogout }>
          <h5>
            Sair
          </h5>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
