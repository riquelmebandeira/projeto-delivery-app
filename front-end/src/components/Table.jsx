import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { handleCartProduct } from '../redux/features/productsSlice';
import '../styles/components/Table.css';

export default function Table(props) {
  const id = window.location.pathname.split('/')[3];
  const { columns, buttonText, dataTestId, data } = props;

  const dispatch = useDispatch();
  const renderDelButton = (row, index) => (
    <td>
      <Button
        text={ buttonText }
        onClick={ () => { dispatch(handleCartProduct({ ...row, quantity: 0 })); } }
        dataTestId={ `${dataTestId}remove-${index}` }
        disabled={ false }
        className="btn-danger"
      />
    </td>
  );

  return (
    <table className="custom-table">
      <tbody>
        <tr>
          { columns.map((column, i) => (
            <th key={ i + 1 }>{column}</th>
          ))}
        </tr>
        { data.map((row, i) => {
          const products = Object.entries(row);
          const productColumns = () => {
            if (!id) {
              return ([
                products[1], products[4], ['unit-price', products[2][1]],
                ['sub-total', (row.quantity * row.price).toFixed(2)]]
              );
            }
            return ([products[1],
              ['quantity', row.SaleProduct.quantity], ['unit-price', products[2][1]],
              ['sub-total', (Math.abs(row.SaleProduct.quantity) * Math.abs(row.price))
                .toFixed(2)],
            ]);
          };
          return (
            <tr key={ i + 1 }>
              <td
                key={ i + 1 }
                data-testid={
                  `${dataTestId}item-number-${i}`
                }
              >
                { i + 1 }
              </td>
              {productColumns().map(([key, value]) => (
                <td
                  key={ key }
                  data-testid={ `${dataTestId}${key}-${i}` }
                >
                  { (value.toString()).replace(/\./, ',') }
                </td>
              ))}
              { buttonText && renderDelButton(row, i) }
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
  dataTestId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  })),
};

Table.defaultProps = {
  data: {},
};
