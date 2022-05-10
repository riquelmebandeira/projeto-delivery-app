import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import Input from '../components/Input';
import '../styles/CustomerCheckout.css';
import { requestData as requestSellers } from '../services/requests';
import { handleNewPage } from '../redux/features/productsSlice';

export default function CustomerCheckout() {
  const [sessionUser, setSessionUser] = useState('');
  const [sellers, setSellers] = useState([]);
  const [chckOutInfo, setchckOutInfo] = useState({});
  const totalValue = useSelector((state) => state.products.totalPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    dispatch(handleNewPage());
    const { token } = userStorage;
    setSessionUser(userStorage);
    const getSellers = async () => {
      const endpoint = '/users/sellers';
      const response = await requestSellers(endpoint, token);
      setSellers(response);
    };
    getSellers();
  }, []);

  return (
    <main>
      {sessionUser && <NavBar props={ sessionUser.user } />}
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
            { totalValue && totalValue.replace(/\./, ',') }
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
