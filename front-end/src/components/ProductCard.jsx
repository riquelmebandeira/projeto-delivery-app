import React, { useState } from 'react';
import '../styles/ProductCard/index.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  incrementValue,
} from '../redux/features/productsSlice';
import Button from './Button';
import Input from './Input';

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
    <div
      className="card-container"
      style={ { backgroundImage: `url(${dataCard.url_image})` } }
      data-testid="17"
    >

      <div style={ { alignSelf: 'start', fontSize: 20 } }>
        <h5 data-testid="16">
          R$
          {dataCard.value}
        </h5>
      </div>

      <div className="input-container">
        <h5 data-testid="15">{ dataCard.name }</h5>

        <div style={ { marginLeft: 45 } }>

          <Button
            text="-"
            type="button"
            disabled={ false }
            onClick={ handleDecrement }
            dataTestId="19"
          />

          <Input
            type="text"
            value={ inputValue }
            placeholder="0"
            onChange={ (e) => setInputValue(+e.target.value) }
            dataTestId="20"
          />

          <Button
            text="+"
            type="button"
            disabled={ false }
            onClick={ handleIncrement }
            dataTestId="18"
          />

        </div>
      </div>

    </div>
  );
}

ProductCard.propTypes = {
  dataCard: PropTypes.objectOf(PropTypes.string).isRequired,
};
