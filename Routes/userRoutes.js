const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');

const multer = require('../Middlewares/multer');

router
  .route('/:id')
  .post(
    authController.protect,
    multer.single('image'),
    userController.uploadProfilePicture
  )
  .get(authController.protect, userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );
router
  .route('/:id/profile-picture')
  .get(authController.protect, userController.getProfilePicture);
module.exports = router;
