import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="py-4" style={{
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #dee2e6',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 style={{ color: '#1976d2' }}>Inventory Management</h5>
            <p className="text-muted">Track and manage your inventory efficiently</p>
          </div>
          <div className="col-md-3">
            <h5 style={{ color: '#1976d2' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none">Home</Link></li>
              <li><Link to="/inventory" className="text-decoration-none">Inventory</Link></li>
              <li><Link to="/add-item" className="text-decoration-none">Add Item</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 style={{ color: '#1976d2' }}>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: support@inventory.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3 text-muted">
          <small>© {new Date().getFullYear()} Inventory Management System</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
