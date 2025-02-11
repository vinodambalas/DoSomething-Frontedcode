const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this for CORS support

const app = express();
const PORT = 8080;
const JWT_SECRET = 'your_jwt_secret'; // Change this to a strong secret

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/do-something', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error); // Log the error
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
