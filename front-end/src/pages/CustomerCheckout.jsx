import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import Input from '../components/Input';

import '../styles/CustomerCheckout.css';
import { requestData as requestSellers } from '../services/requests';

export default function CustomerCheckout() {
  const [sessionUser, setSessionUser] = useState('');
  const [sellers, setSellers] = useState([]);
  const [chckOutInfo, setchckOutInfo] = useState({});
  const [cartUser, setCartUser] = useState('');

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    const { token } = userStorage;
    setSessionUser(userStorage);
    setCartUser(cartStorage);
    const getSellers = async () => {
      const endpoint = '/users/sellers';
      const response = await requestSellers(endpoint, token);
      setSellers(response);
    };
    getSellers();
  }, []);

  return (
    <main>
      <NavBar props={ sessionUser } />
      <h4 className="Checkout-Title">
        Finalizar pedido
      </h4>
      <div className="checkout-info">
        <Table
          columns={
            ['Item', 'Descrição', 'quantidade',
              'valor unitário', 'Sub-total', 'Remover item']
          }
          buttonText="Remover"
        />
        <div className="card-button">
          <h3>Total: R$</h3>
          <h3
            data-testid="customer_checkout__element-order-total-price"
          >
            { cartUser && cartUser.totalPrice.replace(/\./, ',') }
          </h3>
        </div>
      </div>

      <h4 className="Checkout-Title">Detalhes e Endereço para entrega</h4>
      <div>
        <div className="Checkout-Input">
          <label htmlFor="Seller">
            P.Vendedora Responsável:
            <select
              data-testid="customer_checkout__select-seller"
              name="Seller"
              onChange={ ({ target }) => {
                setchckOutInfo({ ...chckOutInfo, seller: target.value });
              } }
            >
              { sellers.map((seller, index) => (
                <option key={ index } value={ seller.name }>{ seller.name }</option>
              ))}
            </select>
          </label>
        </div>
        <div className="Checkout-Input">
          <Input
            labelText="Endereço:"
            onChange={ ({ target }) => {
              setchckOutInfo({ ...chckOutInfo, address: target.value });
            } }
            dataTestId="customer_checkout__input-address"
            placeHolder="Rua,Bairro e Cidade"
            type="text"
          />
        </div>
        <div className="Checkout-Input">
          <Input
            labelText="Número:"
            onChange={ ({ target }) => {
              setchckOutInfo({ ...chckOutInfo, addressNum: target.value });
            } }
            dataTestId="customer_checkout__input-addressNumber"
            placeHolder="Rua,Bairro e Cidade"
            type="text"
          />
        </div>
      </div>
    </main>
  );
}
