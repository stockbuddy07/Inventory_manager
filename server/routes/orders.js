const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Item = require('../models/Item');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE or UPDATE an order and manage Item quantity
router.post('/', async (req, res) => {
  try {
    const { item, quantity, quantityType, status, date } = req.body;
    const normalizedItemName = item.trim();

    // Check if order exists (case-insensitive, matching type & status)
    let existingOrder = await Order.findOne({
      item: { $regex: new RegExp(`^${normalizedItemName}$`, 'i') },
      quantityType,
      status
    });

    let orderResult;

    if (existingOrder) {
      existingOrder.quantity += Number(quantity);
      orderResult = await existingOrder.save();
    } else {
      orderResult = await Order.create({
        item: normalizedItemName,
        quantity: Number(quantity),
        quantityType,
        status,
        date: date || new Date()
      });
    }

    // If order is already marked as "Completed", update items table immediately
    if (status === 'Completed') {
      const existingItem = await Item.findOne({
        name: { $regex: new RegExp(`^${normalizedItemName}$`, 'i') },
        quantity_type: quantityType
      });

      if (existingItem) {
        existingItem.quantity += Number(quantity);
        await existingItem.save();
      } else {
        await Item.create({
          name: normalizedItemName,
          quantity: Number(quantity),
          quantity_type: quantityType,
          price: 0,
          supplier: ''
        });
      }
    }

    res.json(orderResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Mark order as completed and update item stock and price
// PUT: Mark order as completed and update item stock and price
router.put('/:id', async (req, res) => {
  try {
    const { status, price } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = status;
    await order.save();

    if (status === 'Completed') {
      const normalizedItemName = order.item.trim();
      const existingItem = await Item.findOne({
        name: { $regex: new RegExp(`^${normalizedItemName}$`, 'i') },
        quantity_type: order.quantityType
      });

      if (existingItem) {
        existingItem.quantity += Number(order.quantity);
        if (price !== undefined && price !== null && !isNaN(price)) {
          existingItem.price = Number(price);
        }
        await existingItem.save();
      } else {
        await Item.create({
          name: normalizedItemName,
          quantity: Number(order.quantity),
          quantity_type: order.quantityType,
          price: price || 0,
          supplier: ''
        });
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
