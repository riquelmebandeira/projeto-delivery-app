import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import '../styles/CustomerCheckout/index.css';
import CheckoutTable from '../components/CheckoutTable';
import CheckoutForm from '../components/CheckoutForm';

export default function CustomerCheckout() {
  const [cart, setCart] = useSelector();

  const reduxCart = useSelector((state) => state.products.productsCart);

  useEffect(() => {
    setCart(reduxCart);
  }, [reduxCart]);

  return (
    <>
      <NavBar />
      <body>

        <h4>
          Finalizar pedido
        </h4>

        <CheckoutTable productCart={ cart } />

        <h4>Detalhes e Endereço para entrega</h4>

        <CheckoutForm />

      </body>
    </>
  );
}