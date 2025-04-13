const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => res.json(await Item.find()));
router.post('/', async (req, res) => res.json(await Item.create(req.body)));
router.put('/:id', async (req, res) => res.json(await Item.findByIdAndUpdate(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await Item.findByIdAndDelete(req.params.id)));

module.exports = router;
