import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { text, onClick, dataTestId, disabled, className } = props;
  return (
    <button
      type="button"
      onClick={ onClick }
      disabled={ disabled }
      data-testid={ dataTestId }
      className={ className }
    >
      { text }
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
