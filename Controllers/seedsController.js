const usersSeeds = require('../seeds/usersSeeds.json');
const postsSeeds = require('../seeds/postsSeeds.json');
const User = require('../Models/User');
const Post = require('../Models/Post');

exports.seedUser = async (req, res, next) => {
  try {
    await User.insertMany(usersSeeds);
    res.status(201).json({
      status: 'success',
      message: 'Seeds inserted successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.seedPost = async (req, res, next) => {
  try {
    await Post.insertMany(postsSeeds);
    res.status(201).json({
      status: 'success',
      message: 'Seeds inserted successfully',
    });
  } catch (err) {
    next(err);
  }
};
