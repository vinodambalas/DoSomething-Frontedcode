import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store JWT token in local storage
        navigate('/home'); // Redirect to home page or another page
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Error logging in');
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
        <form onSubmit={handleLogin}>
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
        <div className="forgot-password"><a href="/forgot-password">Forgot Password?</a></div>
        <div className="create-account">
          <p>Don't have an account? <a href="/create-account">Create New Account</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
