import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import '../styles/CustomerCheckout.css';
import { requestData as requestOrder } from '../services/requests';

export default function OrderDetails() {
  const id = window.location.pathname.split('/')[3];
  const [sessionUser, setSessionUser] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const userStorage = JSON.parse(localStorage.getItem('user'));

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
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDetails();
  }, []);

  const { totalPrice, status, saleDate, seller, products } = orderDetails;
  return (
    <main>
      {sessionUser && <NavBar props={ sessionUser } />}
      <h4 className="Checkout-Title">
        Detalhes do pedido
      </h4>
      <div className="checkout-info">
        <h4 className="OrderNum">
          Pedido:
          {`${id}`}
          ;
        </h4>
        <h4>
          P.Vendedora:
        </h4>
        <h4>
          {`${seller && seller.name}`}
          ;
        </h4>
        <h4>
          {new Date(saleDate).toLocaleDateString('pt-BR')}
          ;
        </h4>
        <h3 data-testid={ `customer_orders__element-delivery-status-${id}` }>
          { status && status.toUpperCase() }
        </h3>
        <Button buttonText="Marcar como entregue" />
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
            data-testid="customer_checkout__element-order-total-price"
          >
            {totalPrice && totalPrice.replace(/\./, ',')}
          </h3>
        </div>
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
