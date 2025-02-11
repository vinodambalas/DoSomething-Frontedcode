// src/services/service.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.status === 200) {
      return { success: true, ...response.data };
    } else {
      return { success: false, message: response.data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed');
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    if (response.status === 200) {
      return { success: true, message: 'Password reset instructions sent' };
    } else {
      return { success: false, message: response.data.message || 'Failed to send reset instructions' };
    }
  } catch (error) {
    console.error('Error during forgot password request:', error);
    throw new Error('Forgot password request failed');
  }
};

// Create Account
export const createAccount = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/create-account`, { email, password });
    if (response.status === 200) {
      return { success: true, ...response.data };
    } else {
      return { success: false, message: response.data.message || 'Account creation failed' };
    }
  } catch (error) {
    console.error('Error during account creation:', error);
    throw new Error('Account creation failed');
  }
};
