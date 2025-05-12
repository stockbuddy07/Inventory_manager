import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserCircle, FaBox, FaTruck, FaShoppingCart,
  FaChartPie, FaCogs, FaTachometerAlt, FaSun, FaMoon
} from 'react-icons/fa';
import './dashboard.css';

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
     

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Inventory Management</h2>
        </div>
        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item"><FaTachometerAlt /> <span>Dashboard</span></Link>
          <Link to="/admin" className="nav-item"><FaCogs /> <span>Admin</span></Link>
          <Link to="/suppliers" className="nav-item"><FaTruck /> <span>Suppliers</span></Link>
          <Link to="/items" className="nav-item"><FaBox /> <span>Items</span></Link>
          <Link to="/orders" className="nav-item"><FaShoppingCart /> <span>Purchase</span></Link>
          <Link to="/sales" className="nav-item"><FaChartPie /> <span>Sales</span></Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="main-header">
           {/* Top-right toggle icon */}
          <h2>Dashboard Overview</h2>
          <div className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
        </header>

        <footer className="main-footer">
          &copy; 2025 Inventory Management. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
