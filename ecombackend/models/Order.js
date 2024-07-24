const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  user_email: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  order_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
