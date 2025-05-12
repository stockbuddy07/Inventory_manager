const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  quantity_type:String,
  date: Date,
  status: String
});

module.exports = mongoose.model('Order', OrderSchema);
