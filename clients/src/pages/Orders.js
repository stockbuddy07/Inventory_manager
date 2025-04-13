import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    item: '',
    quantity: '',
    date: '',
    status: 'Pending'
  });

  // Fetch orders
  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add a new order
  const addOrder = () => {
    axios.post('http://localhost:5000/api/orders', newOrder)
      .then(res => {
        setOrders([...orders, res.data]);
        setNewOrder({ item: '', quantity: '', date: '', status: 'Pending' });
      })
      .catch(err => console.error(err));
  };

  // Mark order as complete
  const markComplete = (id) => {
    axios.put(`http://localhost:5000/api/orders/${id}`, { status: 'Completed' })
      .then(res => {
        const updatedOrders = orders.map(order =>
          order._id === id ? { ...order, status: 'Completed' } : order
        );
        setOrders(updatedOrders);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Orders</h2>

      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Item"
          value={newOrder.item}
          onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: +e.target.value })}
        />
        <input
          type="date"
          value={newOrder.date}
          onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
        />
        <select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={addOrder}>Add Order</button>
      </div>

      <ul>
        {orders.map(order => (
          <li key={order._id}>
            {order.item} - {order.quantity} pcs - {new Date(order.date).toLocaleDateString()} - {order.status}
            {order.status !== 'Completed' && (
              <button onClick={() => markComplete(order._id)} style={{ marginLeft: '10px' }}>
                Mark as Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
