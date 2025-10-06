#  Simple Shopping Cart

A minimal e-commerce application with React frontend and Express backend. Browse products, manage cart with localStorage persistence, and complete checkouts.

##  Features

**Backend**
- REST API with 47+ hardcoded products
- Cart management (add, update, remove)
- Checkout endpoint with order logging
- In-memory order storage

**Frontend**
- Responsive product grid
- Add to cart functionality
- Cart modal with quantity controls
- LocalStorage persistence
- Real-time price calculation

## 🛠️ Tech Stack

**Frontend:** React, JavaScript, CSS3, Fetch API  
**Backend:** Node.js, Express.js, CORS

## 📁 Project Structure

```
ShoppingCart/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartModal.js
│   │   │   └── ProductGrid.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── server/
│   ├── server.js
│   └── package.json
├── test_api.sh
├── Products_api_test.sh
└── project_structure.txt
```

##  Getting Started

### Prerequisites
- Node.js (v14+)
- npm
- Git Bash (for running test scripts on Windows)

### Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/Aanushka001/Shopping-Store.git
cd Shopping-Store
```

**2. Install dependencies**
```bash
cd server
npm install

cd ../client
npm install
```

**3. Run the application**

Terminal 1 - Start Backend:
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

Terminal 2 - Start Frontend:
```bash
cd client
npm start
```
Client runs on `http://localhost:3000`

**4. Access the app**  
Open browser: `http://localhost:3000`

## 🧪 Testing

### Run Full API Test Suite
```bash
./test_api.sh
```
Tests all endpoints: health, products, cart, checkout, orders, error handling

### Run Products API Test
```bash
./Products_api_test.sh
```
Tests product endpoints only: get all, get by ID, invalid IDs

### Expected Test Results
```
All tests passed.
Passed: 4/4 (Products test)
16 endpoint tests (Full test)
```

##  API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add to cart `{ "productId": "id", "quantity": 1 }`
- `PUT /api/cart/:id` - Update quantity `{ "quantity": 2 }`
- `DELETE /api/cart/:id` - Remove item
- `DELETE /api/cart` - Clear cart

### Checkout & Orders
- `POST /api/checkout` - Complete order `{ "items": [...], "customerInfo": {...} }`
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID

### System
- `GET /api/health` - Health check
- `GET /` - API info

## Manual Testing

1. Open `http://localhost:3000`
2. Browse products in the grid
3. Click "Add to Cart" on any product
4. Click cart icon (top right) to view cart
5. Update quantities or remove items
6. Click "Checkout" to complete order
7. Refresh page - cart persists via localStorage

##  Author

**Aanushka**  
GitHub: [@Aanushka001](https://github.com/Aanushka001)
