import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li><Link to="/items">Manage Items</Link></li>
        <li><Link to="/orders">Manage Orders</Link></li>
        <li><Link to="/suppliers">Manage Suppliers</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;