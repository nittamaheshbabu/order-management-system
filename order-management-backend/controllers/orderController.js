const Order = require('../models/Order');

// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productID').exec();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new order
exports.addOrder = async (req, res) => {
  const { customerID, shippingAddress, items } = req.body;
  try {
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const newOrder = new Order({ customerID, shippingAddress, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { shippingAddress, status, items } = req.body;
  try {
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const updatedOrder = await Order.findByIdAndUpdate(id, { shippingAddress, status, items, total }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
