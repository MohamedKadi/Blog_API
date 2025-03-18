const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');

router.route('/:id').get(authController.protect, userController.getUser);

module.exports = router;
