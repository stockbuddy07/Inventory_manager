import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';

const headerStyles = {
  nav: {
    background: 'linear-gradient(90deg, #0a58ca, #0d6efd)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  navLink: {
    color: 'white',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center'
  },
  rightItems: {
    marginLeft: 'auto',
    display: 'flex'
  }
};

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyles.nav}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={headerStyles.navLink}>
          InventoryPro
        </NavLink>
        
        <button className="navbar-toggler" type="button" 
          onClick={() => document.getElementById('navbarNav').classList.toggle('show')}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" style={headerStyles.navLink}>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/inventory" className="nav-link" style={headerStyles.navLink}>
                Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-item" className="nav-link" style={headerStyles.navLink}>
                Add Item
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reports" className="nav-link" style={headerStyles.navLink}>
                Reports
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav" style={headerStyles.rightItems}>
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link" style={headerStyles.navLink}>
                <FiSettings className="me-1" /> Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link" style={headerStyles.navLink}>
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
