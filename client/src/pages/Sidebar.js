import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaCogs, FaTruck, FaBox,
  FaShoppingCart, FaChartPie
} from 'react-icons/fa';
import '../css/sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Inventory Management</h2>
      </div>
      <nav className="nav-menu">
        <NavLink to="/dashboard" className="nav-item" activeclassname="active">
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin" className="nav-item" activeclassname="active">
          <FaCogs /> <span>Admin</span>
        </NavLink>
        <NavLink to="/suppliers" className="nav-item" activeclassname="active">
          <FaTruck /> <span>Suppliers</span>
        </NavLink>
        <NavLink to="/items" className="nav-item" activeclassname="active">
          <FaBox /> <span>Items</span>
        </NavLink>
        <NavLink to="/orders" className="nav-item" activeclassname="active">
          <FaShoppingCart /> <span>Purchase</span>
        </NavLink>
        <NavLink to="/sales" className="nav-item" activeclassname="active">
          <FaChartPie /> <span>Sales</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
