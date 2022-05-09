import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
// import '../styles/CustomerCheckout/index.css';
import { requestData as requestSellers } from '../services/requests';

export default function CustomerCheckout() {
  const [sessionUser, setSessionUser] = useState('');
  const totalValue = useSelector((state) => state.products.totalPrice);
  const cartProducts = useSelector((state) => state.products.cart);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));

    const { token } = userStorage;
    setSessionUser(userStorage);
    const getSellers = async () => {
      const endpoint = '/sellers';
      const response = await requestSellers(endpoint, token);

      setProducts(response);
    };
    getSellers();
  }, []);

  return (
    <>
      <NavBar props={ sessionUser } />
      <body>

        <h4>
          Finalizar pedido
        </h4>

        <CheckoutTable productCart={ cartProducts } />

        <h4>Detalhes e Endereço para entrega</h4>
      </body>
    </>
  );
}
