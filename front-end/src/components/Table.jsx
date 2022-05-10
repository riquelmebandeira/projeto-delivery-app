import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { handleCartProduct } from '../redux/features/productsSlice';

export default function Table(props) {
  const cartProducts = useSelector((state) => state.products.cart);
  const { columns, buttonText } = props;

  const dispatch = useDispatch();
  console.log(cartProducts);
  const renderDelButton = (row, index) => (

    <Button
      text={ buttonText }
      onClick={ () => { dispatch(handleCartProduct({ ...row, quantity: 0 })); } }
      dataTestId={ `customer_checkout__element-order-table-remove-${index}` }
      disabled={ false }
      className="btn-danger"
    />
  );

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
        { cartProducts.map((row, i) => {
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
                  ? renderDelButton(row, i)
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
