import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/pages/CustomerCheckout.css';
import { requestData as requestSellers, postOrders } from '../services/requests';
import { handleNewPage } from '../redux/features/productsSlice';

export default function CustomerCheckout() {
  const [sessionUser, setSessionUser] = useState('');
  const [sellers, setSellers] = useState([]);
  const [chckOutInfo, setchckOutInfo] = useState({});
  const [submited, setSubmited] = useState(false);
  const totalValue = useSelector((state) => state.products.totalPrice);
  const cartProducts = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  const submitOrder = async ({ sellerId = sellers[0].id,
    deliveryAddress, deliveryNumber }) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      const endpoint = '/sales';
      const { id } = await postOrders(endpoint,
        token,
        { sellerId, deliveryAddress, deliveryNumber, products: cartProducts });
      localStorage.setItem('cart', JSON.stringify({
        cart: [], totalPrice: 0 }));
      setSubmited(id);
    } catch (error) {
      console.log(error);
    }
  };

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
  }, [dispatch]);

  if (submited) return <Navigate to={ `/customer/orders/${submited}` } />;

  return (
    <>
      {sessionUser && <NavBar props={ sessionUser } />}
      <main>
        <h4 className="checkout-title">
          Finalizar pedido
        </h4>
        <div className="checkout-info">
          <Table
            data={ cartProducts }
            columns={
              ['Item', 'Descrição', 'quantidade',
                'valor unitário', 'Sub-total', 'Remover item']
            }
            buttonText="Remover"
            dataTestId="customer_checkout__element-order-table-"
          />
          <div className="total-price-container">
            <h3>Total: R$</h3>
            <h3
              data-testid="customer_checkout__element-order-total-price"
            >
              { totalValue && totalValue.replace(/\./, ',') }
            </h3>
          </div>
        </div>

        <h4 className="checkout-title">Detalhes e Endereço para entrega</h4>
        <section className="checkout-form-container">
          <label htmlFor="Seller">
            P.Vendedora Responsável:
            <select
              data-testid="customer_checkout__select-seller"
              name="Seller"
              onChange={ ({ target }) => {
                setchckOutInfo({ ...chckOutInfo, sellerId: target.value });
              } }
            >
              { sellers.map((seller, index) => (
                <option key={ index } value={ seller.id }>{ seller.name }</option>
              ))}
            </select>
          </label>
          <Input
            labelText="Endereço:"
            onChange={ ({ target }) => {
              setchckOutInfo({ ...chckOutInfo, deliveryAddress: target.value });
            } }
            dataTestId="customer_checkout__input-address"
            placeHolder="Rua,Bairro e Cidade"
            type="text"
          />
          <Input
            labelText="Número:"
            onChange={ ({ target }) => {
              setchckOutInfo({ ...chckOutInfo, deliveryNumber: target.value });
            } }
            dataTestId="customer_checkout__input-addressNumber"
            placeHolder="Rua,Bairro e Cidade"
            type="text"
          />
          <Button
            text="Finalizar Pedido"
            onClick={ () => { submitOrder(chckOutInfo); } }
            dataTestId="customer_checkout__button-submit-order"
            disabled={ false }
            className="button-submit-order"
          />
        </section>
      </main>
    </>
  );
}
