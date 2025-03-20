const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentController');
const authController = require('../Controllers/authController');

router
  .route('/:id')
  .delete(authController.protect, commentController.DeleteComment);

module.exports = router;
