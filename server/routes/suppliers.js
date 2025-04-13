const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => res.json(await Supplier.find()));
router.post('/', async (req, res) => res.json(await Supplier.create(req.body)));

module.exports = router;