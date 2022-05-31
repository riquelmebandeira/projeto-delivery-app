import React from 'react';
import '../styles/components/OrderCard.css';
import PropTypes from 'prop-types';

export default function OrderCard(props) {
  const {
    user,
    cardData: {
      id,
      status,
      saleDate,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    },
  } = props;

  return (
    <div className="order-card">

      <p data-testid={ `${user.role}_orders__element-order-id-${id}` }>
        {`Pedido ${id}`}
      </p>

      <h3 data-testid={ `${user.role}_orders__element-delivery-status-${id}` }>
        { status }
      </h3>

      <div>
        <h4 data-testid={ `${user.role}_orders__element-order-date-${id}` }>
          {new Date(saleDate).toLocaleDateString('pt-BR')}
        </h4>

        <h4 data-testid={ `${user.role}_orders__element-card-price-${id}` }>
          { totalPrice.replace(/\./, ',') }
        </h4>
      </div>
      {
        user.role === 'seller' && (
          <p
            data-testid={ `seller_orders__element-card-address-${id}` }
            className="customer-address"
          >
            { `${deliveryAddress}, ${deliveryNumber}` }
          </p>
        )
      }
    </div>
  );
}

OrderCard.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
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
