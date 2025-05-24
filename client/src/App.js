import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const updatedMode = !darkMode;
    setDarkMode(updatedMode);
    localStorage.setItem('darkMode', updatedMode);
  };

  // Load saved dark mode on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);

    const path = window.location.pathname;
    const isAuthPage = path === '/' || path === '/register'; // Add more routes if needed

    if (savedMode && !isAuthPage) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  // Apply dark mode class dynamically on state change (for internal navigation)
  useEffect(() => {
    const path = window.location.pathname;
    const isAuthPage = path === '/' || path === '/register';

    if (darkMode && !isAuthPage) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`dashboard ${darkMode && window.location.pathname !== '/' && window.location.pathname !== '/register' ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/items" element={<Items darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/orders" element={<Orders darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/suppliers" element={<Suppliers darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
