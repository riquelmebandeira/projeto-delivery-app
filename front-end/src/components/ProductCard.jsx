import React from 'react';
import '../styles/ProductCard/index.css';

export default function ProductCard({ dataCard }) {
  return (
    <div
      className="card-container"
      style={ { backgroundImage: `url(${dataCard.image})` } }
    >

      <div style={ { alignSelf: 'start', fontSize: 20 } }>
        <h5>R$ {dataCard.value}</h5>
      </div>

      <div className="input-container">
        <button type="button">
          -
        </button>

        <input type="text" placeholder="0" />

        <button type="button">
          +
        </button>
      </div>

    </div>
  );
}
