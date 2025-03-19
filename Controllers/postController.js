const Post = require('../Models/Post');
const { validationResult } = require('express-validator');

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array(),
      });
    }
    const { title, content, categories } = req.body;
    const author = req.user.id;
    const post = await Post.create({
      title,
      content,
      categories,
      author,
    });
    res.status(201).json({
      status: 'success',
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {};

exports.getPost = async (req, res, next) => {};

exports.updatePost = async (req, res, next) => {};

exports.deletePost = async (req, res, next) => {};
