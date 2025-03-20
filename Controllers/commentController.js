const { isValidObjectId } = require('mongoose');
const Comment = require('../Models/Comment');
const Post = require('../Models/Post');
const User = require('../Models/User');

exports.createComment = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;
    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    const comment = await Comment.create({
      text: req.body.text,
    });
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });
    await User.findByIdAndUpdate(_id, {
      $push: { comments: comment._id },
    });
    res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Post not found',
      });
    }
    const posts = await Post.findById(postId).populate('comments');
    res.status(200).json({
      status: 'success',
      data: {
        length: posts.comments.length,
        comments: posts.comments,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.DeleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Comment not found',
      });
    }
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Comment not found',
      });
    }
    //remove comment from post
    await Post.updateOne({ comments: id }, { $pull: { comments: id } });
    //remove comment from user
    await User.updateOne({ comments: id }, { $pull: { comments: id } });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
