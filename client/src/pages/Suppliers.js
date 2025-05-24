import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import '../css/suppliers.css';

function Suppliers({ darkMode, toggleDarkMode }) {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get('http://localhost:5000/api/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error('Error fetching suppliers:', err));
  };

  const addSupplier = () => {
    const { name, contact } = newSupplier;

    if (!name.trim() || !contact.trim()) return;

    // Validate contact number (must be exactly 10 digits)
    const isValidContact = /^\d{10}$/.test(contact);
    if (!isValidContact) {
      alert('Please enter a valid 10-digit contact number.');
      return;
    }

    axios
      .post('http://localhost:5000/api/suppliers', newSupplier)
      .then(res => {
        setSuppliers([...suppliers, res.data]);
        setNewSupplier({ name: '', contact: '' });
        setCurrentPage(1);
      })
      .catch(err => console.error('Error adding supplier:', err));
  };

  const filteredSuppliers = suppliers
    .filter(
      s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contact.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comp = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comp : -comp;
    });

  const indexOfLast = currentPage * entries;
  const indexOfFirst = indexOfLast - entries;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSuppliers.length / entries);

  const goToPage = page => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
      <main className="main">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="suppliers-container">
          <h2>Suppliers</h2>

          {/* Form Card */}
          <div className="card supplier-form-card">
            <div className="supplier-form">
              <div className="form-group">
                <label>Supplier Name</label>
                <input
                  type="text"
                  placeholder="Enter Supplier name"
                  value={newSupplier.name}
                  onChange={e =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Contact No</label>
                <input
                  type="text"
                  placeholder="Contact No"
                  value={newSupplier.contact}
                  onChange={e => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setNewSupplier({ ...newSupplier, contact: value });
                    }
                  }}
                  maxLength={10}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={addSupplier}>
                  Add Data
                </button>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="card supplier-table-card">
            <div className="table-controls d-flex-between">
              <div>
                Show
                <select
                  value={entries}
                  onChange={e => {
                    setEntries(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
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
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th
                    className="sortable"
                    onClick={() =>
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    }
                  >
                    Supplier Name {sortOrder === 'asc' ? '▲' : '▼'}
                  </th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {currentSuppliers.length > 0 ? (
                  currentSuppliers.map((s, idx) => (
                    <tr key={s._id || idx}>
                      <td>{indexOfFirst + idx + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.contact}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                      No suppliers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="pagination-controls">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Suppliers;
