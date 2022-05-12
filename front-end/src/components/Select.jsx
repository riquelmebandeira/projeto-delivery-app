import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const { name, labelText, dataTestId, options, onChange } = props;

  return (
    <label htmlFor={ name }>
      {labelText}
      <select
        data-testid={ dataTestId }
        name={ name }
        onChange={ onChange }
      >
        { options.map((option, index) => (
          <option key={ index } value={ option.value }>{ option.text }</option>
        ))}
      </select>
    </label>
  );
}

export default Select;

Select.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
