import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  // Ensure dark mode is disabled on login page
  useEffect(() => {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      if (res.data.success) {
        toast.success('Login successful!');
        localStorage.setItem('username', username);
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err) {
      toast.error('Invalid username or password');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState); // Toggle password visibility state
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-icon-container">
          <FaUser className="input-icon" />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>

        <div className="input-icon-container">
          <FaLock className="input-icon" />
          <input
            type={passwordVisible ? 'text' : 'password'} // Change input type based on visibility state
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEye /> : <FaEyeSlash />} {/* Toggle between eye and eye-slash icons */}
          </span>
        </div>

        <button type="submit">Login</button>

        <p className="register-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default Login;
