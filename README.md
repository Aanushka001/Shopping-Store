# Simple Shopping Cart

A modern shopping application with frontend interface and Express backend. Browse products, manage cart, and complete checkouts with a beautiful UI.

## ✨ Features

**Backend**
- REST API with 50+ products from JSON file
- Product categories (Electronics, Fashion, Home, Office, Travel)
- Checkout endpoint with order processing
- CORS enabled for frontend communication
- Product search by ID endpoint

**Frontend**
- Responsive product grid with category filters
- Real-time cart management with modal interface
- Add to cart functionality with quantity controls
- Price calculation and total display
- Modern UI with gradients and animations
- Centered navigation and clean layout

## 🛠️ Tech Stack

**Frontend:** JavaScript, CSS3, Fetch API  
**Backend:** Node.js, Express.js, CORS  
**Data Storage:** JSON files

## 📁 Project Structure

```
shopping-cart/
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
│   ├── package.json
│   └── .gitignore
├── server/               
│   ├── server.js
│   ├── Products.json      
│   ├── package.json
│   └── package-lock.json
├── Products_api_test.sh   
├── test_api.sh           
├── project_structure.txt 
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Setup

**1. Clone and setup**
```bash
git clone <your-repo-url>
cd shopping-cart
```

**2. Install backend dependencies**
```bash
cd server
npm install
```

**3. Install frontend dependencies**
```bash
cd ../client
npm install
```

**4. Run the application**

Start Backend Server (Terminal 1):
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

Start Frontend (Terminal 2):
```bash
cd client
npm start
```
Application runs on `http://localhost:3000`

**5. Access the application**  
Open your browser: `http://localhost:3000`

## 🧪 Testing

### Run API Tests
```bash
# Test products API
./Products_api_test.sh

# Run complete test suite
./test_api.sh
```

### Manual Testing
```bash
# Test server health
curl http://localhost:5000/api/health

# Test products endpoint
curl http://localhost:5000/api/products

# Test product by ID
curl http://localhost:5000/api/products/68e2da3478535d896090ba3d

# Test checkout
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"68e2da3478535d896090ba3d","quantity":1}]}'
```

### Manual Testing Steps
1. Open `http://localhost:3000` in your browser
2. Browse products in the responsive grid
3. Filter by categories using centered category buttons
4. Click "Add to Cart" on any product
5. Click cart button (top right) to view cart modal
6. Update quantities using +/- buttons or input field
7. Remove items with "Remove" button
8. Click "Checkout" to complete your order
9. Observe success/error messages

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products (50+ items)
- `GET /api/products/:id` - Get specific product by ID
- `GET /api/health` - Server health check

### Checkout
- `POST /api/checkout` - Process order
  ```json
  {
    "items": [
      {
        "productId": "product_id",
        "quantity": 2
      }
    ]
  }
  ```

## 🔧 Key Features

- **Category Filtering**: Centered category buttons for easy navigation
- **Shopping Cart**: Slide-in modal with quantity management
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Instant cart updates and price calculations
- **Order Processing**: Complete checkout flow with validation
- **Clean UI**: Modern design with reduced spacing and centered layout
- **Product Management**: Full CRUD operations for products

## 📝 Notes

- Product data is stored in `server/Products.json`
- No database required - uses JSON file storage
- Frontend communicates with backend via REST API
- Cart state persists during the browser session
- All API endpoints include proper error handling and logging

##  Author

**Aanushka**  
GitHub: [@Aanushka001](https://github.com/Aanushka001)
```
