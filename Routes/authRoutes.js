const authController = require('../Controllers/authController');
const userValidator = require('../Lib/validators/userValidator/userValidator');
const express = require('express');
const router = express.Router();

router.route('/register').post(userValidator, authController.register);
router.route('/login').post(authController.login);

module.exports = router;
