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
  onClick: PropTypes.func,
  dataTestId: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  dataTestId: '',
  disabled: false,
  className: '',
};

export default Button;
