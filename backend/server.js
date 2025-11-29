require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'spotifyapp';
const PORT = process.env.PORT || 3000;

let pool;

// Initialize DB connection pool and ensure DB + table exist
async function initDb() {
  // Connect without specifying DB to create DB if missing
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD
  });

  // Create database if not exists
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();

  // Create pool for queries
  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  // Create table if not exists
  const createTableSql = `
  CREATE TABLE IF NOT EXISTS album_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    album_id VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    name VARCHAR(255),
    artists VARCHAR(1024),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_rating (user_id, album_id)
  );`;

  await pool.query(createTableSql);
  console.log('Database and table ensured.');
}

app.get('/health', (req, res) => res.json({ ok: true }));

// GET all ratings for a user
app.get('/ratings/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query('SELECT album_id as albumId, rating, name, artists FROM album_ratings WHERE user_id = ?', [userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

// GET rating for a specific album for a user
app.get('/ratings/:userId/:albumId', async (req, res) => {
  const { userId, albumId } = req.params;
  try {
    const [rows] = await pool.query('SELECT album_id as albumId, rating, name, artists FROM album_ratings WHERE user_id = ? AND album_id = ?', [userId, albumId]);
    res.json(rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

// SET (insert/update) rating
app.post('/ratings', async (req, res) => {
  const { userId, albumId, rating, name, artists } = req.body;
  if (!userId || !albumId || rating === undefined) {
    return res.status(400).json({ error: 'missing fields' });
  }

  try {
    await pool.query(
      `INSERT INTO album_ratings (user_id, album_id, rating, name, artists)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating), name = VALUES(name), artists = VALUES(artists)`,
      [userId, albumId, rating, name || null, artists || null]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

// Start server after DB init
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize DB', err);
    process.exit(1);
  });