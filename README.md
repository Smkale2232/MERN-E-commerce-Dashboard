# E-Commerce Dashboard (MERN-style, SQLite)

A minimal full-stack e-commerce app: React + Material UI frontend, Express + SQLite backend.
Trimmed from the original spec — no file uploads (image URLs only), no Helmet/rate-limiting, no test suite.

## Structure

```
ecommerce-dashboard/
├── backend/     # Express API + SQLite (better-sqlite3)
└── frontend/    # React + MUI
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed    # creates admin user + sample products/categories
npm run dev     # http://localhost:5000
```

Demo admin login: `admin@example.com` / `admin123`

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start        # http://localhost:3000
```

## What's included

- JWT auth (register/login), role-based access (`customer` / `admin`)
- Product catalog with search + category filter
- Cart (persisted in localStorage) and checkout → creates an order
- Order history for the logged-in user
- Admin dashboard: product CRUD, order status updates

## API

| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/auth/register | — |
| POST | /api/auth/login | — |
| GET | /api/auth/profile | user |
| GET | /api/products?search=&category= | — |
| POST/PUT/DELETE | /api/products/:id | admin |
| GET | /api/categories | — |
| POST | /api/categories | admin |
| GET | /api/orders (?all=true for admin) | user |
| POST | /api/orders | user |
| PUT | /api/orders/:id/status | admin |

## Known gaps (cut for "minimal")

- No image upload — products take an `image_url` string.
- No refresh tokens — JWT just expires after `JWT_EXPIRES_IN`.
- No pagination on product/order lists — fine for a demo dataset, not for scale.
- No stock decrement on checkout — orders are recorded but don't touch `stock_quantity`.
