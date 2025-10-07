// index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+07:00"
});

// Test MySQL Connection and Create Table if not exists
(async function initializeDatabase() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL:', process.env.DB_NAME);
    
    // Create electronic_devices table if it doesn't exist
    await conn.query(`
      CREATE TABLE IF NOT EXISTS electronic_devices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        stock INT DEFAULT 0,
        location VARCHAR(255),
        status INT DEFAULT 1,
        image TEXT
      )
    `);
    console.log('✅ Products table ready');
    
    conn.release();
  } catch (err) {
    console.error('❌ MySQL Failed:', err.message);
    process.exit(1);
  }
})();

// GET: /api/products - ดึงสินค้าทั้งหมด
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM electronic_devices
    `);
    res.json(rows);
  } catch (err) {
    console.error('❌ Products Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// DELETE: /api/products/:id - ลบสินค้าตาม ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบว่ามีสินค้านี้อยู่หรือไม่
    const [product] = await pool.query(
      'SELECT * FROM electronic_devices WHERE id = ?',
      [id]
    );

    if (product.length === 0) {
      return res.status(404).json({ 
        error: 'Product not found',
        message: 'ไม่พบสินค้าที่ต้องการลบ'
      });
    }

    // ลบสินค้า
    await pool.query(
      'DELETE FROM electronic_devices WHERE id = ?',
      [id]
    );

    res.json({ 
      message: 'ลบสินค้าสำเร็จ',
      deletedId: id 
    });
  } catch (err) {
    console.error('❌ Delete Error:', err.message);
    res.status(500).json({ 
      error: 'Failed to delete product',
      message: 'ไม่สามารถลบสินค้าได้',
      details: err.message
    });
  }
});

// POST: /api/products - เพิ่มสินค้าใหม่
app.post('/api/products', async (req, res) => {
  try {
    const {
      name,
      category,
      stock,
      location,
      status,
      image
    } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Convert and validate stock
    let stockValue = 0;
    if (stock) {
      stockValue = parseInt(stock);
      if (isNaN(stockValue)) {
        return res.status(400).json({ 
          error: 'Invalid stock value',
          message: 'Stock must be a valid number'
        });
      }
    }

    // Insert new product
    const [result] = await pool.query(
      `INSERT INTO electronic_devices (
        name,
        category,
        stock,
        location,
        status,
        image
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        category || '',
        stockValue, // Using the validated and converted stock value
        location || '',
        status || 1, // Default status 1
        image || 'https://via.placeholder.com/150' // Default placeholder image
      ]
    );

    // Return the newly created product
    const [newProduct] = await pool.query(
      'SELECT * FROM electronic_devices WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newProduct[0]);
  } catch (err) {
    console.error('❌ Add Product Error:', err.message);
    console.error('Error details:', err);
    res.status(500).json({ 
      error: 'Failed to add product',
      details: err.message,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState
    });
  }
});

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 API running on port ${port}`);
});
