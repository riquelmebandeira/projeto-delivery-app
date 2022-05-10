import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { handleCartProduct } from '../redux/features/productsSlice';

export default function Table(props) {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('cart')));
  const { columns, buttonText } = props;

  const dispatch = useDispatch();
  console.log(data);
  const renderDelButton = (id, index) => (
    <Button
      text={ buttonText }
      onClick={ () => { dispatch(handleCartProduct(id, 0)); } }
      dataTestId={ `customer_checkout__element-order-table-remove-${index}` }
      disabled={ false }
      className="btn-danger"
    />
  );

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('cart')));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          { columns.map((column, i) => (
            <th key={ i }>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { data.cart.map((row, i) => {
          const products = Object.entries(row);
          const productColumns = [
            products[1], products[4], ['unit-price', products[2][1],
            ],
            [
              'sub-total', (row.quantity * row.price).toFixed(2),
            ],
          ];
          return (
            <tr key={ i }>
              <td
                key={ i }
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                { i }
              </td>
              {productColumns.map(([key, value]) => (
                <td
                  key={ key }
                  data-testid={ `customer_checkout__element-order-table-${key}-${i}` }
                >
                  { (value.toString()).replace(/\./, ',') }
                </td>
              ))}
              <td>
                { buttonText
                  ? renderDelButton(row.id, i)
                  : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string.isRequired,
};
