import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import '../css/dashboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ darkMode, toggleDarkMode }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';

    // Fetch items from your backend
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching items:', err));
  }, [darkMode]);

  const pieData = {
    labels: items.map(item => item.name),
    datasets: [
      {
        label: 'Quantity',
        data: items.map(item => item.quantity),
        backgroundColor: [
          '#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0',
          '#00bcd4', '#e91e63', '#8bc34a', '#ffc107', '#795548',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
      <main className="main">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="content">
          <h1>Welcome to the Dashboard!</h1>

          <div className="dashboard-grid">
            {/* Pie Chart */}
            <div className="dashboard-card chart-container">
              <h3>Available Items (Pie Chart)</h3>
              <div className="pie-wrapper">
                <Pie data={pieData} />
              </div>
            </div>

            {/* Item List */}
            <div className="dashboard-card">
              <h3>Item Quantities</h3>
              <ul>
                {items.map(item => (
                  <li key={item._id}>
                    <strong>{item.name}:</strong> {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;
