const { isValidObjectId } = require('mongoose');
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

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      length: posts.length,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Invalid post id' });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array(),
      });
    }
    if (!id || !isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Invalid post id' });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to update this post',
      });
    }
    const { title, content, categories } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, categories },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: 'success',
      data: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Invalid post id' });
    }
    if (req.user.role === 'admin') {
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'Post not found' });
      }
      res.status(204).json();
    } else {
      const post = await Post.findById(id);
      if (!post) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'Post not found' });
      }
      if (post.author.toString() !== req.user.id) {
        return res.status(403).json({
          status: 'fail',
          message: 'You are not authorized to delete this post',
        });
      }
      await Post.findByIdAndDelete(id);
      res.status(204).json();
    }
  } catch (err) {
    next(err);
  }
};
