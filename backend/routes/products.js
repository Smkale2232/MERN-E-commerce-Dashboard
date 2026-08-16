const express = require('express');
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/products?search=&category=
router.get('/', (req, res) => {
  const { search, category } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  if (category) {
    query += ' AND category_id = ?';
    params.push(category);
  }
  query += ' ORDER BY created_at DESC';

  const products = db.prepare(query).all(...params);
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', requireAuth, requireAdmin, (req, res) => {
  const { name, description, price, category_id, image_url, stock_quantity, sku } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  const info = db
    .prepare(
      `INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, sku)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(name, description || '', price, category_id || null, image_url || '', stock_quantity || 0, sku || null);
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(product);
});

router.put('/:id', requireAuth, requireAdmin, (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Product not found' });

  const { name, description, price, category_id, image_url, stock_quantity, sku } = req.body;
  db.prepare(
    `UPDATE products SET name=?, description=?, price=?, category_id=?, image_url=?, stock_quantity=?, sku=?
     WHERE id=?`
  ).run(
    name ?? existing.name,
    description ?? existing.description,
    price ?? existing.price,
    category_id ?? existing.category_id,
    image_url ?? existing.image_url,
    stock_quantity ?? existing.stock_quantity,
    sku ?? existing.sku,
    req.params.id
  );
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(product);
});

router.delete('/:id', requireAuth, requireAdmin, (req, res) => {
  const info = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Product not found' });
  res.status(204).send();
});

module.exports = router;
