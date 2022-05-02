import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { text, onClick, dataTestId, disabled, placeHolder } = props;
  return (<button
    type="button"
    onClick={onClick}
    disabled={disabled}
    data-testid={dataTestId}
    placeholder={placeHolder}
  >
    {text}
  </button>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  placeHolder: PropTypes.string.isRequired,
}

export default Button;