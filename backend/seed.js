require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

const adminEmail = 'admin@example.com';
const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
if (!existingAdmin) {
  db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
    adminEmail,
    bcrypt.hashSync('admin123', 10),
    'Admin',
    'admin'
  );
  console.log(`Created admin: ${adminEmail} / admin123`);
} else {
  console.log('Admin already exists, skipping');
}

const categories = [
  { name: 'Electronics', description: 'Gadgets and devices' },
  { name: 'Clothing', description: 'Apparel and accessories' },
  { name: 'Home & Kitchen', description: 'Household essentials' },
];

const catIds = {};
for (const c of categories) {
  const existing = db.prepare('SELECT id FROM categories WHERE name = ?').get(c.name);
  if (existing) {
    catIds[c.name] = existing.id;
  } else {
    const info = db
      .prepare('INSERT INTO categories (name, description) VALUES (?, ?)')
      .run(c.name, c.description);
    catIds[c.name] = info.lastInsertRowid;
    console.log(`Created category: ${c.name}`);
  }
}

const products = [
  { name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones', price: 89.99, category: 'Electronics', stock: 25, sku: 'ELEC-001' },
  { name: 'Smart Watch', description: 'Fitness tracking smartwatch', price: 149.99, category: 'Electronics', stock: 15, sku: 'ELEC-002' },
  { name: 'Cotton T-Shirt', description: 'Classic fit, 100% cotton', price: 19.99, category: 'Clothing', stock: 100, sku: 'CLTH-001' },
  { name: 'Denim Jacket', description: 'Unisex denim jacket', price: 59.99, category: 'Clothing', stock: 40, sku: 'CLTH-002' },
  { name: 'Ceramic Mug Set', description: 'Set of 4 ceramic mugs', price: 24.99, category: 'Home & Kitchen', stock: 60, sku: 'HOME-001' },
  { name: 'Stainless Steel Pan', description: '10-inch non-stick pan', price: 34.99, category: 'Home & Kitchen', stock: 30, sku: 'HOME-002' },
];

for (const p of products) {
  const existing = db.prepare('SELECT id FROM products WHERE sku = ?').get(p.sku);
  if (!existing) {
    db.prepare(
      `INSERT INTO products (name, description, price, category_id, stock_quantity, sku)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(p.name, p.description, p.price, catIds[p.category], p.stock, p.sku);
    console.log(`Created product: ${p.name}`);
  }
}

console.log('Seeding complete.');
