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
    const {
      item,
      quantity,
      quantity_type,
      status,
      date,
      price
    } = req.body;

    const normalizedItemName = item.trim();
    const normalizedType = quantity_type.trim();

    const total_price = price && quantity ? price * quantity : 0;

    let existingOrder = await Order.findOne({
      item: { $regex: new RegExp(`^${normalizedItemName}$`, 'i') },
      quantity_type: normalizedType,
      status
    });

    let orderResult;

    if (existingOrder) {
      existingOrder.quantity += Number(quantity);
      existingOrder.total_price = (Number(existingOrder.total_price || 0) + total_price);
      if (price) existingOrder.price = price;
      orderResult = await existingOrder.save();
    } else {
      orderResult = await Order.create({
        item: normalizedItemName,
        quantity: Number(quantity),
        quantity_type: normalizedType,
        date: date || new Date(),
        status,
        price,
        total_price
      });
    }

    // Update stock if completed
    if (status === 'Completed') {
      const existingItem = await Item.findOne({
        name: { $regex: new RegExp(`^${normalizedItemName}$`, 'i') },
        quantity_type: normalizedType
      });

      if (existingItem) {
        existingItem.quantity += Number(quantity);
        if (price) existingItem.price = price;
        await existingItem.save();
      } else {
        await Item.create({
          name: normalizedItemName,
          quantity: Number(quantity),
          quantity_type: normalizedType,
          price: price || 0,
          supplier: ''
        });
      }
    }

    res.json(orderResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update order (mark as complete)
router.put('/:id', async (req, res) => {
  try {
    const { status, price } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (status) order.status = status;
    if (price !== undefined && !isNaN(price)) {
      order.price = price;
      order.total_price = price * order.quantity;
    }

    await order.save();

    if (status === 'Completed') {
      const existingItem = await Item.findOne({
        name: { $regex: new RegExp(`^${order.item}$`, 'i') },
        quantity_type: order.quantity_type
      });

      if (existingItem) {
        existingItem.quantity += order.quantity;
        if (price) existingItem.price = price;
        await existingItem.save();
      } else {
        await Item.create({
          name: order.item,
          quantity: order.quantity,
          quantity_type: order.quantity_type,
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
