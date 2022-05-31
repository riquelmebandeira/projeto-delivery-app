import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import '../styles/pages/OrderDetails.css';
import { requestData as requestOrder, updateOrder } from '../services/requests';

export default function OrderDetails() {
  const id = window.location.pathname.split('/')[3];
  const [sessionUser, setSessionUser] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const [orderStatus, setOrderStatus] = useState('Pendente');

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setSessionUser(userStorage);
    const getOrderDetails = async () => {
      console.log('rodou');
      try {
        const endpoint = `/sales/${id}`;
        const response = await requestOrder(endpoint,
          token);
        setOrderDetails(response);
        setOrderStatus(response.status);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonClickHandler = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      const endpoint = `/sales/${id}`;
      const response = await updateOrder(endpoint,
        token);
      setOrderStatus(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const { totalPrice, saleDate, seller, products } = orderDetails;
  const { role } = sessionUser;
  const dataId = '_order_details__element-order-details-label';
  return (
    <>
      {sessionUser && <NavBar props={ sessionUser } />}
      <main>
        <h4 className="order-details-title">
          Detalhes do pedido
        </h4>
        <section className="order-details-container">
          <div className="order-data-container">
            <h4
              data-testid={ `${role}${dataId}-order-id` }
            >
              {`PEDIDO: ${id}`}
            </h4>
            <h4
              data-testid={ `${role}${dataId}-seller-name` }
            >
              {`P. Vend: ${seller && seller.name}`}
              ;
            </h4>
            <h4
              data-testid={ `${role}${dataId}-order-date` }
            >
              {new Date(saleDate).toLocaleDateString('pt-BR')}
            </h4>
            <h3
              data-testid={ `${role}${dataId}-delivery-status` }
            >
              { orderStatus }
            </h3>
            { role === 'seller' && <Button
              text="Preparar pedido"
              onClick={ () => buttonClickHandler() }
              dataTestId="seller_order_details__button-preparing-check"
              disabled={ orderStatus !== 'Pendente' }
            /> }
            { role === 'seller' && <Button
              text="Saiu para entrega"
              onClick={ () => buttonClickHandler() }
              dataTestId="seller_order_details__button-dispatch-check"
              disabled={ orderStatus !== 'Preparando' }
            /> }
            { role === 'customer' && <Button
              text="Marcar como entregue"
              onClick={ () => buttonClickHandler() }
              dataTestId="customer_order_details__button-delivery-check"
              disabled={ orderStatus !== 'Em Trânsito' }
            /> }
          </div>
          {products && <Table
            data={ products }
            columns={
              ['Item', 'Descrição', 'Quantidade',
                'Valor Unitário', 'Sub-total']
            }
            buttonText={ null }
            dataTestId="customer_order_details__element-order-table-"
          />}
          <div className="total-price-container">
            <h3>Total: R$</h3>
            <h3
              data-testid={ `${role}_order_details__element-order-total-price` }
            >
              {totalPrice && totalPrice.replace(/\./, ',')}
            </h3>
          </div>
        </section>
      </main>
    </>
  );
}
