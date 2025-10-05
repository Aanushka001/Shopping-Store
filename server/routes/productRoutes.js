const express = require('express');
const { getProducts, checkout } = require('../controllers/productController');

const router = express.Router();

router.get('/products', getProducts);
router.post('/checkout', checkout);

module.exports = router;
