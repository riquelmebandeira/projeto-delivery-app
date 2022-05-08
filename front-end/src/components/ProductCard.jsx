import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { handleCartProduct } from '../redux/features/productsSlice';

import Button from './Button';

import '../styles/ProductCard/index.css';

export default function ProductCard({ dataCard }) {
  const [inputValue, setInputValue] = useState(0);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    const product = { ...dataCard, quantity: inputValue + 1 };

    dispatch(handleCartProduct(product));

    setInputValue(inputValue + 1);
  };

  const handleChange = (quantity) => {
    const product = { ...dataCard, quantity };

    dispatch(handleCartProduct(product));

    setInputValue(quantity);
  };

  const handleDecrement = () => {
    if (inputValue > 0) {
      const product = { ...dataCard, quantity: inputValue - 1 };

      dispatch(handleCartProduct(product));

      setInputValue(inputValue - 1);
    }
  };

  return (
    <div className="card-container">
      <img
        src={ dataCard.url_image }
        alt={ dataCard.name }
        data-testid={ `customer_products__img-card-bg-image-${dataCard.id}` }
      />
      {/* R$ */}
      <h5 data-testid={ `customer_products__element-card-price-${dataCard.id}` }>
        { dataCard.price.replace(/\./, ',') }
      </h5>

      <div className="input-container">
        <h5 data-testid={ `customer_products__element-card-title-${dataCard.id}` }>
          { dataCard.name }
        </h5>
        <div className="input-group">
          <Button
            text="-"
            type="button"
            disabled={ false }
            onClick={ handleDecrement }
            dataTestId={ `customer_products__button-card-rm-item-${dataCard.id}` }
          />

          <input
            type="text"
            value={ inputValue }
            placeholder="0"
            onChange={ (e) => handleChange(+e.target.value) }
            data-testid={ `customer_products__input-card-quantity-${dataCard.id}` }
          />

          <Button
            text="+"
            type="button"
            disabled={ false }
            onClick={ handleIncrement }
            dataTestId={ `customer_products__button-card-add-item-${dataCard.id}` }
          />

        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  dataCard: PropTypes.objectOf(PropTypes.string).isRequired,
};
