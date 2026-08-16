const express = require('express');
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM categories ORDER BY name').all());
});

router.post('/', requireAuth, requireAdmin, (req, res) => {
  const { name, description, image_url } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  try {
    const info = db
      .prepare('INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)')
      .run(name, description || '', image_url || '');
    res.status(201).json(db.prepare('SELECT * FROM categories WHERE id = ?').get(info.lastInsertRowid));
  } catch (err) {
    res.status(409).json({ error: 'Category already exists' });
  }
});

module.exports = router;
