const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);          // Fetch all products
router.post('/', addProduct);          // Add a new product
router.put('/:id', updateProduct);     // Update a product by ID
router.delete('/:id', deleteProduct);  // Delete a product by ID

module.exports = router;
