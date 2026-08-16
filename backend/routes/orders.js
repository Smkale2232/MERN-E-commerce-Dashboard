const express = require('express');
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/orders - current user's orders, or all orders if admin (?all=true)
router.get('/', requireAuth, (req, res) => {
  let rows;
  if (req.user.role === 'admin' && req.query.all === 'true') {
    rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  } else {
    rows = db
      .prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC')
      .all(req.user.id);
  }
  res.json(rows.map((o) => ({ ...o, items: JSON.parse(o.items) })));
});

// POST /api/orders  { items: [{ product_id, quantity, price }] }
router.post('/', requireAuth, (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items array is required' });
  }
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const info = db
    .prepare('INSERT INTO orders (user_id, total_amount, status, items) VALUES (?, ?, ?, ?)')
    .run(req.user.id, total, 'pending', JSON.stringify(items));
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ ...order, items: JSON.parse(order.items) });
});

// PUT /api/orders/:id/status - admin only
router.put('/:id/status', requireAuth, requireAdmin, (req, res) => {
  const { status } = req.body;
  const info = db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Order not found' });
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  res.json({ ...order, items: JSON.parse(order.items) });
});

module.exports = router;
