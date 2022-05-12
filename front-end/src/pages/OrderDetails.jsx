import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import '../styles/CustomerCheckout.css';
import { requestData as requestOrder } from '../services/requests';

const olhaGambi = 'customer_order_details__element-order-details-label-delivery-status';

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
  }, [id, userStorage]);

  const { totalPrice, status, saleDate, seller, products } = orderDetails;
  return (
    <main>
      {sessionUser && <NavBar props={ sessionUser } />}
      <h4 className="Checkout-Title">
        Detalhes do pedido
      </h4>
      <div className="OrderStatus">
        <h4 className="OrderNum">
          Pedido:
          <h4 data-testid="customer_order_details__element-order-details-label-order-id">
            {`${id}`}
          </h4>
          ;
        </h4>
        <h4>
          P.Vendedora:
        </h4>
        <h4 data-testid="customer_order_details__element-order-details-label-seller-name">
          {`${seller && seller.name}`}
          ;
        </h4>
        <h4 data-testid="customer_order_details__element-order-details-label-order-date">
          {new Date(saleDate).toLocaleDateString('pt-BR')}
          ;
        </h4>
        <h3
          data-testid={ olhaGambi } // linter sabotando a organização.
        >
          { status }
        </h3>
        <Button
          text="Marcar como entregue"
          onClick
          dataTestId="customer_order_details__button-delivery-check"
          disabled={ status }
          className="card-button"
        />
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
          data-testid="customer_order_details__element-order-total-price"
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
