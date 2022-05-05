import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { labelText, onChange, dataTestId, placeHolder, type, value } = props;

  const labelRender = () => (
    <label htmlFor={ labelText }>
      <h5>{ labelText }</h5>
    </label>
  );

  return (
    <>
      { labelText === 'none'
        ? null
        : labelRender() }
      <input
        value={ value }
        type={ type }
        onChange={ onChange }
        data-testid={ dataTestId }
        placeholder={ placeHolder }
      />
    </>
  );
};

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
