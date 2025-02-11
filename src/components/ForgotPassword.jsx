// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = (event) => {
    event.preventDefault();
    if (email === 'test@example.com' && password === 'password') {
      navigate('/home'); // Redirect to homepage or another page
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Do Something</h1>
        <p>Connect with friends and the world around you on Do Something.</p>
      </div>
      <div className="right">
        <h2>Login</h2>
        <form onSubmit={validateForm}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Log In</button>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="create-account">
          <p>Don't have an account? <a href="/create-account">Create New Account</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
