import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username on logout
    navigate('/'); // Redirect to login
  };

  return (
    <header className="main-header">
      <h2>Dashboard Overview</h2>
      <div className="header-actions">
        <div className="user-icon" onClick={() => setShowUserMenu(!showUserMenu)}>
          <FaUserCircle />
        </div>

        {showUserMenu && (
          <div className="user-popup">
            <p><strong>{username || 'User'}</strong></p>
            <p>Logged In</p>
            {/* Logout button with lighter red color and icon */}
            <button 
              onClick={handleLogout} 
              style={{
                backgroundColor: '#f44336', // Lighter red
                color: 'white', 
                border: 'none', 
                padding: '10px 15px', 
                cursor: 'pointer', 
                borderRadius: '5px',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px', // Set font size
                fontWeight: 'bold', // Make text bold
              }}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}

        <div className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>
      </div>
    </header>
  );
};

export default Header;
