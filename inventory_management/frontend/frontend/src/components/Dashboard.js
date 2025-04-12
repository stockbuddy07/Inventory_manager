import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const totalItems = items.length;
  const totalCategories = new Set(items.map(item => item.category)).size;
  const lowStockItems = items.filter(item => item.quantity < 10).length;
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Inventory Overview</h1>
      
      {isLoading ? (
        <div className="loading">Loading inventory data...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Items</h3>
              <p className="stat-value">{totalItems}</p>
            </div>
            <div className="stat-card">
              <h3>Categories</h3>
              <p className="stat-value">{totalCategories}</p>
            </div>
            <div className="stat-card">
              <h3>Low Stock</h3>
              <p className="stat-value">{lowStockItems}</p>
            </div>
            <div className="stat-card">
              <h3>Total Value</h3>
              <p className="stat-value">${totalValue.toFixed(2)}</p>
            </div>
          </div>

          <div className="recent-items">
            <h2>Recent Inventory</h2>
            <div className="items-grid">
              {items.slice(0, 8).map((item) => (
                <div key={item.id} className="item-card">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
