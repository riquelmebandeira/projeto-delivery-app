import React, { useEffect, useState } from 'react';
import '../styles/ProductCard/index.css';
import PropTypes from 'prop-types';

export default function ProductCard({ dataCard }) {
  const [prodQuantity, setProdQuantity] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    setProdQuantity((inputValue * dataCard.value).toFixed(2));
    // dispatch total Value ??
  }, [inputValue, dataCard]);

  return (
    <div
      className="card-container"
      style={ { backgroundImage: `url(${dataCard.image})` } }
    >

      <div style={ { alignSelf: 'start', fontSize: 20 } }>
        <h5>
          R$
          {dataCard.value}
        </h5>
      </div>

      <div className="input-container">
        <h5>{ dataCard.name }</h5>

        <div style={ { marginLeft: 45 } }>
          <button type="button" onClick={ () => setInputValue(inputValue - 1) }>
            -
          </button>

          <input
            type="text"
            value={ inputValue }
            placeholder="0"
            onChange={ (e) => setInputValue(+e.target.value) }
          />

          <button type="button" onClick={ () => setInputValue(inputValue + 1) }>
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
