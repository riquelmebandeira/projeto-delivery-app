import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestData as requestProducts } from '../services/requests';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

import '../styles/pages/CustomerProducts.css';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [sessionUser, setSessionUser] = useState('');

  const totalValue = useSelector((state) => state.products.totalPrice);
  const cartProducts = useSelector((state) => state.products.cart);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));

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
      {sessionUser && <NavBar props={ sessionUser } />}

      <main>

        <div className="products-container">

          {
            (products) && products.map((product, index) => (
              <ProductCard key={ index } dataCard={ product } />
            ))
          }

        </div>

        <Link
          to="/customer/checkout"
          className={ cartProducts.length < 1 ? 'disabled-link' : 'cart-button' }
        >
          <button
            type="button"
            className="cart-button"
            data-testid="customer_products__button-cart"
            disabled={ cartProducts.length === 0 }
          >
            <p>Ver carrinho: R$ </p>
            <p data-testid="customer_products__checkout-bottom-value">
              { totalValue.replace(/\./, ',') }
            </p>
          </button>
        </Link>
      </main>
    </>
  );
}
