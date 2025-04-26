import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBox, FaTruck, FaShoppingCart, FaChartPie, FaCogs, FaTachometerAlt } from 'react-icons/fa';
import './dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo"> <span>StockBuddy</span></div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-link"><FaTachometerAlt /> Dashboard</Link>
          <Link to="/admin" className="nav-link"><FaCogs /> Admin</Link>
          <Link to="/suppliers" className="nav-link"><FaTruck /> Supplier</Link>
          <Link to="/items" className="nav-link"><FaBox /> Items</Link>
          <Link to="/orders" className="nav-link"><FaShoppingCart /> Purchase</Link>
          <Link to="/sales" className="nav-link"><FaChartPie /> Sales</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-section">
        <header className="topbar">
          <h2>Stock Distribution</h2>
          <FaUserCircle className="user-icon" />
        </header>

        <main className="main-content">
          <h1>Welcome to Dashboard</h1>
          <p>This is your inventory management control panel.</p>
        </main>

        <footer className="footer">
          &copy; 2025 WEBNAME. Designed and Developed by WEBNAME.
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
