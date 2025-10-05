# MongoDB Setup Guide

The application requires MongoDB to run. Here are three options to get MongoDB running:

## Option 1: MongoDB Atlas (Recommended - No Installation Required)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Create a `.env` file in the `server` folder with:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shoppingcart?retryWrites=true&w=majority
PORT=5000
```

## Option 2: Install MongoDB Locally

### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB will start automatically as a Windows service
4. Create a `.env` file in the `server` folder with:
```
MONGODB_URI=mongodb://localhost:27017/shoppingcart
PORT=5000
```

### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option 3: Use Docker (If you have Docker installed)

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Create .env file in server folder
MONGODB_URI=mongodb://localhost:27017/shoppingcart
PORT=5000
```

## After Setting Up MongoDB

1. Create a `.env` file in the `ShoppingCart/server` folder with the appropriate MONGODB_URI
2. Run the seed command:
```bash
cd ShoppingCart/server
npm run seed
```
3. Start the server:
```bash
npm start
```
4. Start the client (in a new terminal):
```bash
cd ShoppingCart/client
npm start
```

## Quick Test

Once MongoDB is running, you can test the connection by running:
```bash
cd ShoppingCart/server
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoppingcart').then(() => console.log('Connected!')).catch(err => console.log('Error:', err.message))"
```
