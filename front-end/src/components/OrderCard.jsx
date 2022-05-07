import React from 'react';
import '../styles/OrderCard.css';
import PropTypes from 'prop-types';

export default function OrderCard(props) {
  const { cardData: { id, status, saleDate, totalPrice } } = props;

  return (
    <div className="order-card">

      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        {`Pedido ${id}`}
      </p>

      <h3 data-testid={ `customer_orders__element-delivery-status-${id}` }>
        { status.toUpperCase() }
      </h3>

      <div>
        <h4 data-testid={ `customer_orders__element-order-id-${id}` }>
          {new Date(saleDate).toLocaleDateString()}
        </h4>

        <h4>
          {totalPrice}
        </h4>
      </div>

    </div>
  );
}

OrderCard.propTypes = {
  cardData: PropTypes.shape({
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    sellerId: PropTypes.number,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
};
