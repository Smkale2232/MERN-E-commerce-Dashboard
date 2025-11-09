🛍️ E-Commerce Dashboard
A full-stack e-commerce dashboard built with React frontend and Node.js backend with SQLite database. This project demonstrates modern full-stack JavaScript development with a complete admin dashboard, user authentication, and product management system.

🚀 Features
Frontend
React 18 with functional components and hooks

React Router for navigation

Context API for state management

Responsive Design with CSS Grid/Flexbox

JWT Authentication

Shopping Cart functionality

Product Search & Filtering

Backend
Node.js with Express.js

SQLite database with better-sqlite3

RESTful API architecture

JWT Authentication

File Upload with Multer

Input Validation

Error Handling middleware

Admin Features
Product Management (CRUD operations)

Order Management

User Management

Dashboard Analytics

Category Management

🛠️ Tech Stack
Frontend
React 18

React Router DOM

Context API

Axios

CSS3

Backend
Node.js

Express.js

SQLite3

JWT

Bcryptjs

Multer

CORS

Helmet

📁 Project Structure
text
ecommerce-dashboard/
├── backend/
│ ├── config/ # Database configuration
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Custom middleware
│ ├── models/ # Data models
│ ├── routes/ # API routes
│ ├── uploads/ # File uploads
│ ├── utils/ # Utility functions
│ └── server.js # Entry point
├── frontend/
│ ├── public/ # Static files
│ └── src/
│ ├── components/ # Reusable components
│ ├── context/ # React Context providers
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components
│ ├── services/ # API services
│ ├── utils/ # Utility functions
│ └── App.js # Main App component
└── README.md
🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/yourusername/ecommerce-dashboard.git
cd ecommerce-dashboard
Setup Backend

bash
cd backend
npm install
npm run dev
The backend will start on http://localhost:5000

Setup Frontend (in a new terminal)

bash
cd frontend
npm install
npm start
The frontend will start on http://localhost:3000

Default Admin Account
Email: admin@example.com

Password: admin123

📚 API Endpoints
Authentication
Method Endpoint Description
POST /api/auth/register User registration
POST /api/auth/login User login
GET /api/auth/profile Get user profile
Products
Method Endpoint Description
GET /api/products Get all products
GET /api/products/:id Get single product
POST /api/products Create product (Admin)
PUT /api/products/:id Update product (Admin)
DELETE /api/products/:id Delete product (Admin)
Categories
Method Endpoint Description
GET /api/categories Get all categories
Orders
Method Endpoint Description
GET /api/orders Get user orders
POST /api/orders Create new order
🗃️ Database Schema
Users Table
sql
id INTEGER PRIMARY KEY
email TEXT UNIQUE
password TEXT
name TEXT
role TEXT (admin/customer)
created_at DATETIME
Products Table
sql
id INTEGER PRIMARY KEY
name TEXT
description TEXT
price DECIMAL(10,2)
category_id INTEGER
image_url TEXT
stock_quantity INTEGER
sku TEXT UNIQUE
created_at DATETIME
Categories Table
sql
id INTEGER PRIMARY KEY
name TEXT UNIQUE
description TEXT
image_url TEXT
Orders Table
sql
id INTEGER PRIMARY KEY
user_id INTEGER
total_amount DECIMAL(10,2)
status TEXT
created_at DATETIME
🎯 Key Features Implementation
Authentication Flow
User registers/login with credentials

Server validates and returns JWT token

Token stored in localStorage

Protected routes verify token validity

Shopping Cart
Context API for cart state management

Persistent cart data in localStorage

Quantity updates and item removal

Cart total calculation

Admin Dashboard
Product CRUD operations

Order management

User management

Responsive data tables

Product Management
Image upload functionality

Category assignment

Stock management

Search and filtering

🔧 Development
Running in Development Mode
bash

# Backend (with auto-reload)

cd backend
npm run dev

# Frontend (with hot-reload)

cd frontend
npm start
Building for Production
bash

# Build frontend

cd frontend
npm run build

# Start production backend

cd backend
npm start
Database Seeding
bash
cd backend
npm run seed
🧪 Testing
Backend Tests
bash
cd backend
npm test
Frontend Tests
bash
cd frontend
npm test
🔒 Environment Variables
Create a .env file in the backend directory:

env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h
📱 Responsive Design
The application is fully responsive and works on:

Desktop (1200px+)

Tablet (768px - 1199px)

Mobile (320px - 767px)

🎨 Styling Approach
CSS Grid & Flexbox for layouts

CSS Variables for consistent theming

Mobile-first responsive design

Clean, modern UI with intuitive navigation

🔄 State Management
React Context Providers
AuthContext: User authentication state

CartContext: Shopping cart management

ProductContext: Product data and filters

📦 Available Scripts
Backend Scripts
bash
npm start # Start production server
npm run dev # Start development server with nodemon
npm test # Run tests
npm run seed # Seed database with sample data
Frontend Scripts
bash
npm start # Start development server
npm run build # Build for production
npm test # Run tests
npm run eject # Eject from Create React App
🐛 Troubleshooting
Common Issues
Port already in use

Change ports in package.json or use environment variables

Database connection issues

Ensure SQLite is properly installed

Check file permissions for database file

CORS errors

Verify backend CORS configuration

Check frontend API base URL

JWT authentication failures

Verify token storage in localStorage

Check token expiration

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
React team for the amazing framework

Express.js for the robust backend framework

SQLite for lightweight database solution

Create React App for frontend tooling
