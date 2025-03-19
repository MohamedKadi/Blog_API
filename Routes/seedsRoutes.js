const express = require('express');
const router = express.Router();

const seedsController = require('../Controllers/seedsController');

router.get('/', seedsController.seed);

module.exports = router;
