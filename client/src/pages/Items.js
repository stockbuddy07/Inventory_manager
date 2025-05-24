import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import '../css/items.css';

const Items = ({ darkMode, toggleDarkMode }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0, supplier: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error('Error fetching items:', err));
  };

  const addItem = async () => {
    if (!newItem.name.trim()) return;

    try {
      const res = await axios.get('http://localhost:5000/api/items');
      const existingItems = res.data;
      const quantityInGrams = Number(newItem.quantity) * 1000;

      const match = existingItems.find(item =>
        item.name.toLowerCase() === newItem.name.toLowerCase()
      );

      if (match) {
        const updatedItem = {
          ...match,
          quantity: match.quantity + quantityInGrams,
        };
        await axios.put(`http://localhost:5000/api/items/${match._id}`, updatedItem);
      } else {
        const itemToAdd = { ...newItem, quantity: quantityInGrams };
        await axios.post('http://localhost:5000/api/items', itemToAdd);
      }

      setNewItem({ name: '', quantity: 0, price: 0, supplier: '' });
      fetchItems();
      setCurrentPage(1);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const filteredItems = items
    .filter(i =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comp = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comp : -comp;
    });

  const indexOfLast = currentPage * entries;
  const indexOfFirst = indexOfLast - entries;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredItems.length / entries);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
      <div className="main">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="items-container">
          <h2>Items</h2>

          {/* Form Card */}
          <div className="card item-form-card">
            <form className="item-form" onSubmit={(e) => { e.preventDefault(); addItem(); }}>
              <div className="item-row">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    placeholder="Enter item name"
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity (kg)</label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    placeholder="Enter quantity in kg"
                    onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="item-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={newItem.price}
                    placeholder="Enter price"
                    onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Supplier</label>
                  <input
                    type="text"
                    value={newItem.supplier}
                    placeholder="Enter supplier"
                    onChange={e => setNewItem({ ...newItem, supplier: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">Add Item</button>
            </form>
          </div>

          {/* Table Card */}
          <div className="card item-table-card">
            <div className="table-controls d-flex-between">
              <div>
                Show
                <select value={entries} onChange={e => { setEntries(Number(e.target.value)); setCurrentPage(1); }}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                entries
              </div>
              <div>
                Search:
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
              </div>
            </div>

            <table className="items-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    Item Name {sortOrder === 'asc' ? '▲' : '▼'}
                  </th>
                  <th>Quantity (kg)</th>
                  <th>Price</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, idx) => (
                    <tr key={item._id || idx}>
                      <td>{indexOfFirst + idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{(item.quantity / 1000).toFixed(2)}</td>
                      <td>{item.price}</td>
                      <td>{item.supplier}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Right-aligned Pagination */}
            <div className="pagination-controls">
              <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>Previous</button>
              <span>Page {currentPage} of {totalPages || 1}</span>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => goToPage(currentPage + 1)}>Next</button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Items;
