// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Items from './pages/Items';
// import Orders from './pages/Orders';
// import Suppliers from './pages/Suppliers';

// function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   // Toggle dark mode and save to localStorage
//   const toggleDarkMode = () => {
//     const updatedMode = !darkMode;
//     setDarkMode(updatedMode);
//     localStorage.setItem('darkMode', updatedMode);
//   };

//   // Load saved dark mode on mount
//   useEffect(() => {
//     const savedMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(savedMode);
//   }, []);

//   return (
//     <Router>
//       <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
//         <Routes>
//           <Route path="/" element={<Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/register" element={<Register darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/dashboard" element={<Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/items" element={<Items darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/orders" element={<Orders darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/suppliers" element={<Suppliers darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
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

    // Apply the dark mode class to the body element
    if (savedMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  // Ensure dark mode is applied globally when state changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={<Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/register" element={<Register darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
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
// //new app
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Items from './pages/Items';
// import Orders from './pages/Orders';
// import Suppliers from './pages/Suppliers';

// function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   // Toggle dark mode and save to localStorage
//   const toggleDarkMode = () => {
//     const updatedMode = !darkMode;
//     setDarkMode(updatedMode);
//     localStorage.setItem('darkMode', updatedMode);
//   };

//   // Load saved dark mode on mount
//   useEffect(() => {
//     const savedMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(savedMode);
//   }, []);

//   return (
//     <Router>
//       <div className={`dashboard ${darkMode && window.location.pathname !== '/' ? 'dark' : ''}`}>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/items" element={<Items darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/orders" element={<Orders darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//           <Route path="/suppliers" element={<Suppliers darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
