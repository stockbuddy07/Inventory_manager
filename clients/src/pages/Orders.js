import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    item: '',
    quantity: '',
    quantityType: 'PCS',
    date: '',
    status: 'Pending'
  });

  // Fetch orders
  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add or update order
  const addOrder = () => {
    let quantityToStore = newOrder.quantity;
    let unit = newOrder.quantityType;

    if (unit === 'KG') {
      quantityToStore = newOrder.quantity * 1000;
      unit = 'grams';
    }

    const existingOrder = orders.find(order =>
      order.item.toLowerCase() === newOrder.item.toLowerCase() &&
      order.quantityType === unit &&
      order.status === newOrder.status
    );

    if (existingOrder) {
      const updatedQuantity = Number(existingOrder.quantity) + Number(quantityToStore);

      axios.put(`http://localhost:5000/api/orders/${existingOrder._id}`, {
        quantity: updatedQuantity
      })
        .then(res => {
          const updatedOrders = orders.map(order =>
            order._id === existingOrder._id
              ? { ...order, quantity: updatedQuantity }
              : order
          );
          setOrders(updatedOrders);
          resetNewOrder();
        })
        .catch(err => console.error(err));
    } else {
      const orderToSend = {
        ...newOrder,
        quantity: quantityToStore,
        quantityType: unit
      };

      axios.post('http://localhost:5000/api/orders', orderToSend)
        .then(res => {
          setOrders([...orders, res.data]);
          resetNewOrder();
        })
        .catch(err => console.error(err));
    }
  };

  // Mark as completed
 const markComplete = (id) => {
  const price = prompt('Enter price per unit for this stock:');

  if (price !== null && !isNaN(price)) {
    axios.put(`http://localhost:5000/api/orders/${id}`, {
      status: 'Completed',
      price: parseFloat(price)
    })
      .then(res => {
        const updatedOrders = orders.map(order =>
          order._id === id ? { ...order, status: 'Completed' } : order
        );
        setOrders(updatedOrders);
      })
      .catch(err => console.error(err));
  } else {
    alert("Invalid price input.");
  }
};


  // Reset form
  const resetNewOrder = () => {
    setNewOrder({
      item: '',
      quantity: '',
      quantityType: 'PCS',
      date: '',
      status: 'Pending'
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
            {order.item} - {order.quantity} {order.quantityType} - {new Date(order.date).toLocaleDateString()} - {order.status}
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
