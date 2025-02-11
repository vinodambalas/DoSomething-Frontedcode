import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css'; 

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Error creating account');
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Create an Account</h1>
        <p>Join Do Something and connect with the world.</p>
      </div>
      <div className="right">
        <h2>Sign Up</h2>
        <form onSubmit={handleCreateAccount}>
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
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Sign Up</button>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
