import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/requests';
import '../styles/CustomerProducts/Body/index.css';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);

  const totalValue = useSelector((state) => state.products.totalValue);

  useEffect(() => {
    const getProducts = async () => {
      const endpoint = '/products';
      const response = await requestProducts(endpoint);

      setProducts(response);
    };

    getProducts();
  }, []);

  return (
    <>
      <NavBar />

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
            data-testid="21"
          >

            <text data-testid="79">
              Ver carrinho: R$
              {totalValue}
            </text>

          </button>
        </Link>

      </body>

    </>
  );
}
