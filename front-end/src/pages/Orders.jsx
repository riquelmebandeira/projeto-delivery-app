import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import '../styles/Orders.css';
import { requestData as requestOrders } from '../services/requests';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [sessionUser, setSessionUser] = useState('');

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const { token } = userStorage;
    setSessionUser(userStorage);

    const getOrders = async () => {
      const endpoint = '/sales';
      const response = await requestOrders(endpoint, token);

      setOrders(response);
    };

    return getOrders();
  }, []);

  return (
    <>
      {sessionUser && <NavBar props={ sessionUser } />}
      <body>

        {
          (orders.length > 0) && orders.map((order, index) => (
            <Link
              key={ index }
              to={ `/customer/orders/${order.id}` }
              className="orders-container"
            >
              <OrderCard key={ index } cardData={ order } user={ sessionUser } />
            </Link>
          ))
        }

      </body>
    </>
  );
}
