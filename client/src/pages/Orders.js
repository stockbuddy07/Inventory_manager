import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    item: '',
    quantity: '',
    quantityType: 'PCS',
    date: '',
    status: 'Pending', // Status is set directly here
    price: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const addOrder = () => {
    let quantityToStore = newOrder.quantity;
    let unit = newOrder.quantityType;

    if (!newOrder.item || !newOrder.quantity || !newOrder.date || !newOrder.price) {
      alert('Please fill in all fields');
      return;
    }

    if (unit === 'KG') {
      quantityToStore = newOrder.quantity * 1000;
      unit = 'grams';
    }

    const orderToSend = {
      item: newOrder.item,
      quantity: quantityToStore,
      quantity_type: unit,
      date: newOrder.date,
      status: 'Pending', // Enforced here again
      price: Number(newOrder.price)
    };

    axios.post('http://localhost:5000/api/orders', orderToSend)
      .then(res => {
        setOrders([...orders, res.data]);
        resetNewOrder();
      })
      .catch(err => console.error(err));
  };

  const markComplete = (id) => {
    const price = prompt('Enter price per unit for this stock:');

    if (price !== null && !isNaN(price)) {
      axios.put(`http://localhost:5000/api/orders/${id}`, {
        status: 'Completed',
        price: parseFloat(price)
      })
        .then(res => {
          const updatedOrders = orders.map(order =>
            order._id === id
              ? {
                  ...order,
                  status: 'Completed',
                  price: parseFloat(price),
                  total_price: parseFloat(price) * order.quantity
                }
              : order
          );
          setOrders(updatedOrders);
        })
        .catch(err => console.error(err));
    } else {
      alert("Invalid price input.");
    }
  };

  const resetNewOrder = () => {
    setNewOrder({
      item: '',
      quantity: '',
      quantityType: 'PCS',
      date: '',
      status: 'Pending', // Reset again here
      price: ''
    });
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
        <select
          value={newOrder.quantityType}
          onChange={(e) => setNewOrder({ ...newOrder, quantityType: e.target.value })}
        >
          <option value="PCS">PCS</option>
          <option value="KG">KG</option>
        </select>
        <input
          type="date"
          value={newOrder.date}
          onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price per unit"
          value={newOrder.price}
          onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
        />

        <button onClick={addOrder}>Add Order</button>
      </div>

      <ul>
        {orders.map(order => (
          <li key={order._id}>
            {order.item} - {order.quantity} {order.quantity_type || 'units'} - {new Date(order.date).toLocaleDateString()} - {order.status}
            {order.price ? ` - ₹${order.price}/unit` : ''}
            {order.total_price ? ` - Total: ₹${Number(order.total_price).toFixed(2)}` : ''}
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
