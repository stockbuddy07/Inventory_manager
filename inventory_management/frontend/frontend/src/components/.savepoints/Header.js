import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          InventoryPro
        </NavLink>
        
        <button 
          className="navbar-toggler" 
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/inventory" className="nav-link">Inventory</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-item" className="nav-link">Add Item</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reports" className="nav-link">Reports</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link">
                <FiSettings className="me-1" /> Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                <FiLogOut className="me-1" /> Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
