// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CreateAccount from './components/CreateAccount';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
