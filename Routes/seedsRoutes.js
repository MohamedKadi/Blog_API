const express = require('express');
const router = express.Router();

const seedsController = require('../Controllers/seedsController');

router.get('/users', seedsController.seedUser);
router.get('/posts', seedsController.seedPost);

module.exports = router;
