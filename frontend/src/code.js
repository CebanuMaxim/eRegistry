import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://your-api-url/login', {
        username,
        password,
      })
      const token = response.data.token
      localStorage.setItem('token', token)
      const decoded = jwt_decode(token)
      console.log(decoded) // You can access user data from here
      setError('')
    } catch (error) {
      setError('Invalid username or password')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginForm

  // ******************************************************************

  const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your-secret-key'; // Change this to a secure random string

// Middleware to parse JSON body
app.use(bodyParser.json());

// In-memory user database (replace this with a real database)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Protected endpoint
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to protected route!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ********************************************************************************

import React from 'react';
import { Document, Packer, Paragraph } from 'docx';

class DocxGenerator extends React.Component {
  generateDocx = async () => {
    const doc = new Document();
    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun('Hello, World!'),
            new TextRun({
              text: 'This is a bold text.',
              bold: true,
            }),
          ],
        }),
      ],
    });

    // Convert the Document to a .docx file
    const buffer = await Packer.toBuffer(doc);
    
    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Open the URL in a new tab to download the .docx file
    window.open(url);
  };

  render() {
    return (
      <div>
        <button onClick={this.generateDocx}>Generate DOCX</button>
      </div>
    );
  }
}

export default DocxGenerator;

import React from 'react';
import DocxGenerator from './DocxGenerator';

const App = () => {
  return (
    <div>
      <h1>Generate DOCX Document</h1>
      <DocxGenerator />
    </div>
  );
};

export default App;
