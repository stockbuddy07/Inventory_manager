const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  supplier: String
});
module.exports = mongoose.model('Item', ItemSchema);