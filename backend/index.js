const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2005',
  database: 'intern'
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(400).json({ error: 'Invalid credentials' });
    const user = rows[0];
    if (password !== user.password) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id }, 'secretkey');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
