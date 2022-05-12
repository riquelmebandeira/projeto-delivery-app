import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import '../styles/CustomerCheckout.css';
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
  }, [orderStatus]);

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
    <main>
      {sessionUser && <NavBar props={ sessionUser } />}
      <h4 className="Checkout-Title">
        Detalhes do pedido
      </h4>
      <div className="OrderStatus">
        Pedido:
        <h4
          data-testid={ `${role}${dataId}-order-id` }
        >
          {`${id}`}
        </h4>
        ;
        <h4>
          P.Vendedora:
        </h4>
        <h4
          data-testid={ `${role}${dataId}-seller-name` }
        >
          {`${seller && seller.name}`}
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
          className="card-button"
        /> }
        { role === 'seller' && <Button
          text="Saiu para entrega"
          onClick={ () => buttonClickHandler() }
          dataTestId="seller_order_details__button-dispatch-check"
          disabled={ orderStatus !== 'Preparando' }
          className="card-button"
        /> }
        { role === 'customer' && <Button
          text="Marcar como entregue"
          onClick={ () => buttonClickHandler() }
          dataTestId="customer_order_details__button-delivery-check"
          disabled={ orderStatus !== 'Em trânsito' }
          className="card-button"
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
      <div className="card-button">
        <h3>Total: R$</h3>
        <h3
          data-testid={ `${role}_order_details__element-order-total-price` }
        >
          {totalPrice && totalPrice.replace(/\./, ',')}
        </h3>
      </div>
    </main>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
