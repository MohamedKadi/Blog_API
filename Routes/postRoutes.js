const express = require('express');
const router = express.Router();

const postController = require('../Controllers/postController');
const authController = require('../Controllers/authController');
const commentController = require('../Controllers/commentController');

const commentValidator = require('../Middlewares/validators/commentValidator');
const postValidation = require('../Middlewares/validators/postValidator');

router
  .route('/')
  .post(authController.protect, postValidation, postController.createPost) //needs auth
  .get(postController.getAllPosts);
router
  .route('/:id')
  .get(postController.getPost)
  .put(authController.protect, postValidation, postController.updatePost) //author only
  .delete(authController.protect, postController.deletePost); //author & admin only

router
  .route('/:postId/comments')
  .post(
    authController.protect,
    commentValidator,
    commentController.createComment
  ); //needs auth to post a comment

module.exports = router;
