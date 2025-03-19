const seeds = require('../seeds.json');
const User = require('../Models/User');

exports.seed = async (req, res, next) => {
  try {
    await User.insertMany(seeds);
    res.status(201).json({
      status: 'success',
      message: 'Seeds inserted successfully',
    });
  } catch (err) {
    next(err);
  }
};
