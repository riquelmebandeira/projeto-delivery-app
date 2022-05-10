import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import '../styles/CustomerOrders.css';
import { requestData as requestOrders } from '../services/requests';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [sessionUser, setSessionUser] = useState(false);

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
        <div className="orders-container">
          {
            (orders.length > 0) && orders.map((order, index) => (
              <OrderCard key={ index } cardData={ order } />
            ))
          }
        </div>
      </body>
    </>
  );
}
