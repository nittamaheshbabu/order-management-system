const express = require('express');
const { getOrders, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/', getOrders);            // Fetch all orders
router.post('/', addOrder);            // Add a new order
router.put('/:id', updateOrder);       // Update an order by ID
router.delete('/:id', deleteOrder);    // Delete an order by ID

module.exports = router;
