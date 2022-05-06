import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestProducts } from '../services/requests';

import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

import '../styles/CustomerProducts/Body/index.css';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [sessionUser, setSessionUser] = useState('');

  const totalValue = useSelector((state) => state.products.totalValue);
  const priceRender = (price) => price.replace('.', ',');

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    console.log(userStorage);
    const { token } = userStorage;
    setSessionUser(userStorage);
    const getProducts = async () => {
      const endpoint = '/products';
      const response = await requestProducts(endpoint, token);

      setProducts(response);
    };

    getProducts();
  }, []);

  return (
    <>
      <NavBar props={ sessionUser } />

      <body>

        <div className="products-container">

          {
            (products) ? products.map((product, index) => (
              <ProductCard key={ index } dataCard={ product } />
            )) : null
          }

        </div>

        <Link to="/customer/checkout" className="card-button">
          <button
            type="button"
            className="card-button"
            data-testid="customer_products__button-cart"
            disabled={ products.length === 0 }
          >
            <h5>Ver carrinho: R$:</h5>
            <span data-testid="customer_products__checkout-bottom-value">
              { totalValue && priceRender(totalValue) }
            </span>

          </button>
        </Link>
      </body>
    </>
  );
}
