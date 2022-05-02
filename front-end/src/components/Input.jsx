import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { labelText, onChange, dataTestId, placeHolder } = props;
  return (
    <label htmlFor={labelText}>
      <h5>{labelText}</h5>
    <input
    type="input"
    onChange={onChange}
    data-testid={dataTestId}
    placeholder={placeHolder}
  />
  </label>
  );
}

Input.PropTypes = {
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
}

export default Input;