import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  incrementQuantity,
  decrementQuantity,
  incrementValue,
} from '../redux/features/productsSlice';

import Button from './Button';
import Input from './Input';

import '../styles/ProductCard/index.css';

export default function ProductCard({ dataCard }) {
  const [inputValue, setInputValue] = useState(0);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity());
    dispatch(incrementValue(inputValue >= 0 ? dataCard.price : null));
    setInputValue(inputValue >= 0 ? inputValue + 1 : inputValue);
  };

  const handleDecrement = () => {
    dispatch(inputValue <= 0 ? null : decrementQuantity());
    dispatch(incrementValue(inputValue <= 0 ? null : dataCard.price));
    setInputValue(inputValue <= 0 ? inputValue : inputValue - 1);
  };

  return (
    <div className="card-container">
      <div>
        <img
          className="card-image"
          src={ dataCard.image }
          alt={ dataCard.name }
          data-testid={ `customer_products__img-card-bg-image-${dataCard.id}` }
        />
        <div className="price-container">
          <h5 data-testid={ `customer_products__element-card-price-${dataCard.id}` }>
            R$
            { dataCard.value }
          </h5>
        </div>
      </div>

      <div className="product-controls">
        <h5 data-testid={ `customer_products__element-card-title-${dataCard.id}` }>
          { dataCard.name }
        </h5>

        <div className="input-container">

          <Button
            text="-"
            value="-"
            type="button"
            disabled={ false }
            onClick={ handleDecrement }
            dataTestId={ `customer_products__button-card-rm-item-${dataCard.id}` }
          />

          <Input
            type="text"
            value={ inputValue }
            labelText="none"
            placeholder="0"
            onChange={ (e) => setInputValue(+e.target.value) }
            dataTestId={ `customer_products__input-card-quantity-${dataCard.id}` }
          />

          <Button
            text="+"
            value="+"
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
