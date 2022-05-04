import React, { useState } from 'react';
import '../styles/ProductCard/index.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  incrementValue,
} from '../redux/features/productsSlice';

export default function ProductCard({ dataCard }) {
  const [inputValue, setInputValue] = useState(0);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity());

    dispatch(incrementValue(dataCard.price));

    setInputValue(inputValue + 1);
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity());

    dispatch(incrementValue(dataCard.price));

    setInputValue(inputValue - 1);
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
          <button type="button" onClick={ handleDecrement } data-testid="19">
            -
          </button>

          <input
            type="text"
            value={ inputValue }
            placeholder="0"
            onChange={ (e) => setInputValue(+e.target.value) }
            data-testid="20"
          />

          <button type="button" onClick={ handleIncrement } data-testid="18">
            +
          </button>
        </div>
      </div>

    </div>
  );
}

ProductCard.propTypes = {
  dataCard: PropTypes.objectOf(PropTypes.string).isRequired,
};
