const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  quantity_type: String,
  price: Number,          // Price per unit
  supplier: String
});

module.exports = mongoose.model('Item', ItemSchema);
