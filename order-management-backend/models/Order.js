const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  customerID: mongoose.Schema.Types.ObjectId,
  shippingAddress: String,
  status: { type: String, default: 'Pending' },
  createdOn: { type: Date, default: Date.now },
  items: [{ productID: mongoose.Schema.Types.ObjectId, quantity: Number }],
  total: Number,
});
module.exports = mongoose.model('Order', orderSchema);
