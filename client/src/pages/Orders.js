import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import '../css/orders.css';

function Orders({ darkMode, toggleDarkMode }) {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    item: '',
    quantity: '',
    quantityType: 'PCS',
    date: '',
    status: 'Pending'
  });

  // New states for pagination and search
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

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
      }).then(() => {
        setOrders(orders.map(order =>
          order._id === existingOrder._id
            ? { ...order, quantity: updatedQuantity }
            : order
        ));
        resetNewOrder();
      }).catch(err => console.error(err));
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

  const markComplete = (id) => {
    const price = prompt('Enter price per unit for this stock:');
    if (price !== null && !isNaN(price)) {
      axios.put(`http://localhost:5000/api/orders/${id}`, {
        status: 'Completed',
        price: parseFloat(price)
      }).then(() => {
        setOrders(orders.map(order =>
          order._id === id ? { ...order, status: 'Completed' } : order
        ));
      }).catch(err => console.error(err));
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
      status: 'Pending'
    });
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredOrders.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredOrders.length / entriesPerPage);

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
      <main className="main">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="orders-container">
          <h2>Order Management</h2>
          <div className="orders-content-center">
            <div className="orders-form-card">
              <form className="orders-form" onSubmit={e => { e.preventDefault(); addOrder(); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="item">Item</label>
                    <input
                      id="item"
                      type="text"
                      value={newOrder.item}
                      onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      id="quantity"
                      type="number"
                      value={newOrder.quantity}
                      onChange={(e) => setNewOrder({ ...newOrder, quantity: +e.target.value })}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="quantityType">Quantity Type</label>
                    <select
                      id="quantityType"
                      value={newOrder.quantityType}
                      onChange={(e) => setNewOrder({ ...newOrder, quantityType: e.target.value })}
                    >
                      <option value="PCS">PCS</option>
                      <option value="KG">KG</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      id="date"
                      type="date"
                      value={newOrder.date}
                      onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      value={newOrder.status}
                      onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <button type="submit">Add Order</button>
              </form>
            </div>

            {/* Wrap controls, table, and pagination in a card */}
            {orders.length > 0 && (
              <div className="orders-table-card">
                <div className="table-controls">
                  <div className="entries-select">
                    Show&nbsp;
                    <select
                      value={entriesPerPage}
                      onChange={(e) => {
                        setEntriesPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                    &nbsp;entries
                  </div>
                  <div className="search-box">
                    Search:&nbsp;
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>

                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEntries.map((order, index) => (
                      <tr key={order._id}>
                        <td>{indexOfFirstEntry + index + 1}</td>
                        <td>{order.item}</td>
                        <td>{order.quantity}</td>
                        
                        <td>{order.quantityType}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.status}</td>
                        <td>
                          {order.status !== 'Completed' && (
                            <button onClick={() => markComplete(order._id)}>Complete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pagination-controls">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span> Page {currentPage} of {totalPages} </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Orders;
